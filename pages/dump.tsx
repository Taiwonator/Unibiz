import { NextPageWithLayout } from './_app';
import { ReactNode, useEffect, useState } from 'react';
import SocietyAdminLayout from '@components/layout/SocietyAdminLayout';
import useNavigation from 'src/hooks/useNavigation';
import { Control, ControlShell } from '@components/core/Form';
import { imageSchema } from './events/create';
import cx from 'classnames';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import useModal from '@hooks/useModal';
import { initUrqlClient } from 'next-urql';
import { GetPastEvents } from 'src/graphql/event/queries.graphql';
import { Event, useGetPastEventsQuery } from 'generated/graphql';
import { useQueryHelpers } from '@hooks/useQueryHelpers';
import useApp from '@hooks/useApp';
import ScrollableArea from '@components/core/ScrollableArea';
import ListItem from '@components/core/ListItem';
import {
  LoadingElement,
  LoadingScreen,
  LoadingSpinner,
} from '@components/primitive/Loading';
import { retrieveDays } from '@lib/days-retreiver';
import Router, { useRouter } from 'next/router';
import { isRegularExpressionLiteral } from 'typescript';
import useS3 from '@hooks/useS3';
import { AddEventImageUrlsMutation } from 'src/graphql/event/mutations.graphql';

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageEdit,
  FilePondPluginImageResize
);

const Dump: NextPageWithLayout = () => {
  const { setActiveNavItem } = useNavigation();
  // const schema = yup.object().shape({
  //   images: imageSchema,
  // });

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   reset,
  //   formState: { errors, isValid },
  // } = useForm({
  //   resolver: yupResolver(schema),
  // });

  const { dispatchModal, generateProceedOrCancelComponent } = useModal();
  const { aGroup } = useApp();
  const router = useRouter();
  const [pastEvents, setPastEvents] = useState([]);
  const { client } = useQueryHelpers();
  const [files, setFiles] = useState<any>([]);
  const { uploadToS3 } = useS3();

  useEffect(() => {
    const updatePastEvents = async () => {
      if (aGroup) {
        const res = await client
          ?.query(GetPastEvents, { societyId: aGroup.id })
          .toPromise();
        console.log('res: ', res);
        if (!res.error) {
          setPastEvents(res.data.FindPastEvents);
        }
      }
    };
    updatePastEvents();
  }, [aGroup, client]);

  useEffect(() => {
    setActiveNavItem('photo-dump');
  }, []);

  const handleSubmit = (id: string) => {
    dispatchModal(
      generateProceedOrCancelComponent({
        options: {
          prompt: `Adding images to event...`,
          action: () => handleEventSelect(id),
        },
      })
    );
  };

  const handleEventSelect = async (id: string) => {
    // router.reload();
    // console.log(files[0].getMetadata());
    const res = await uploadToS3(files.map((file: any) => file.file));
    const imageUrls = res.urls;

    const addImagesRes = await client
      ?.mutation(AddEventImageUrlsMutation, { eventId: id, imageUrls })
      .toPromise();
    console.log(addImagesRes);
    if (!addImagesRes.error) {
      dispatchModal(
        generateProceedOrCancelComponent({
          options: {
            prompt: `Redirecting to event page...`,
            action: () => router.push(`/events/${id}`),
          },
        })
      );
    }

    console.group(res);
  };

  // const createEvent = async (data: any) => {
  //   const tFile = data.thumbmailImage[0];
  //   const bFile = data.bannerImage[0];
  //   if (tFile && bFile) {
  //     const tRes = await uploadToS3(tFile);
  //     const bRes = await uploadToS3(bFile);
  //     const date = String(setTimeOnDate(data.date, data.time));

  //     if (aGroup) {
  //       const societyId = aGroup.id as string;

  //       const variables: CreateEventMutationVariables = {
  //         name: data.name,
  //         description: data.description,
  //         thumbnailUrl: tRes.url,
  //         bannerUrl: bRes.url,
  //         societyId,
  //         date,
  //         tags,
  //         address: locationType !== 'tbd' ? data.address : null,
  //         locationLink: locationType !== 'tbd' ? data.locationLink : null,
  //         registerLink: data.registerLink,
  //       };

  //       try {
  //         const createEventResult = await client
  //           ?.mutation(CreateEventMutation, variables)
  //           .toPromise();

  //         console.log(createEventResult);
  //         if (!createEventResult.error && createEventResult.data.createEvent) {
  //           dispatchModal(
  //             generateProceedOrCancelComponent({
  //               options: {
  //                 prompt: `Redirecting you to your event :)`,
  //                 action: () =>
  //                   router.push(
  //                     `/events/${createEventResult.data.createEvent.id}`
  //                   ),
  //               },
  //             })
  //           );
  //         }
  //       } catch (err) {
  //         throw err;
  //       }
  //     }
  //   }
  // };

  return (
    <>
      <div className="min-h-[75vh] pb-10">
        <FilePond
          files={files}
          onupdatefiles={setFiles as any}
          acceptedFileTypes={['image/*']}
          // allowFileEncode
          // allowImageTransform
          allowMultiple={true}
          allowImageCrop
          // imageCropAspectRatio={'16:10'}
          maxFiles={4}
          storeAsFile
          name="files"
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>. Images must be below 4MB'
          className="h-full"
        />
        <div className="container-lg flex justify-center">
          <button disabled={!files.length as any}>
            <label htmlFor="my-modal" className="btn bg-black">
              Select Event
            </label>
          </button>
        </div>

        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="my-modal"
              className="btn btn-sm btn-circle absolute right-2 top-2 z-10"
            >
              ✕
            </label>
            <div className="space-y-4">
              <ScrollableArea>
                {!pastEvents.length && (
                  <LoadingScreen>
                    <LoadingSpinner />
                  </LoadingScreen>
                )}
                {!!pastEvents.length && (
                  <div className="space-y-2">
                    {pastEvents.map((event: Partial<Event>) => (
                      <button
                        key={event.id}
                        className="block w-full text-left"
                        onClick={() => handleSubmit(event?.id as string)}
                      >
                        <ListItem
                          labels={{
                            middleLeft: event.name,
                            bottomLeft: (
                              <p className="text-left text-xs border border-black text-black px-2 py-1 inline-flex">{`${retrieveDays(
                                event?.date as string
                              )}`}</p>
                            ),
                          }}
                          imageUrl={event.thumbnailUrl as string}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </ScrollableArea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Dump.getLayout = (page) => <SocietyAdminLayout>{page}</SocietyAdminLayout>;

export default Dump;
