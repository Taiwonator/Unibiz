import BasicTabbedArea from '@components/core/BasicTabbedArea';
import EventHero from '@components/core/EventHero';
import ListItem from '@components/core/ListItem';
import ScrollableArea from '@components/core/ScrollableArea';
import TabbedArea from '@components/core/TabbedArea';
import SocietyAdminLayout from '@components/layout/SocietyAdminLayout';
import {
  LoadingSpinner,
  LoadingScreen,
  LoadingElement,
} from '@components/primitive/Loading';
import useAlert from '@hooks/useAlert';
import { formatTimestamp } from '@lib/date-formatter';
import { retrieveDays } from '@lib/days-retreiver';
import {
  Event,
  GetPastEventsQuery,
  useGetEventByIdQuery,
  useGetPastEventsQuery,
} from 'generated/graphql';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/_app';
import { ReactNode, useEffect, useRef, useState, forwardRef } from 'react';
import {
  FaCalendar,
  FaClock,
  FaImage,
  FaLocationArrow,
  FaShare,
  FaTrash,
  FaWindows,
} from 'react-icons/fa';
import {
  RxCalendar,
  RxHeart,
  RxHeartFilled,
  RxPinBottom,
  RxSewingPin,
  RxShare1,
} from 'react-icons/rx';
import { EventComponent, Tags } from '.';
import { useInView } from 'react-intersection-observer';
import { Bottom } from '@components/primitive/Overlay';
import useApp from '@hooks/useApp';
import { useQueryHelpers } from '@hooks/useQueryHelpers';
import {
  GetPastEvents,
  GetSimilarEvents,
} from 'src/graphql/event/queries.graphql';
import {
  DeleteEventImageUrlMutation,
  LikeEventMutation,
} from 'src/graphql/event/mutations.graphql';
import Image from 'next/image';
import useModal from '@hooks/useModal';
import useNavigation from '@hooks/useNavigation';
import makeUrl, { TCalendarEvent } from 'add-event-to-calendar';
import moment from 'moment';
import { useSession } from 'next-auth/react';

const Event: NextPageWithLayout = () => {
  const router = useRouter();
  const { setActiveNavItem } = useNavigation();
  const { aGroup } = useApp();
  const { client } = useQueryHelpers();
  const { eid } = router.query;
  const [activeTab, setActiveTab] = useState('details');
  const [liked, setLiked] = useState<boolean>(false);
  const { data: session } = useSession();
  const { user } = session || {};

  const [result] = useGetEventByIdQuery({ variables: { id: eid as string } });
  const { data, fetching, error } = result;

  useEffect(() => {
    setActiveNavItem('events');
  }, []);

  const handleLiked = async () => {
    if (!liked) {
      setLiked(true);
      localStorage.setItem('preventMagic', JSON.stringify(false));
      const likedEvents = JSON.parse(
        localStorage.getItem('likedEvents') || '[]'
      );
      likedEvents.push(eid);
      const updatedValue = JSON.stringify(likedEvents);
      localStorage.setItem('likedEvents', updatedValue);

      if (data && user) {
        try {
          const res = await client
            ?.mutation(LikeEventMutation, {
              eventId: eid,
              userId: user.id,
            })
            .toPromise();
          console.log('res: ', res);

          if (!res.error) {
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    const likedEvents = JSON.parse(localStorage.getItem('likedEvents') || '[]');
    if (likedEvents.includes(eid)) {
      setLiked(true);
    }
  }, [liked, eid]);

  const [displayedEvents, setDisplayedEvents] = useState([]);
  useEffect(() => {
    const updateEvents = async () => {
      if (data) {
        try {
          const getPastEventsResult = await client
            ?.query(GetSimilarEvents, {
              eventId: eid,
            })
            .toPromise();
          if (!getPastEventsResult.error) {
            setDisplayedEvents(getPastEventsResult.data.FindSimilarEvents);
          }
        } catch (err) {
          throw err;
        }
      }
    };
    updateEvents();
  }, [data, client]);

  if (fetching)
    return (
      <LoadingScreen>
        <LoadingSpinner />
      </LoadingScreen>
    );

  return (
    <div className="pb-16">
      <EventHero
        event={data?.FindEventById as Event}
        liked={liked}
        onLiked={() => handleLiked()}
      />

      <div className="container-lg mt-16">
        <BasicTabbedArea
          useTabState={() => [activeTab, setActiveTab]}
          config={{
            tabs: [
              {
                id: 'details',
                label: 'Details',
                Component: (
                  <DetailsComponent
                    event={data?.FindEventById as Event}
                    liked={liked}
                    onLiked={() => handleLiked()}
                  />
                ),
              },
              {
                id: 'similar-events',
                label: 'Similar Events',
                Component: <SimilarEventsComponent events={displayedEvents} />,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

interface DetailsComponentProps {
  event: Partial<Event>;
  liked: boolean;
  onLiked: () => void;
}

enum LocationType {
  ADDRESS,
  ONLINE,
  TBD,
}

const DetailsComponent: React.FC<DetailsComponentProps> = ({
  event,
  liked,
  onLiked,
}) => {
  const router = useRouter();
  const fullUrl = `${process.env.NEXT_PUBLIC_APP_DOMAIN}/public${router.asPath}`;
  const [ref, inView] = useInView();
  const { aGroup } = useApp();
  const { tags, description, location, date, registerLink } = event || {};
  const { dispatchAlert } = useAlert();
  const { client } = useQueryHelpers();
  const { dispatchModal, generateProceedOrCancelComponent } = useModal();
  const copyToClipboard = (e: any) => {
    e.preventDefault();
    navigator.clipboard.writeText(e.target.innerText);
    dispatchAlert({
      text: 'Copied to clipboard',
      type: 'info',
    });
  };

  const handleImageDelete = (imageUrl: string) => {
    dispatchModal(
      generateProceedOrCancelComponent({
        options: {
          prompt: `Are you sure you'd like to delete this image?`,
          action: () => deleteImage(imageUrl),
        },
      })
    );
  };

  const deleteImage = async (imageUrl: string) => {
    const res = await client
      ?.mutation(DeleteEventImageUrlMutation, {
        eventId: event.id,
        imageUrl,
      })
      .toPromise();
    console.log(res);
    if (!res.error) {
      router.reload();
    }
  };

  const showDeleteButton = () => {
    if (aGroup && event) {
      if (event.society) {
        return aGroup.id === event.society.id;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const addEventToCalendar = () => {
    if (event) {
      const locationType = event.location?.type;
      const eventDetails: TCalendarEvent = {
        name: String(event.name),
        location: String(
          locationType === 'ADDRESS'
            ? event.location?.address
            : locationType === 'ONLINE'
            ? event.location?.link
            : 'TBC'
        ),
        details: String(
          event.description +
            (locationType === 'ONLINE'
              ? ` meeting link: ${location?.link}`
              : '')
        ),
        startsAt: String(moment(Number(event.date)).toDate()),
        endsAt: String(moment(Number(event.date)).toDate()),
      };
      const eventUrls = makeUrl(eventDetails);
      router.push(eventUrls.outlook);
    }
  };

  return (
    <div className="space-y-8 md:flex">
      <div className="space-y-8 md:mt-12 md:flex-1">
        <Tags tags={tags} />
        <p className="text-sm">{description}</p>
        <Detail
          label="Location"
          Icon={<RxSewingPin className="text-red" />}
          Value={
            <p className="text-md">
              {location?.type === 'ADDRESS'
                ? location.address
                : location?.type === 'ONLINE'
                ? location?.link
                : 'TBC'}
            </p>
          }
        />
        {date && (
          <Detail
            label="Time"
            Icon={
              <button className="flex" onClick={() => addEventToCalendar()}>
                <RxCalendar className="text-positive" />
              </button>
            }
            Value={<p className="text-xl">{formatTimestamp(date)}</p>}
          />
        )}

        <Detail
          label="Share Link"
          Icon={<RxShare1 />}
          Value={
            <button
              className="text-xs text-left break-words overflow-x-scroll"
              onClick={(e) => copyToClipboard(e)}
            >
              {fullUrl}
            </button>
          }
        />
        <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-4">
          {aGroup?.id !== event?.society?.id && (
            <button
              className="btn inline-flex gap-2 bg-white text-black font-bold px-8 btn-outline border-solid"
              onClick={onLiked}
            >
              {liked ? (
                <RxHeartFilled className="text-red text-lg" />
              ) : (
                <RxHeart className="text-red text-lg" />
              )}
              {liked ? 'Event liked :)' : 'I am Interested'}
            </button>
          )}

          {registerLink && (
            <NextLink href={registerLink} target="_blank">
              <button
                ref={ref}
                className="btn inline-flex gap-2 bg-black font-bold px-8"
              >
                Register Now
              </button>
            </NextLink>
          )}
          {!inView && registerLink && (
            <Bottom>
              <div className="flex justify-end">
                <NextLink href={registerLink} target="_blank">
                  <button className="btn gap-2 bg-black font-bold px-8 z-10">
                    Register Now
                  </button>
                </NextLink>
              </div>
            </Bottom>
          )}
        </div>
      </div>
      {!!event?.eventImageUrls?.length && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold">Event Pictures</h3>
          <div className="relative h-96 carousel carousel-vertical rounded-box">
            {event.eventImageUrls?.length &&
              event.eventImageUrls.map((imageUrl, i) => (
                <div key={i} className="relative carousel-item h-full">
                  {/* <Image
                src={imageUrl as string}
                alt="Event Carousel"
                style={{ objectFit: 'contain' }}
              /> */}
                  <img
                    src={imageUrl as string}
                    className="object-cover w-full"
                    alt="Event Carousel"
                    loading="eager"
                  />
                  {showDeleteButton() && imageUrl && (
                    <button
                      className="bg-red text-white absolute right-4 top-4 p-4 rounded-full hover:bg-errordark"
                      onClick={() => handleImageDelete(imageUrl)}
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
            {!event.eventImageUrls?.length && (
              <LoadingElement className="absolute h-full w-full left-0 top-0 -z-10" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface DetailProps {
  label: string;
  Icon: ReactNode;
  Value: ReactNode;
}

const Detail: React.FC<DetailProps> = ({ label, Icon, Value }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-bold">{label}</h3>
      <div className="flex items-center space-x-2">
        <div className="child:flex-grow child:text-2xl">{Icon}</div>
        {Value}
      </div>
    </div>
  );
};

interface SimilarEventsComponentProps {
  events?: any;
}

const SimilarEventsComponent: React.FC<SimilarEventsComponentProps> = ({
  events,
}) => {
  if (!events?.length)
    return <p className="text-grey3 mt-16">No similar events yet</p>;
  return (
    <div className="space-y-8 w-full">
      <ScrollableArea disabled>
        <div className="space-y-4">
          {events?.map((event: any) => (
            <EventComponent key={event.id} {...event} />
            // <div key={event?.id}>
            //   <NextLink href={`/events/${event?.id}`} target="_blank">
            //     <ListItem
            //       labels={{
            //         topLeft: event.tags,
            //         middleLeft: event.name,
            //         bottomLeft: retrieveDays(event?.createdAt),
            //       }}
            //       uni={{
            //         name: event?.society?.union?.shortName,
            //         verified: true,
            //       }}
            //     />
            //   </NextLink>
            // </div>
          ))}
        </div>
      </ScrollableArea>
    </div>
  );
};

Event.getLayout = (page: any) => (
  <SocietyAdminLayout>{page}</SocietyAdminLayout>
);

export default Event;
