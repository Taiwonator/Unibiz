import { Control, ControlShell, SelectInput } from '@components/core/Form';
import SocietyAdminLayout from '@components/layout/SocietyAdminLayout';
import { NextPageWithLayout } from 'pages/_app';
import { useEffect, useRef, useState } from 'react';
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
import { CreateEventMutation } from 'src/graphql/event/mutations.graphql';
import { CreateEventMutationVariables, EventType } from 'generated/graphql';
import { argsToArgsConfig } from 'graphql/type/definition';
import { useRouter } from 'next/router';
import useModal from '@hooks/useModal';
import useAlert from '@hooks/useAlert';

type LocationType = 'address' | 'online' | 'tbd';

const FILE_TYPES = ['image/png', 'image/jpeg'];

export const imageSchema = yup
  .mixed()
  .required('Please select a file')
  .test('fileType', 'File must be a PNG or JPEG image', (value: any) => {
    if (!value || !value[0]) {
      return false;
    }
    const type = value[0].type;

    return FILE_TYPES.includes(type);
  });

const Create: NextPageWithLayout = () => {
  const { aGroup } = useApp();
  const [tags, setTags] = useState<EventType[]>([]);
  const [locationType, setLocationType] = useState<LocationType>('address');
  const { uploadToS3, uploadResponse } = useS3();
  const { context, client } = useQueryHelpers();
  const router = useRouter();

  const schema = yup
    .object()
    .shape({
      name: yup.string().required(),
      description: yup.string().required(),
      date: yup.date().required(),
      time: yup.string().required(),
      address: yup.string(),
      locationLink: yup.string(),
      registerLink: yup.string(),
      bannerImage: imageSchema,
      thumbmailImage: imageSchema,
    })
    .test(
      'either-address-or-link',
      'Either address or link must not be null',
      function (value) {
        return (
          value.address !== null ||
          value.locationLink !== null ||
          locationType === 'tbd'
        );
      }
    )
    .test('tags-set', 'At least 1 tag must be selected', () =>
      Boolean(tags.length)
    );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { dispatchModal, generateProceedOrCancelComponent } = useModal();
  const { dispatchAlert } = useAlert();

  const name = watch('name');
  const selectedTag = watch('selectedTag');
  // const bannerImage = watch('bannerImage');
  // const thumbnailImage = watch('bannerImage');

  useEffect(() => {
    if (!tags.includes(selectedTag) && selectedTag) {
      setTags((prev) => [...prev, selectedTag]);
    }
    reset((prev) => ({ ...prev, selectedTag: '' }));
  }, [selectedTag, reset, tags]);

  const handleCreateEvent = (data: any) => {
    dispatchModal(
      generateProceedOrCancelComponent({
        options: {
          prompt: `Create event: ${name}`,
          action: () => createEvent(data),
        },
      })
    );
  };

  const createEvent = async (data: any) => {
    const tFile = data.thumbmailImage[0];
    const bFile = data.bannerImage[0];
    if (tFile && bFile) {
      const tRes = await uploadToS3([tFile]);
      const bRes = await uploadToS3([bFile]);
      const date = String(setTimeOnDate(data.date, data.time));

      if (aGroup) {
        const societyId = aGroup.id as string;

        const variables: CreateEventMutationVariables = {
          name: data.name,
          description: data.description,
          thumbnailUrl: tRes.urls[0],
          bannerUrl: bRes.urls[0],
          societyId,
          date,
          tags,
          address: locationType !== 'tbd' ? data.address : null,
          locationLink: locationType !== 'tbd' ? data.locationLink : null,
          registerLink: data.registerLink,
        };

        try {
          const createEventResult = await client
            ?.mutation(CreateEventMutation, variables)
            .toPromise();

          console.log(createEventResult);
          if (!createEventResult.error && createEventResult.data.createEvent) {
            dispatchModal(
              generateProceedOrCancelComponent({
                options: {
                  prompt: `Redirecting you to your event :)`,
                  action: () =>
                    router.push(
                      `/events/${createEventResult.data.createEvent.id}`
                    ),
                },
              })
            );
          }
        } catch (err) {
          dispatchAlert({
            text: 'An error has occured',
            type: 'error',
          });
          throw err;
        }
      }
    }
  };

  return (
    <div className="bg-grey0 py-10 pt-16">
      {/* {bannerImage && (
        // <img src={createObjectURL(bannerImage[0])} alt="Preview" />
      )} */}
      <div className="container-md min-h-screen space-y-16">
        <form className="space-y-8">
          <p className="font-bold md:text-4xl">{name}</p>
          <Control
            placeholder="Worship Night"
            label="Name"
            type="text"
            required
            {...register('name')}
          />
          <input value={tags} hidden />
          <Control
            type="select"
            placeholder="Select an tag"
            required
            label="Tags"
            options={Object.values(EventType).map((eType) => ({
              label: eType,
              value: eType,
            }))}
            {...register('selectedTag')}
          />
          <div className="flex space-x-2">
            {tags.map((tag) => (
              <Tag
                key={tag}
                text={tag}
                onClick={() => setTags((prev) => prev.filter((t) => t !== tag))}
              />
            ))}
          </div>
          <Control
            placeholder="We will be..."
            label="Description"
            type="textarea"
            required
            {...register('description')}
          />
          <div className="grid grid-flow-row md:space-x-2 md:grid-flow-col">
            <Control label="Date" type="date" required {...register('date')} />
            <Control label="Time" type="time" required {...register('time')} />
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
            required
            {...register('address')}
          />
        )}
        {locationType === 'online' && (
          <Control
            placeholder="https://..."
            label="Meeting Link"
            type="text"
            required
            {...register('locationLink')}
          />
        )}
        <div className="grid grid-flow-row md:space-x-2 md:grid-flow-col">
          <ControlShell
            label="Banner Image"
            labels={{ bottomLeft: 'Must be less than 4MB' }}
            required
          >
            <input
              className="file-input file-input-ghost file-input-bordered w-full"
              type="file"
              {...register('bannerImage')}
            />
          </ControlShell>

          <ControlShell
            label="Thumbnail Image"
            labels={{ bottomLeft: 'Must be less than 4MB' }}
            required
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
            !isValid && 'btn-disabled !bg-grey3'
          )}
          onClick={handleSubmit(handleCreateEvent)}
        >
          Create Event
        </button>
      </div>
    </div>
  );
};

interface TagProps {
  text: string;
  onClick: () => void;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ text, onClick, className }) => {
  return (
    <div
      className={cx(
        'flex items-center bg-info pl-4 py-1 rounded-md',
        className
      )}
    >
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

Create.getLayout = (page) => <SocietyAdminLayout>{page}</SocietyAdminLayout>;

export default Create;

// -
