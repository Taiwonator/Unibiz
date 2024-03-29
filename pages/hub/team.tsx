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
import { User } from 'generated/graphql';
import { useSession } from 'next-auth/react';
import { LoadingElement } from '@components/primitive/Loading';
import useModal from '@hooks/useModal';
import { useQueryHelpers } from '@hooks/useQueryHelpers';
import {
  ProcessUserRequestMutation,
  RemoveUserFromGroupMutation,
} from 'src/graphql/group/mutations.graphql';

type TabType = 'Members' | 'Requests';

const Team: NextPageWithLayout = (props: any) => {
  const { setActiveNavItem } = useNavigation();
  const { aGroup } = useApp();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('Members');
  const { data: session } = useSession();
  const { client } = useQueryHelpers();
  const { dispatchModal, generateProceedOrCancelComponent } = useModal();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    setActiveNavItem('hub');
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleAction = (
    userId: string,
    prompt: string,
    next: (userId: string) => void
  ) => {
    if (userId) {
      dispatchModal(
        generateProceedOrCancelComponent({
          options: {
            prompt,
            action: () => next(userId),
          },
        })
      );
    }
  };

  const handleRemoverUser = async (userId: string) => {
    if (aGroup) {
      console.log(userId);
      const res = await client
        ?.mutation(RemoveUserFromGroupMutation, {
          userId: userId,
          groupId: aGroup.id,
        })
        .toPromise();
      if (!res.error) {
        router.reload();
      }
    }
  };

  const handleProcessUserRequest =
    (userId: string) => async (accept: boolean) => {
      if (aGroup) {
        console.log(userId);
        const res = await client
          ?.mutation(ProcessUserRequestMutation, {
            userId: userId,
            groupId: aGroup.id,
            accept,
          })
          .toPromise();
        if (!res.error) {
          console.log(res, userId);
          router.reload();
        }
      }
    };

  return (
    <>
      <div className="container-lg pt-16">
        <div className="flex justify-between">
          <h2 className="text-2xl inline-flex items-center space-x-2">
            <button onClick={() => handleBack()}>
              <FaArrowLeft className="text-positive" />
            </button>
            <span>Manage Team</span>
          </h2>
          {/* <div className="space-x-4">
            <button className="btn btn-outline border-solid bg-white text-black gap-2">
              Copy Invite Link
              <FaCopy />
            </button>
          </div> */}
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
          {/* <Search placeholder="Search for team..." /> */}
          <ScrollableArea>
            <>
              {session && (
                <div className="space-y-4">
                  {activeTab === 'Members' &&
                    aGroup?.users?.map(
                      (user, i) =>
                        !!user &&
                        user.id &&
                        user.id != session.user.id && (
                          <TeamMember
                            key={i}
                            user={user}
                            type="Members"
                            onCross={() =>
                              handleAction(
                                user.id as string,
                                'Removing...',
                                () => handleRemoverUser(user.id as string)
                              )
                            }
                          />
                        )
                    )}
                  {activeTab === 'Requests' &&
                    aGroup?.userRequests?.map(
                      (user, i) =>
                        !!user && (
                          <TeamMember
                            key={i}
                            user={user}
                            type="Requests"
                            onTick={() =>
                              handleAction(
                                user.id as string,
                                'Accepting...',
                                () =>
                                  handleProcessUserRequest(user.id as string)(
                                    true
                                  )
                              )
                            }
                            onCross={() =>
                              handleAction(
                                user.id as string,
                                'Rejecting...',
                                () =>
                                  handleProcessUserRequest(user.id as string)(
                                    false
                                  )
                              )
                            }
                          />
                        )
                    )}
                </div>
              )}
            </>
          </ScrollableArea>
        </div>
      </div>
    </>
  );
};

interface TeamMemberProps {
  user: User;
  type: TabType;
  onTick?: () => void;
  onCross: () => void;
}

const TeamMember: React.FC<TeamMemberProps> = ({
  user,
  type,
  onTick,
  onCross,
}) => {
  return (
    <div className="w-full border-b-2">
      <div className="flex justify-between items-center py-4 space-y-4">
        <div className="flex items-center space-x-4">
          <p className="text-md">{user.name}</p>
          <p className="text-sm text-grey3">{user.email}</p>
        </div>
        <div className="flex text-2xl">
          <button className="p-4" onClick={onTick}>
            {type === 'Requests' && (
              <RxCheck className="text-positive text-[1.25em]" />
            )}
          </button>
          <button className="p-4" onClick={onCross}>
            <RxCross1 className="text-errordark" />
          </button>
        </div>
      </div>
    </div>
  );
};

Team.getLayout = (page) => <SocietyAdminLayout>{page}</SocietyAdminLayout>;

export default Team;
