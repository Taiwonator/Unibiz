import { Control, ControlShell, SelectInput } from '@components/core/Form';
import SocietyAdminLayout from '@components/layout/SocietyAdminLayout';
import { NextPageWithLayout } from 'pages/_app';
import { useEffect, useMemo, useRef, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import cx from 'classnames';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import useS3 from '@hooks/useS3';
import moment from 'moment';
import setTimeOnDate from '@lib/time-on-date-setter';
import useApp from '@hooks/useApp';
import { useQueryHelpers } from '@hooks/useQueryHelpers';
import {
  CreateEventMutation,
  EditEventMutation,
} from 'src/graphql/event/mutations.graphql';
import {
  CreateEventMutationVariables,
  EditEventMutationVariables,
  EventType,
  useGetEventByIdQuery,
} from 'generated/graphql';
import { argsToArgsConfig } from 'graphql/type/definition';
import {
  LoadingElement,
  LoadingScreen,
  LoadingSpinner,
} from '@components/primitive/Loading';
import { useRouter } from 'next/router';
import { formatDateAndTime } from '@lib/date-formatter';
import Image from 'next/image';
import useModal from '@hooks/useModal';
import useAlert from '@hooks/useAlert';

type LocationType = 'address' | 'online' | 'tbd';

const FILE_TYPES = ['image/png', 'image/jpeg'];
export const optionalImageSchema = yup
  .mixed()
  .test('fileType', 'File must be a PNG or JPEG image', (value: any) => {
    if (value.length) {
      if (!value || !value[0]) {
        return false;
      }
      const type = value[0].type;
      return FILE_TYPES.includes(type);
    } else {
      return true;
    }
  });

const Edit: NextPageWithLayout = () => {
  const { aGroup } = useApp();
  const [tags, setTags] = useState<any>([]);
  const [locationType, setLocationType] = useState<LocationType>('address');
  const { uploadToS3, uploadResponse } = useS3();
  const { context, client } = useQueryHelpers();

  const schema = yup.object().shape({
    name: yup.string(),
    description: yup.string(),
    date: yup.date(),
    time: yup.string(),
    address: yup.string().nullable(),
    locationLink: yup.string().nullable(),
    registerLink: yup.string(),
    bannerImage: optionalImageSchema,
    thumbmailImage: optionalImageSchema,
  });
  // .test(
  //   'either-address-or-link',
  //   'Either address or link must not be null',
  //   function (value) {
  //     return value.address !== null || value.locationLink !== null;
  //   }
  // )
  // .test('tags-set', 'At least 1 tag must be selected', () =>
  //   Boolean(tags.length)
  // );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { dispatchModal, generateProceedOrCancelComponent } = useModal();
  const { dispatchAlert } = useAlert();

  const router = useRouter();
  const { eid } = router.query;
  const [result] = useGetEventByIdQuery({ variables: { id: eid as string } });
  const { data, fetching, error } = result;

  const embellishedDirtyFields = () => {
    const fields = {
      ...dirtyFields,
      tags: data?.FindEventById?.tags !== tags,
    };
    console.log('fields: ', fields);

    return fields;
  };

  useEffect(() => {
    const event = data?.FindEventById;
    if (event && event.date) {
      const [date, time] = formatDateAndTime(event.date);
      reset({
        name: event?.name,
        description: event?.description,
        date,
        time,
        address: event?.location?.address,
        locationLink: event?.location?.link,
        registerLink: event?.registerLink,
      });
      setTags(event?.tags);
      event?.location?.type === 'ADDRESS'
        ? setLocationType('address')
        : event?.location?.type === 'ONLINE'
        ? setLocationType('online')
        : setLocationType('tbd');
    }
  }, [data?.FindEventById, reset]);

  const name = watch('name');
  const selectedTag = watch('selectedTag');
  // const bannerImage = watch('bannerImage');
  // const thumbnailImage = watch('bannerImage');

  useEffect(() => {
    if (!tags.includes(selectedTag) && selectedTag) {
      setTags((prev: any) => [...prev, selectedTag]);
    }
    reset((prev) => ({ ...prev, selectedTag: '' }));
  }, [selectedTag, reset, tags]);

  const handleEditEvent = (data: any) => {
    dispatchModal(
      generateProceedOrCancelComponent({
        options: {
          prompt: `Edit Event: ${name}`,
          action: () => editEvent(data),
        },
      })
    );
  };

  const editEvent = async (data: any) => {
    const tFile = data.thumbmailImage?.[0];
    const bFile = data.bannerImage?.[0];
    let tRes, bRes;
    try {
      if (tFile) {
        tRes = await uploadToS3([tFile]);
      }
      if (bFile) {
        bRes = await uploadToS3([bFile]);
      }
    } catch (err) {
      dispatchAlert({
        text: 'An error has occured',
        type: 'error',
      });
    }
    const date = String(setTimeOnDate(data.date, data.time));

    // interface Variables extends EditEventMutationVariables {
    //   locationType: any;
    // }

    if (aGroup) {
      const variables: any = {
        eventId: eid as string,
        name: data.name,
        description: data.description,
        thumbnailUrl: tRes?.urls[0],
        bannerUrl: bRes?.urls[0],
        date,
        tags,
        address: data.address,
        locationLink: data.locationLink,
        locationType: locationType.toUpperCase() as LocationType,
        registerLink: data.registerLink,
      };

      try {
        const editEventResult = await client
          ?.mutation(EditEventMutation, variables)
          .toPromise();
        console.log('editEventResult', editEventResult);
        // dispatchModal(
        //   generateProceedOrCancelComponent({
        //     options: {
        //       prompt: `Redirecting you to your event :)`,
        //       action: () =>
        //         router.push(`/events/${editEventResult.data.editEvent.id}`),
        //     },
        //   })
        // );
        router.push(`/events/${editEventResult.data.editEvent.id}`);
      } catch (err) {
        dispatchAlert({
          text: 'An error has occured',
          type: 'error',
        });
        throw err;
      }
    }
  };

  console.log(embellishedDirtyFields());

  if (fetching)
    return (
      <LoadingScreen>
        <LoadingSpinner />
      </LoadingScreen>
    );

  return (
    <div className="bg-grey0">
      <div className={cx('grid relative min-h-[320px]')}>
        {data?.FindEventById?.bannerUrl && (
          <Image
            src={data?.FindEventById?.bannerUrl}
            fill
            style={{
              objectFit: 'cover',
            }}
            alt="placeholder"
            className="absolute w-full h-full z-10 top-0"
          />
        )}
        {!data?.FindEventById?.bannerUrl && (
          <LoadingElement className="absolute h-full w-full left-0 top-0 -z-10" />
        )}
      </div>
      {/* {bannerImage && (
        // <img src={createObjectURL(bannerImage[0])} alt="Preview" />
      )} */}
      <div className="container-md min-h-screen space-y-16 pt-16 py-10">
        <form className="space-y-8">
          <p className="font-bold md:text-4xl">{name}</p>
          <Control
            placeholder="Worship Night"
            label="Name"
            type="text"
            {...register('name')}
          />
          <input value={tags} hidden />
          <Control
            type="select"
            placeholder="Select an tag"
            label="Tags"
            options={Object.values(EventType).map((eType) => ({
              label: eType,
              value: eType,
            }))}
            {...register('selectedTag')}
          />
          <div className="flex space-x-2 overflow-x-scroll">
            {tags.map((tag: any) => (
              <Tag
                key={tag}
                text={tag}
                onClick={() =>
                  setTags((prev: any) => prev.filter((t: any) => t !== tag))
                }
              />
            ))}
          </div>
          <Control
            placeholder="We will be..."
            label="Description"
            type="textarea"
            {...register('description')}
          />
          <div className="grid grid-flow-row md:space-x-2 md:grid-flow-col">
            <Control label="Date" type="date" {...register('date')} />
            <Control label="Time" type="time" {...register('time')} />
          </div>
        </form>
        <div className="grid grid-flow-col space-x-2">
          {['Address', 'Online', 'TBD'].map((label) => (
            <button
              key={label}
              className={cx(
                'btn bg-white text-black !border-2 border-solid hover:text-white',
                label.toLowerCase() === locationType && '!bg-black text-white'
              )}
              onClick={() =>
                setLocationType(label.toLowerCase() as LocationType)
              }
            >
              {label}
            </button>
          ))}
        </div>
        {locationType === 'address' && (
          <Control
            placeholder="3 Dashley Road (Room 16)"
            label="Location"
            type="text"
            {...register('address')}
          />
        )}
        {locationType === 'online' && (
          <Control
            placeholder="https://..."
            label="Meeting Link"
            type="text"
            {...register('locationLink')}
          />
        )}
        <div className="grid grid-flow-row md:space-x-2 md:grid-flow-col">
          <ControlShell
            label="New Banner Image"
            labels={{ bottomLeft: 'Must be less than 4MB' }}
          >
            <input
              className="file-input file-input-ghost file-input-bordered w-full"
              type="file"
              {...register('bannerImage')}
            />
          </ControlShell>

          <ControlShell
            label="New Thumbnail Image"
            labels={{ bottomLeft: 'Must be less than 4MB' }}
          >
            <input
              className="file-input file-input-ghost file-input-bordered w-full"
              type="file"
              {...register('thumbmailImage')}
            />
          </ControlShell>
        </div>
        <Control
          placeholder="https://..."
          label="Register Link"
          type="text"
          {...register('registerLink')}
        />
        <button
          className={cx(
            'btn bg-black text-white w-full',
            'md:w-[unset] md:ml-auto md:flex',
            !Object.values(embellishedDirtyFields()).includes(true) &&
              'btn-disabled !bg-grey3'
          )}
          onClick={handleSubmit(handleEditEvent)}
        >
          Edit Event
        </button>
      </div>
    </div>
  );
};

interface TagProps {
  text: string;
  onClick: () => void;
}

const Tag: React.FC<TagProps> = ({ text, onClick }) => {
  return (
    <div className="flex items-center bg-info pl-4 py-1 rounded-md">
      <span className="mb-[1px]">{text}</span>
      <button
        className={cx('opacity-20 pl-2 pr-4', 'hover:opacity-100')}
        onClick={onClick}
      >
        <RxCross1 />
      </button>
    </div>
  );
};

Edit.getLayout = (page) => <SocietyAdminLayout>{page}</SocietyAdminLayout>;

export default Edit;

// -
