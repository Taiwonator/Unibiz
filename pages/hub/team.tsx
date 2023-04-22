import { Search } from '@components/core/Form';
import ScrollableArea from '@components/core/ScrollableArea';
import SocietyAdminLayout from '@components/layout/SocietyAdminLayout';
import useApp from '@hooks/useApp';
import useNavigation from '@hooks/useNavigation';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/_app';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaCheck, FaCopy, FaCross } from 'react-icons/fa';
import { RxCheck, RxCross1 } from 'react-icons/rx';
import cx from 'classnames';

type TabType = 'Members' | 'Requests';

const Team: NextPageWithLayout = (props: any) => {
  const { setActiveNavItem } = useNavigation();
  const { aGroup } = useApp();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('Members');

  useEffect(() => {
    setActiveNavItem('hub');
  }, []);

  const handleBack = () => {
    router.back();
  };

  console.log(aGroup);

  return (
    <>
      <div className="bg-[orange] h-60 w-screen flex justify-center items-center">
        <h3 className="text-2xl font-bold text-white bg-black px-4 py-1 rounded-md">
          {aGroup?.shortName}
        </h3>
      </div>
      <div className="container-lg pt-16">
        <div className="flex justify-between">
          <h2 className="text-2xl inline-flex items-center space-x-2">
            <button onClick={() => handleBack()}>
              <FaArrowLeft className="text-positive" />
            </button>
            <span>Manage Team</span>
          </h2>
          <div className="space-x-4">
            <button className="btn btn-outline border-solid bg-white text-black gap-2">
              Copy Invite Link
              <FaCopy />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-grey0 mt-16">
        <div className="container-lg min-h-[75vh] py-16 space-y-16">
          <div className="space-x-8">
            {['Members', 'Requests'].map((tab: string) => (
              <button
                key={tab}
                className={cx(
                  'py-2 px-4',
                  activeTab === tab && 'border-b-2 border-positive font-bold',
                  activeTab !== tab && 'text-grey3'
                )}
                onClick={() => setActiveTab(tab as TabType)}
              >
                {tab}
              </button>
            ))}
          </div>
          <Search placeholder="Search for team..." />
          <ScrollableArea>
            <div className="space-y-4">
              {activeTab === 'Members' &&
                aGroup?.users?.map(
                  (user, i) =>
                    !!user && (
                      <TeamMember
                        key={i}
                        name={user.name || 'loading'}
                        type="Members"
                      />
                    )
                )}
              {activeTab === 'Requests' &&
                aGroup?.userRequests?.map(
                  (user, i) =>
                    !!user && (
                      <TeamMember
                        key={i}
                        name={user.name || 'loading'}
                        type="Requests"
                      />
                    )
                )}
            </div>
          </ScrollableArea>
        </div>
      </div>
    </>
  );
};

interface TeamMemberProps {
  name: string;
  type: TabType;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, type }) => {
  return (
    <div className="w-full border-b-2">
      <div className="flex justify-between items-center py-4">
        <p className="text-md">{name}</p>
        <div className="flex space-x-4 text-2xl">
          <button>
            {type === 'Requests' && (
              <RxCheck className="text-positive text-[1.25em]" />
            )}
          </button>
          <button>
            <RxCross1 className="text-errordark" />
          </button>
        </div>
      </div>
    </div>
  );
};

Team.getLayout = (page) => <SocietyAdminLayout>{page}</SocietyAdminLayout>;

export default Team;
