import cx from 'classnames';
import { useState, useContext, useEffect } from 'react';
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
import { useGetUserByIdQuery } from 'generated/graphql';
import useApp from '@hooks/useApp';
import { Group } from '@context/AppContext';
import { initUrqlClient } from 'next-urql';
import { GetGroupById } from 'src/graphql/group/queries.graphql';
import { group } from 'console';
import { LoadingElement } from '@components/primitive/Loading';
import { useQueryHelpers } from '@hooks/useQueryHelpers';
import useModal from '@hooks/useModal';

interface NavigationProps {
  type?: 'minimal';
}

const Navigation: React.FC<NavigationProps> = ({ type }) => {
  const { data: session } = useSession();
  const { user } = session || {};
  const { setAGroup } = useApp();

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
      const currentGroup = result.data?.FindUserById?.state?.currentGroup;
      if (currentGroup) {
        const groupResult = await client
          ?.query(GetGroupById, {
            id: result.data?.FindUserById?.state?.currentGroup,
          })
          .toPromise();
        if (groupResult?.data) setAGroup(groupResult?.data.FindGroupById);
      } else {
        if (societies?.length) {
          setAGroup(societies[0]);
        } else if (unions?.length) {
          setAGroup(unions[0]);
        } else {
          return;
        }
      }
    }
    setGroup();
  }, [result.data?.FindUserById?.state?.currentGroup]);

  return (
    <div
      className={cx(
        'bg-white text-sm font-sans shadow-sm border-b border-b-grey2 sticky top-0 z-10'
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
              user={user}
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
            <p>Hi {user && retreiveFirstName(user.name)}</p>
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
          <a>Change Details</a>
        </li>
        <li>
          <a>
            Create Society
            <FaPlus className="text-grey3 ml-auto font-thin" />
          </a>
        </li>
        <div className="divider my-0 px-4" />
        <li>
          <button onClick={() => handleSignOut()}>Log Out</button>
        </li>
        <div className="p-2 pb-4">
          <button className="btn btn-thin bg-black w-full">
            Delete Account
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
  const { aGroup, setAGroup, enableGuestView, setAGroupById } = useApp();
  const { dispatchModal, generateProceedOrCancelComponent } = useModal();

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

  return (
    <div className={cx('flex items-center relative gap-2', className)}>
      <span className={cx('bg-purple rounded-full w-[25px] h-[25px]')} />
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
                {s.name}
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
          {aGroup && <div className="divider my-0 px-4" />}
          <li>
            <button onClick={() => handleEnableGuestView()}>Guest view</button>
          </li>
          <li>
            <NextLink href="/request">Find your Society</NextLink>
          </li>
          <li>
            <a>
              Create Society
              <FaPlus className="text-grey3 ml-auto font-thin" />
            </a>
          </li>
          {aGroup && (
            <>
              <div className="divider my-0 px-4" />
              <div className="p-2 pb-4">
                <button className="btn btn-thin bg-black w-full">
                  {displayLeaveGroupLabel(aGroup)}
                </button>
              </div>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
