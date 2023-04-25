import cx from 'classnames';
import { useState, useContext, useEffect, ReactNode } from 'react';
import { FaArrowDown } from 'react-icons/fa';
import { ListItem, Logo } from './components';
import useNavigation from '../../../hooks/useNavigation';
import { FaArrowRight, FaPlus, FaPlusCircle } from 'react-icons/fa';
import useAlert from 'src/hooks/useAlert';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import retreiveFirstName from '@lib/first-name-retreiver';
import Image from 'next/image';
import NextLink from 'next/link';
import { Society, Union, useGetUserByIdQuery, User } from 'generated/graphql';
import useApp from '@hooks/useApp';
import { Group } from '@context/AppContext';
import { initUrqlClient } from 'next-urql';
import { GetGroupById } from 'src/graphql/group/queries.graphql';
import { group } from 'console';
import { LoadingElement } from '@components/primitive/Loading';
import { useQueryHelpers } from '@hooks/useQueryHelpers';
import useModal from '@hooks/useModal';
import {
  DeleteSocietyMutation,
  LeaveSocietyMutation,
} from 'src/graphql/society/mutations.graphql';
import { LeaveGroupMutation } from 'src/graphql/group/mutations.graphql';
import { GetUserByIdQuery } from 'src/graphql/user/queries.graphql';

interface NavigationProps {
  type?: 'minimal';
}

const Navigation: React.FC<NavigationProps> = ({ type }) => {
  const { data: session } = useSession();
  const { user } = session || {};
  const { setAGroup, enableGuestView, isAGuest } = useApp();

  const { context, client } = useQueryHelpers();
  const [result] = useGetUserByIdQuery({
    context,
    variables: { id: user?.id },
  });

  const societies = result.data?.FindUserById?.societies;
  const unions = result.data?.FindUserById?.unions;
  const groupSelectorProps = {
    societies,
    unions,
    userId: user?.id,
  };

  useEffect(() => {
    async function setGroup() {
      if (user) {
        const userRes = await client
          ?.query(GetUserByIdQuery, { id: user.id })
          .toPromise();
        const currentGroup = userRes.data?.FindUserById?.state?.currentGroup;
        if (currentGroup) {
          const groupResult = await client
            ?.query(GetGroupById, {
              id: result.data?.FindUserById?.state?.currentGroup,
            })
            .toPromise();
          if (
            groupResult?.data &&
            groupResult?.data.FindGroupById?.userIds?.includes(user.id)
          ) {
            setAGroup(groupResult?.data.FindGroupById);
          }
        } else {
          enableGuestView();
          return;
        }
      } else {
        return;
      }
    }
    setGroup();
  }, [result.data?.FindUserById?.state?.currentGroup, client, user]);

  return (
    <div
      className={cx(
        'bg-white text-sm font-sans shadow-sm border-b border-b-grey2 sticky top-0 z-20'
      )}
    >
      <div className={cx('container-lg px-6')}>
        {type !== 'minimal' && (
          <nav className={cx('grid grid-flow-col py-6', 'md:flex')}>
            <GroupSelector
              className={cx('flex place-self-start', 'md:order-2')}
              {...groupSelectorProps}
            />
            <div
              className={cx(
                'flex mx-auto',
                'md:mx-0 md:pr-4 md:mr-4 md:border-r-2 border-r-black'
              )}
            >
              <Logo className={cx('flex place-self-center', 'md:order-1')} />
            </div>

            <UserProfile
              className={cx('flex place-self-end', 'md:order-3 md:ml-auto')}
              user={{
                ...user,
                name: result?.data?.FindUserById?.name,
              }}
            />
          </nav>
        )}
        {type === 'minimal' && (
          <nav
            className={cx('grid grid-flow-col py-6 justify-center', 'md:flex')}
          >
            <MinimalLayoutContent />
          </nav>
        )}
      </div>

      {type !== 'minimal' && (
        <nav
          className={cx(
            'flex gap-8 pb-2 pr-4 overflow-x-auto scrollbar-hide whitespace-nowrap md:max-w-screen-xl md:mx-auto'
          )}
        >
          <div className={cx('flex translate-x-2')}>
            <SocietyAdminListItems />
          </div>
        </nav>
      )}
    </div>
  );
};

const MinimalLayoutContent: React.FC = () => (
  <div className="flex gap-4">
    <div
      className={cx(
        'flex mx-auto',
        'md:mx-0 md:pr-4 md:border-r-2 border-r-black'
      )}
    >
      <Logo className={cx('flex place-self-center', 'md:order-1')} />
    </div>
    <h2 className="text-sm font-semibold">Admin Portal</h2>
  </div>
);

const SocietyAdminListItems: React.FC = ({}) => {
  const { dispatchAlert } = useAlert();

  const { activeNavItem, setActiveNavItem } = useNavigation();
  const { aGroup, isASociety, isAUnion, isAGuest } = useApp();

  if (!aGroup)
    return <LoadingElement className="ml-4 w-96 h-8 max-w-[90%] md:w-[80vw]" />;

  return (
    <>
      <ListItem
        activeItem={activeNavItem}
        href="/events"
        id="events"
        onClick={() => setActiveNavItem('events')}
      >
        Events
      </ListItem>
      {!isAGuest && (
        <ListItem
          activeItem={activeNavItem}
          href="/hub"
          id="hub"
          onClick={() => setActiveNavItem('hub')}
        >
          Hub
        </ListItem>
      )}
      <ListItem
        activeItem={activeNavItem}
        href="/union"
        id="student-union"
        onClick={() => setActiveNavItem('student-union')}
      >
        Student Union
      </ListItem>
      {isASociety && (
        <>
          <ListItem
            activeItem={activeNavItem}
            href="/dump"
            id="photo-dump"
            onClick={() => setActiveNavItem('photo-dump')}
          >
            Photo Dump
          </ListItem>
          <ListItem
            activeItem={activeNavItem}
            href="/health"
            id="health-check"
            onClick={() => setActiveNavItem('health-check')}
          >
            Health Check
          </ListItem>
          <ListItem
            onClick={() =>
              dispatchAlert({
                text: 'Superlist integration coming soon...',
                type: 'info',
              })
            }
            activeItem={activeNavItem}
            disabled
            id="superlist"
          >
            Superlist
          </ListItem>
        </>
      )}
    </>
  );
};

interface UserProfileProps {
  className?: string;
  user?: any;
}

const UserProfile: React.FC<UserProfileProps> = ({ className, user }) => {
  const router = useRouter();
  const { clearAState } = useApp();

  const handleSignOut = async () => {
    clearAState();
    await signOut({ redirect: false });
    router.push('/auth/signin');
  };

  return (
    <div className={cx('dropdown dropdown-bottom dropdown-end', className)}>
      {!user ? (
        <LoadingElement className="w-40 h-4" />
      ) : (
        <label tabIndex={0}>
          <div
            className={cx('flex items-center gap-1 font-semibold', className)}
          >
            <p>Hi {user && user.name && retreiveFirstName(user.name)}</p>
            <span className={cx('text-green')}>:D</span>
            <div
              className={cx(
                'relative bg-green rounded-full w-[25px] h-[25px] overflow-hidden'
              )}
            >
              {user && user.image && (
                <Image src={user.image} fill alt="avatar" />
              )}
            </div>
          </div>
        </label>
      )}

      <ul className="menu dropdown-content  mt-2 bg-base-100 w-56 shadow-md text-sm">
        {user && <p className="text-grey4 px-4 py-2">{user.email}</p>}
        <li>
          <NextLink href={'/user/update'}>Update Name</NextLink>
        </li>
        <li>
          <NextLink href="/union/society/create">
            Create Society
            <FaPlus className="text-grey3 ml-auto font-thin" />
          </NextLink>
        </li>
        <div className="divider my-0 px-4" />
        <div className="p-2 pb-4">
          <button
            className="btn btn-thin bg-black w-full"
            onClick={() => handleSignOut()}
          >
            Log Out
          </button>
        </div>
      </ul>
    </div>
  );
};

interface GroupSelectorProps {
  className?: string;
  societies?: any;
  unions?: any;
  userId?: string;
}

const GroupSelector: React.FC<GroupSelectorProps> = ({
  className,
  societies,
  unions,
  userId,
}) => {
  const {
    aGroup,
    setAGroup,
    enableGuestView,
    setAGroupById,
    clearAGroup,
    isAUnion,
    isASociety,
    isAGuest,
  } = useApp();
  const { dispatchModal, generateProceedOrCancelComponent } = useModal();
  const { data: session } = useSession();
  const { client } = useQueryHelpers();
  const router = useRouter();

  const { user } = session || {};

  const handleGroupClick = (g: Group | null) => {
    if (g && aGroup) {
      if (g.id && g.id != aGroup.id) {
        setAGroup(g, userId);
        setAGroupById(g.id, userId);
      }
    }
  };

  const handleEnableGuestView = () => {
    dispatchModal(
      generateProceedOrCancelComponent({
        options: {
          prompt: 'Are you sure? You may be redirected',
          action: enableGuestView,
        },
      })
    );
  };

  useEffect(() => {
    console.log('aGroup: ', aGroup);
  }, [aGroup]);

  const displayGroupName = (g: Group | null = {}) => {
    if (g) {
      switch (g.__typename) {
        case 'Society':
        case 'Union':
          return g.shortName;
        default:
          return 'Guest View';
      }
    } else {
      return 'Guest View';
    }
  };

  const displayLeaveGroupLabel = (g: Group | null = {}) => {
    if (g) {
      switch (g.__typename) {
        case 'Society':
          return 'Leave Society';

        case 'Union':
          return 'Leave Union';

        default:
          return null;
      }
    } else {
      return null;
    }
  };

  const displayDeleteGroupLabel = (g: Group | null = {}) => {
    if (g) {
      switch (g.__typename) {
        case 'Society':
          return 'Delete Society';

        case 'Union':
          return 'Delete Union';

        default:
          return null;
      }
    } else {
      return null;
    }
  };

  const isGroupLeaveable = () => {
    if (aGroup) {
      if (aGroup.users) {
        if (aGroup.users.length > 1) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    }
    return false;
  };

  const isSocietyDeleteable = () => {
    if (aGroup && isASociety) {
      if (aGroup.users) {
        if (aGroup.users.length === 1) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    }
    return false;
  };

  const handleSocietyDelete = () => {
    dispatchModal(
      generateProceedOrCancelComponent({
        options: {
          prompt: 'You will not be able to recover the society',
          action: deleteSociety,
        },
      })
    );
  };

  const handleGroupLeave = () => {
    dispatchModal(
      generateProceedOrCancelComponent({
        options: {
          prompt: 'Are you sure you want to leave?',
          action: leaveGroup,
        },
      })
    );
  };

  const leaveGroup = async () => {
    if (aGroup && user) {
      try {
        const res = await client
          ?.mutation(LeaveGroupMutation, {
            groupId: aGroup.id,
            userId: user.id,
          })
          .toPromise();
        if (!res.error) {
          clearAGroup(user.id, () => router.reload());
        }
      } catch (e) {
        throw e;
      }
    }
  };

  const deleteSociety = async () => {
    if (aGroup && user) {
      try {
        const res = await client
          ?.mutation(DeleteSocietyMutation, { societyId: aGroup.id })
          .toPromise();
        if (!res.error) {
          clearAGroup(user.id, () => router.reload());
        }
      } catch (e) {
        throw e;
      }
    }
  };

  const showUserRequestBubble = () => {
    const society = aGroup as Society;
    if (society) {
      if (society.userRequestIds) {
        return !!society.userRequestIds.length;
      }
    }
  };

  const showSocietyRequestBubble = () => {
    const union = aGroup as Union;
    if (union) {
      if (union.societyRequestIds) {
        return !!union.societyRequestIds.length;
      }
    }
  };

  console.log(isASociety || isAUnion);

  return (
    <div className={cx('flex items-center relative gap-2', className)}>
      <div
        className={cx(
          'relative rounded-full w-[25px] h-[25px] overflow-hidden'
        )}
      >
        {aGroup?.imageUrl && (isASociety || isAUnion) ? (
          <Image
            src={aGroup?.imageUrl}
            fill
            style={{
              objectFit: 'cover',
            }}
            alt="placeholder"
            className="absolute w-full h-full z-10 top-0"
          />
        ) : (
          <LoadingElement className="absolute h-full w-full left-0 top-0 -z-10" />
        )}
      </div>
      {!aGroup ? (
        <LoadingElement className="w-8 h-6" />
      ) : (
        <span className="font-semibold">{displayGroupName(aGroup)}</span>
      )}

      <div className="dropdown">
        <label tabIndex={0}>
          <FaArrowDown tabIndex={0} className="flex" />
        </label>
        <ul className="menu dropdown-content mt-2 bg-base-100 w-56 shadow-md text-sm">
          {!!societies?.length && (
            <p className="px-4 py-1 text-xs text-grey3 font-regular">
              Socieites
            </p>
          )}
          {societies?.map((s: any) => (
            <li key={s.name}>
              <button
                onClick={() => handleGroupClick(s)}
                className={cx(s.name === aGroup?.name && 'active')}
              >
                {s.shortName}
                <FaArrowRight className="text-grey3 ml-auto font-thin" />
              </button>
            </li>
          ))}
          {!!unions?.length && (
            <p className="px-4 py-1 text-xs text-grey3 font-regular">Unions</p>
          )}
          {unions?.map((u: any) => (
            <li key={u.name}>
              <button
                onClick={() => handleGroupClick(u)}
                className={cx(u.name === aGroup?.name && 'active')}
              >
                {u.shortName}
                <FaArrowRight className="text-grey3 ml-auto font-thin" />
              </button>
            </li>
          ))}
          {aGroup && !isAGuest && <div className="divider my-0 px-4" />}
          {!isAGuest && (
            <li>
              <button onClick={() => handleEnableGuestView()}>
                Guest view
              </button>
            </li>
          )}
          <li>
            <NextLink href="/union">Find your Society</NextLink>
          </li>
          <li>
            <NextLink href="/union/society/create">
              Create Society
              <FaPlus className="text-grey3 ml-auto font-thin" />
            </NextLink>
          </li>
          {aGroup && (
            <>
              {isSocietyDeleteable() && <div className="divider my-0 px-4" />}
              <div className="px-2">
                {isGroupLeaveable() && (
                  <button
                    className="btn btn-thin bg-black w-full"
                    onClick={() => handleGroupLeave()}
                  >
                    {displayLeaveGroupLabel(aGroup)}
                  </button>
                )}
                {isSocietyDeleteable() && (
                  <button
                    className="btn btn-thin bg-black w-full mb-2"
                    onClick={() => handleSocietyDelete()}
                  >
                    Delete Society
                  </button>
                )}
              </div>
            </>
          )}
        </ul>
      </div>
      {aGroup && (
        <div className="flex space-x-2 items-start">
          {(isASociety || isAUnion) && showUserRequestBubble() && (
            <Bubble
              className="bg-info"
              tip="User Requests"
              onClick={() => router.push('/hub/team')}
            >
              {aGroup?.userRequestIds?.length}
            </Bubble>
          )}
          {isAUnion && showSocietyRequestBubble() && (
            <Bubble
              className="bg-purple"
              tip="Society Requests"
              onClick={() => router.push('/hub/societies')}
            >
              {(aGroup as Union)?.societyRequestIds?.length}
            </Bubble>
          )}
        </div>
      )}
    </div>
  );
};

interface BubbleProps {
  children: ReactNode;
  className?: string;
  tip?: string;
  onClick?: () => void;
}

const Bubble: React.FC<BubbleProps> = ({
  children,
  className,
  tip,
  onClick,
}) => {
  return (
    <button
      data-tip={tip}
      onClick={onClick}
      className={cx(
        'flex items-center justify-center bg-black text-white rounded-full p-[5px] min-w-[20px] h-[20px] tooltip tooltip-bottom',
        className
      )}
    >
      {children}
    </button>
  );
};

export default Navigation;
