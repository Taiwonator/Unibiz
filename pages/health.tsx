import { NextPageWithLayout } from './_app';
import SocietyAdminLayout from '@components/layout/SocietyAdminLayout';
import useNavigation from 'src/hooks/useNavigation';
import { ReactNode, useEffect, useState } from 'react';
import {
  FaHeart,
  FaHome,
  FaPlus,
  FaPushed,
  FaSpaceShuttle,
  FaStar,
  FaThumbsDown,
  FaThumbsUp,
} from 'react-icons/fa';
import { useQueryHelpers } from '@hooks/useQueryHelpers';
import { FindEventBySocietyIdDocument } from 'generated/graphql';
import { GetSocietyById } from 'src/graphql/society/queries.graphql';
import useApp from '@hooks/useApp';
import { LoadingScreen, LoadingSpinner } from '@components/primitive/Loading';
import NextLink from 'next/link';

interface StatsType {
  verified: boolean;
  eventCount: number;
  totalLikes: number;
}

const Health: NextPageWithLayout = () => {
  const { setActiveNavItem } = useNavigation();
  const [displayedStats, setDisplayedStats] = useState<StatsType | null>(null);
  const { client } = useQueryHelpers();
  const { aGroup } = useApp();

  useEffect(() => {
    setActiveNavItem('health-check');
  }, []);

  useEffect(() => {
    const updateStats = async () => {
      if (aGroup) {
        try {
          const res = await client
            ?.query(GetSocietyById, { id: aGroup.id })
            .toPromise();
          console.log('res: ', res);

          if (!res.error) {
            const event = res.data.FindSocietyById;
            setDisplayedStats({
              verified: !!event.union,
              eventCount: event.eventIds.length,
              totalLikes: event.totalEventLikes,
            });
          }
        } catch (e) {
          console.log(e);
        }
      }
    };

    updateStats();
  }, [aGroup, client]);

  if (!displayedStats)
    return (
      <LoadingScreen>
        <LoadingSpinner />
      </LoadingScreen>
    );

  return (
    <div className="relative py-8 space-y-4 container-md grid items-center min-h-[80vh] md:space-y-16">
      {displayedStats && (
        <div className="space-y-16 md:grid md:items-center md:space-y-0 md:grid-flow-col md:mt-auto">
          <StatContainer>
            <FaSpaceShuttle className="ml-3 md:ml-0" />
            <Stat>{displayedStats.eventCount}</Stat>
            <p>Events created :)</p>
          </StatContainer>
          <StatContainer>
            <FaHeart className="ml-3 md:ml-0" />
            <Stat>{displayedStats.totalLikes}</Stat>
            <p>Likes across all your events</p>
          </StatContainer>
          <StatContainer>
            <FaStar className="ml-8 md:ml-0" />
            <Stat>
              {displayedStats.verified ? (
                <FaThumbsUp />
              ) : (
                <FaThumbsDown className="text-red" />
              )}
            </Stat>
            <p>Verified Society?</p>
          </StatContainer>
        </div>
      )}
      <div className="grid grid-flow-row w-full space-y-2 md:grid-flow-col md:items-center md:space-y-0 md:justify-center md:space-x-2 md:mb-auto">
        <NextLink href="/events/create">
          <button className="btn w-full bg-black gap-2 md:w-[unset]">
            Create Event <FaPlus className="text-info" />
          </button>
        </NextLink>
        {!displayedStats.verified && (
          <NextLink href="/union">
            <button className="btn w-full gap-2 bg-black md:w-[unset]">
              Join a Union <FaHome className="text-info" />
            </button>
          </NextLink>
        )}
      </div>
    </div>
  );
};

interface StatProps {
  children: ReactNode;
}

const Stat: React.FC<StatProps> = ({ children }) => {
  return <h3 className="text-positive font-black text-7xl">{children}</h3>;
};

const StatContainer: React.FC<StatProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-start justify-center text-center space-y-4 md:items-center md:max-w-8 md:mx-auto">
      {children}
    </div>
  );
};

Health.getLayout = (page) => <SocietyAdminLayout>{page}</SocietyAdminLayout>;

export default Health;
