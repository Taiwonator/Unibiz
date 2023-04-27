import ListItem from '@components/core/ListItem';
import useAlert from '@hooks/useAlert';
import { retrieveDays } from '@lib/days-retreiver';
import {
  EventImage,
  Society,
  useGetAllEventsQuery,
  useGetSocietyByIdQuery,
} from 'generated/graphql';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import ScrollableArea from '@components/core/ScrollableArea';
import SocietyAdminLayout from '@components/layout/SocietyAdminLayout';
import BasicTabbedArea from '@components/core/BasicTabbedArea';
import useApp from '@hooks/useApp';
import { FaCertificate, FaHome, FaPlus, FaStar, FaTrash } from 'react-icons/fa';
import Image from 'next/image';
import {
  LoadingElement,
  LoadingScreen,
  LoadingSpinner,
} from '@components/primitive/Loading';
import { Tags } from 'pages/events';
import { RxCheck } from 'react-icons/rx';
import { useSession } from 'next-auth/react';
import useModal from '@hooks/useModal';
import { useQueryHelpers } from '@hooks/useQueryHelpers';
import { RequestSocietyFromUserMutation } from 'src/graphql/society/mutations.graphql';
import cx from 'classnames';
import { DeleteEventImageUrlMutation } from 'src/graphql/event/mutations.graphql';
import { NextPageWithLayout } from 'pages/_app';
import PublicLayout from '@components/layout/PublicLayout';

const Society: NextPageWithLayout = () => {
  const router = useRouter();
  const { sid } = router.query;
  const { dispatchAlert } = useAlert();
  const [result] = useGetSocietyByIdQuery({ variables: { id: sid as string } });
  const [allEventsResult] = useGetAllEventsQuery({
    variables: { societyId: sid as string },
  });
  const { data, fetching, error } = result;

  const [activeTab, setActiveTab] = useState('details');

  const society = data?.FindSocietyById;
  const events = allEventsResult?.data?.Event;

  if (fetching)
    return (
      <LoadingScreen>
        <LoadingSpinner />
      </LoadingScreen>
    );

  return (
    <div className="pb-16">
      <div className="relative min-h-[320px] w-screen flex justify-center items-center">
        {society && (
          <h3 className="text-2xl font-bold text-white bg-black px-4 py-1 rounded-md">
            {society?.name}
          </h3>
        )}
        <div className="absolute top-4 left-4 z-10 md:right-4 md:left-[unset]">
          {society && society.id && <RequestButton selectedSociety={society} />}
        </div>

        {society?.imageUrl && (
          <Image
            src={society.imageUrl}
            fill
            style={{
              objectFit: 'cover',
              zIndex: '-1',
            }}
            alt="placeholder"
          />
        )}
        {!society?.imageUrl && (
          <LoadingElement className="absolute h-full w-full left-0 top-0 -z-10" />
        )}
      </div>

      <div className="container-lg mt-16">
        <BasicTabbedArea
          useTabState={() => [activeTab, setActiveTab]}
          config={{
            tabs: [
              {
                id: 'details',
                label: 'Details',
                Component: <DetailsComponent society={society} />,
              },
              {
                id: 'events',
                label: 'Events',
                Component: <EventsComponent events={events} />,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

interface DetailsComponentProps {
  society: any;
}

const DetailsComponent: React.FC<DetailsComponentProps> = ({ society }) => {
  const { isVerified, aGroup } = useApp();
  const router = useRouter();
  const { dispatchModal, generateProceedOrCancelComponent } = useModal();
  const { client } = useQueryHelpers();

  if (!society) {
    return <p className="mt-16 text-grey3">Society does not exist</p>;
  }

  const carouselItemClassName = () => {
    if (society) {
      const c = society.eventImageUrls.length;
      switch (c) {
        case 1:
          return 'w-full max-h-[400px]';
        case 2:
        case 3:
          return 'w-1/2 max-h-[400px]';
        default:
          return 'w-1/4';
      }
    }
    return '';
  };

  const handleImageDelete = (eventId: string, imageUrl: string) => {
    dispatchModal(
      generateProceedOrCancelComponent({
        options: {
          prompt: `Are you sure you'd like to delete this image?`,
          action: () => deleteImage(eventId, imageUrl),
        },
      })
    );
  };

  const deleteImage = async (eventId: string, imageUrl: string) => {
    const res = await client
      ?.mutation(DeleteEventImageUrlMutation, {
        eventId,
        imageUrl,
      })
      .toPromise();
    console.log(res);
    if (!res.error) {
      router.reload();
    }
  };

  const showDeleteButton = () => {
    if (aGroup) {
      return aGroup.id === society.id;
    } else {
      return false;
    }
  };

  return (
    <div className="space-y-16 mt-16">
      <div className="space-y-4">
        {society?.union && (
          <div className="inline-flex bg-black px-2 py-1 rounded-sm font-bold text-white">
            {society?.union.shortName}
          </div>
        )}
        <h2 className="text-2xl flex items-center space-x-2">
          {isVerified(society) && (
            <div className="tooltip" data-tip="Verified">
              <FaStar className="text-positive" />
            </div>
          )}
          <span>{society?.name}</span>
        </h2>
      </div>
      <p className="text-sm">{society.description}</p>

      {/* <div className="flex flex-col w-full space-y-8 md:flex-row md:space-y-0"> */}
      <div className="carousel carousel-center rounded-box">
        {society?.eventImageUrls.map(
          ({ eventId, eventImageUrl }: EventImage, i: number) => (
            <div
              key={i}
              className={cx('relative carousel-item', carouselItemClassName())}
            >
              {eventImageUrl && (
                <img
                  src={eventImageUrl}
                  alt="Society Event Image"
                  className="w-full object-cover"
                />
              )}

              {showDeleteButton() && eventId && (
                <button
                  className="bg-red text-white absolute right-4 top-4 p-4 rounded-full hover:bg-errordark"
                  onClick={() =>
                    handleImageDelete(eventId, eventImageUrl as string)
                  }
                >
                  <FaTrash />
                </button>
              )}
            </div>
          )
        )}
      </div>
    </div>
    // </div>
  );
};

interface EventsComponentProps {
  events?: any;
}

const EventsComponent: React.FC<EventsComponentProps> = ({ events }) => {
  if (!events?.length) return <p className="text-grey3 mt-16">No events yet</p>;
  return (
    <div className="space-y-8 w-full h-screen mt-16">
      <ScrollableArea disabled>
        <div className="space-y-4">
          {events?.map((event: any) => (
            <div key={event?.id}>
              <NextLink href={`/public/events/${event?.id}`} target="_blank">
                <ListItem
                  labels={{
                    topLeft: <Tags tags={event.tags} />,
                    middleLeft: event.name,
                    bottomLeft: retrieveDays(event?.date),
                  }}
                  imageUrl={event.thumbnailUrl}
                  uni={{
                    name: event?.society?.union?.shortName,
                    verified: true,
                  }}
                />
              </NextLink>
            </div>
          ))}
        </div>
      </ScrollableArea>
    </div>
  );
};

Society.getLayout = (page: any) => <PublicLayout>{page}</PublicLayout>;

export default Society;

interface RequestButtonProps {
  selectedSociety: Society | null;
}

const RequestButton: React.FC<RequestButtonProps> = ({ selectedSociety }) => {
  const { data: session } = useSession();
  const { user } = session || {};
  const { aGroup } = useApp();

  const { dispatchModal, generateProceedOrCancelComponent } = useModal();
  const [requestedSocietyId, setRequestedSocietyId] = useState<string | null>(
    null
  );
  const { client } = useQueryHelpers();
  const { dispatchAlert } = useAlert();

  const handleSocietyRequestFromUser = () => {
    dispatchModal(
      generateProceedOrCancelComponent({
        options: {
          prompt: `Are you sure?`,
          action: requestSocietyFromUser,
        },
      })
    );
  };

  const requestSocietyFromUser = async () => {
    if (selectedSociety && selectedSociety.id && user) {
      const res = await client
        ?.mutation(RequestSocietyFromUserMutation, {
          userId: user.id,
          societyId: selectedSociety.id,
        })
        .toPromise();
      if (!res.error) {
        setRequestedSocietyId(selectedSociety.id);
        dispatchAlert({
          text: 'Request was successfully sent',
          type: 'success',
        });
      } else {
        dispatchAlert({
          text: 'An error occured',
          type: 'error',
        });
      }
    }
  };

  if (user) {
    if (selectedSociety?.userIds?.includes(user.id)) {
      // User is in Union
      return (
        <h4 className="inline-flex items-center gap-2 text-sm font-bold text-black bg-info px-4 py-1 rounded-md z-[1]">
          <FaHome className="text-white" /> My Society
        </h4>
      );
    }
    if (
      selectedSociety?.userRequestIds?.includes(user.id) ||
      selectedSociety?.id === requestedSocietyId
    ) {
      // User is in Union
      return (
        <h4 className="inline-flex items-center gap-2 text-sm font-bold text-black bg-positive px-4 py-1 rounded-md z-[1]">
          <RxCheck className="text-white" /> Requested :)
        </h4>
      );
    }
  }

  return (
    <button
      className="inline-flex items-center gap-2 text-sm font-bold text-black bg-white px-4 py-1 rounded-md z-[1] hover:bg-white/80"
      onClick={handleSocietyRequestFromUser}
    >
      <FaPlus className="text-green" /> Request access
    </button>
  );
};
