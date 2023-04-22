import ListItem from '@components/core/ListItem';
import useAlert from '@hooks/useAlert';
import { retrieveDays } from '@lib/days-retreiver';
import {
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
import { FaCertificate } from 'react-icons/fa';
import Image from 'next/image';

const Society = () => {
  const router = useRouter();
  const { sid } = router.query;
  const { dispatchAlert } = useAlert();
  const [result] = useGetSocietyByIdQuery({ variables: { id: sid as string } });
  const [allEventsResult] = useGetAllEventsQuery();
  const { data, fetching, error } = result;

  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    if (error) {
      dispatchAlert({
        text: 'An error has occured',
        type: 'error',
      });
    }
  }, [error]);

  const society = data?.FindSocietyById;
  const events = allEventsResult?.data?.Event;

  if (fetching) return <div>Fetching...</div>;
  if (error) return <div>an error has occured</div>;

  // return <p>Society: {data?.FindSocietyById?.name}</p>
  return (
    <div className="pb-16">
      <div className="relative h-60 w-screen flex justify-center items-center">
        <h3 className="text-2xl font-bold text-white bg-black px-4 py-1 rounded-md">
          {society?.name}
          <Image
            src="https://source.unsplash.com/random/1920x1080?sig=5"
            fill
            style={{
              objectFit: 'cover',
              zIndex: '-1',
            }}
            alt="placeholder"
          />
        </h3>
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
  const { isVerified } = useApp();

  console.log(
    'society is verified',
    society,
    society.__typename,
    isVerified(society)
  );

  return (
    <div className="space-y-8">
      <h2 className="text-2xl inline-flex items-center space-x-2">
        {isVerified(society) && <FaCertificate className="text-positive" />}
        <span>{society?.name}</span>
      </h2>
      <p className="text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <div className="flex flex-col w-full space-y-8 md:flex-row md:space-y-0">
        <div className="relative w-full h-60">
          <Image
            src="https://source.unsplash.com/random/1920x1080?sig=1"
            fill
            style={{
              objectFit: 'cover',
            }}
            alt="placeholder"
            className="bg-grey2"
          />
        </div>
        <div className="relative w-full h-60">
          <Image
            src="https://source.unsplash.com/random/1920x1080?sig=4"
            fill
            style={{
              objectFit: 'cover',
            }}
            alt="placeholder"
            className="bg-grey2"
          />
        </div>
        <div className="relative w-full h-60">
          <Image
            src="https://source.unsplash.com/random/1920x1080?sig=3"
            fill
            style={{
              objectFit: 'cover',
            }}
            alt="placeholder"
            className="bg-grey2"
          />
        </div>
      </div>
    </div>
  );
};

interface EventsComponentProps {
  events?: any;
}

const EventsComponent: React.FC<EventsComponentProps> = ({ events }) => {
  return (
    <div className="space-y-8 w-full h-screen">
      <ScrollableArea>
        <div className="space-y-4">
          {events?.map((event: any) => (
            <div key={event?.id}>
              <NextLink href={`/events/${event?.id}`} target="_blank">
                <ListItem
                  labels={{
                    topLeft: event.tags,
                    middleLeft: event.name,
                    bottomLeft: retrieveDays(event?.createdAt),
                  }}
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

Society.getLayout = (page: any) => (
  <SocietyAdminLayout>{page}</SocietyAdminLayout>
);

export default Society;
