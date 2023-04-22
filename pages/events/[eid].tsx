import BasicTabbedArea from '@components/core/BasicTabbedArea';
import EventHero from '@components/core/EventHero';
import ListItem from '@components/core/ListItem';
import ScrollableArea from '@components/core/ScrollableArea';
import TabbedArea from '@components/core/TabbedArea';
import SocietyAdminLayout from '@components/layout/SocietyAdminLayout';
import { LoadingSpinner, LoadingScreen } from '@components/primitive/Loading';
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
import { FaCalendar, FaClock, FaLocationArrow, FaShare } from 'react-icons/fa';
import {
  RxCalendar,
  RxHeart,
  RxPinBottom,
  RxSewingPin,
  RxShare1,
} from 'react-icons/rx';
import { EventComponent, Tags } from '.';
import { useInView } from 'react-intersection-observer';
import { Bottom } from '@components/primitive/Overlay';
import useApp from '@hooks/useApp';
import { useQueryHelpers } from '@hooks/useQueryHelpers';
import { GetPastEvents } from 'src/graphql/event/queries.graphql';

const Event: NextPageWithLayout = () => {
  const router = useRouter();
  const { aGroup } = useApp();
  const { client } = useQueryHelpers();
  const { eid } = router.query;
  const [activeTab, setActiveTab] = useState('details');

  const [result] = useGetEventByIdQuery({ variables: { id: eid as string } });
  const { data, fetching, error } = result;

  const [displayedEvents, setDisplayedEvents] = useState([]);
  useEffect(() => {
    const updateEvents = async () => {
      if (data) {
        try {
          const getPastEventsResult = await client
            ?.query(GetPastEvents, {
              societyId: data.FindEventById?.society?.id,
            })
            .toPromise();
          if (!getPastEventsResult.error) {
            setDisplayedEvents(getPastEventsResult.data.FindPastEvents);
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
      <EventHero event={data?.FindEventById} />

      <div className="container-lg mt-16">
        <BasicTabbedArea
          useTabState={() => [activeTab, setActiveTab]}
          config={{
            tabs: [
              {
                id: 'details',
                label: 'Details',
                Component: <DetailsComponent event={data?.FindEventById} />,
              },
              {
                id: 'similar-events',
                label: 'Past Events',
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
}

enum LocationType {
  ADDRESS,
  ONLINE,
  TBD,
}

const DetailsComponent: React.FC<DetailsComponentProps> = ({ event }) => {
  const router = useRouter();
  const fullUrl = `${process.env.NEXT_PUBLIC_APP_DOMAIN}${router.asPath}`;
  const [ref, inView] = useInView();
  const { aGroup } = useApp();

  const { tags, description, location, date, registerLink } = event || {};
  const { dispatchAlert } = useAlert();
  const copyToClipboard = (e: any) => {
    e.preventDefault();
    navigator.clipboard.writeText(e.target.innerText);
    dispatchAlert({
      text: 'Copied to clipboard',
      type: 'info',
    });
  };

  return (
    <div className="space-y-8 md:mt-12">
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
      <Detail
        label="Time"
        Icon={<RxCalendar className="text-positive" />}
        Value={<p className="text-xl">{formatTimestamp(date)}</p>}
      />
      <Detail
        label="Share Link"
        Icon={<RxShare1 />}
        Value={
          <button className="text-xs" onClick={(e) => copyToClipboard(e)}>
            {fullUrl}
          </button>
        }
      />
      <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-4">
        {aGroup?.id !== event?.society?.id && (
          <button className="btn inline-flex gap-2 bg-white text-black font-bold px-8 btn-outline border-solid">
            <RxHeart className="text-red text-lg" /> I am Interested
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
