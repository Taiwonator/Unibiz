import { Search } from '@components/core/Form';
import ScrollableArea from '@components/core/ScrollableArea';
import SocietyAdminLayout from '@components/layout/SocietyAdminLayout';
import useApp from '@hooks/useApp';
import useNavigation from '@hooks/useNavigation';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/_app';
import { useEffect, useState } from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaCopy,
  FaCross,
} from 'react-icons/fa';
import { RxCheck, RxCross1 } from 'react-icons/rx';
import cx from 'classnames';
import { useSession } from 'next-auth/react';
import { useQueryHelpers } from '@hooks/useQueryHelpers';
import useModal from '@hooks/useModal';
import { Society, Union } from 'generated/graphql';
import {
  ProcessSocietyRequestMutation,
  RemoveSocietyFromUnionMutation,
} from 'src/graphql/union/mutations.graphql';

type TabType = 'Members' | 'Requests';

const Societies: NextPageWithLayout = (props: any) => {
  const { setActiveNavItem } = useNavigation();
  const { aGroup } = useApp();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('Members');
  const { data: session } = useSession();
  const { client } = useQueryHelpers();
  const { dispatchModal, generateProceedOrCancelComponent } = useModal();

  useEffect(() => {
    setActiveNavItem('hub');
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleAction = (
    society: string,
    prompt: string,
    next: (society: string) => void
  ) => {
    if (society) {
      dispatchModal(
        generateProceedOrCancelComponent({
          options: {
            prompt,
            action: () => next(society),
          },
        })
      );
    }
  };

  const handleRemoverUser = async (societyId: string) => {
    if (aGroup) {
      const res = await client
        ?.mutation(RemoveSocietyFromUnionMutation, {
          societyId: societyId,
          unionId: aGroup.id,
        })
        .toPromise();
      if (!res.error) {
        router.reload();
      }
    }
  };

  const handleProcessUserRequest =
    (societyId: string) => async (accept: boolean) => {
      if (aGroup) {
        const res = await client
          ?.mutation(ProcessSocietyRequestMutation, {
            societyId: societyId,
            unionId: aGroup.id,
            accept,
          })
          .toPromise();
        if (!res.error) {
          router.reload();
        }
      }
    };

  // societies
  // societyRequests

  return (
    <>
      <div className="container-lg pt-16">
        <div className="flex justify-between">
          <h2 className="text-2xl inline-flex items-center space-x-2">
            <button onClick={() => handleBack()}>
              <FaArrowLeft className="text-positive" />
            </button>
            <span>Manage Societies</span>
          </h2>
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
          <ScrollableArea>
            <>
              {session && (
                <div className="space-y-4">
                  {activeTab === 'Members' &&
                    (aGroup as Union)?.societies?.map(
                      (society, i) =>
                        !!society &&
                        society.id &&
                        society.id != session.user.id && (
                          <SocietyMember
                            key={i}
                            society={society}
                            type="Members"
                            onCross={() =>
                              handleAction(
                                society.id as string,
                                'Removing...',
                                () => handleRemoverUser(society.id as string)
                              )
                            }
                          />
                        )
                    )}
                  {activeTab === 'Requests' &&
                    (aGroup as Union)?.societyRequests?.map(
                      (society, i) =>
                        !!society && (
                          <SocietyMember
                            key={i}
                            society={society}
                            type="Requests"
                            onTick={() =>
                              handleAction(
                                society.id as string,
                                'Accepting...',
                                () =>
                                  handleProcessUserRequest(
                                    society.id as string
                                  )(true)
                              )
                            }
                            onCross={() =>
                              handleAction(
                                society.id as string,
                                'Rejecting...',
                                () =>
                                  handleProcessUserRequest(
                                    society.id as string
                                  )(false)
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

interface SocietyMemberProps {
  society: Society;
  type: TabType;
  onTick?: () => void;
  onCross: () => void;
}

const SocietyMember: React.FC<SocietyMemberProps> = ({
  society,
  type,
  onTick,
  onCross,
}) => {
  return (
    <div className="w-full border-b-2">
      <div className="flex justify-between items-center py-4 space-y-4">
        <div className="flex items-center space-x-4">
          <p className="text-md">{society.name}</p>
          <NextLink href={`/union/society/${society.id}`} target="_blank">
            <FaArrowRight className="text-positive" />
          </NextLink>
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

Societies.getLayout = (page) => <SocietyAdminLayout>{page}</SocietyAdminLayout>;

export default Societies;
