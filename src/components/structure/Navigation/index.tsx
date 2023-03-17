import cx from 'classnames';
import { useState, useContext } from 'react';
import { FaArrowDown } from 'react-icons/fa';
import { ListItem, Logo } from './components';
import useNavigation from '../../../hooks/useNavigation';
import { FaArrowRight, FaPlus, FaPlusCircle } from 'react-icons/fa';
import useAlert from 'src/hooks/useAlert';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import retreiveFirstName from '@lib/first-name-retreiver';
import Image from 'next/image';

interface NavigationProps {
  type?: 'minimal';
}

const Navigation: React.FC<NavigationProps> = ({ type }) => {
  const { data: session } = useSession();
  const { user } = session || {};

  return (
    <div
      className={cx(
        'bg-white text-sm font-sans shadow-sm border-b border-b-grey2 sticky top-0 z-10'
      )}
    >
      <div className={cx('container-lg px-6')}>
        {type !== 'minimal' && (
          <nav className={cx('grid grid-flow-col py-6', 'md:flex')}>
            <SocietySelector
              className={cx('flex place-self-start', 'md:order-2')}
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
      <ListItem
        activeItem={activeNavItem}
        href="/hub"
        id="hub"
        onClick={() => setActiveNavItem('hub')}
      >
        Hub
      </ListItem>
      <ListItem
        activeItem={activeNavItem}
        href="/union"
        id="student-union"
        onClick={() => setActiveNavItem('student-union')}
      >
        Student Union
      </ListItem>
      <ListItem
        activeItem={activeNavItem}
        href="dump"
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
  );
};

interface UserProfileProps {
  className?: string;
  user?: any;
}

const UserProfile: React.FC<UserProfileProps> = ({ className, user }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/auth/signin');
  };

  return (
    <div className={cx('dropdown dropdown-bottom dropdown-end', className)}>
      <label tabIndex={0}>
        <div className={cx('flex items-center gap-1 font-semibold', className)}>
          <p>Hi {user && retreiveFirstName(user.name)}</p>
          <span className={cx('text-green')}>:D</span>
          <div
            className={cx(
              'relative bg-green rounded-full w-[25px] h-[25px] overflow-hidden'
            )}
          >
            {user && user.image && <Image src={user.image} fill alt="avatar" />}
          </div>
        </div>
      </label>
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

interface SocietySelectorProps {
  className?: string;
}

const SocietySelector: React.FC<SocietySelectorProps> = ({ className }) => {
  return (
    <div className={cx('flex items-center gap-2', className)}>
      <span className={cx('bg-purple rounded-full w-[25px] h-[25px]')} />
      <span className="font-semibold">Christian Union</span>
      <div className="dropdown">
        <label tabIndex={0}>
          <FaArrowDown tabIndex={0} className="flex" />
        </label>
        <ul className="menu dropdown-content  mt-2 bg-base-100 w-56 shadow-md text-sm">
          <li>
            <a>
              Radical Youth
              <FaArrowRight className="text-grey3 ml-auto font-thin" />
            </a>
          </li>
          <li>
            <a>
              Christian Union
              <FaArrowRight className="text-grey3 ml-auto font-thin" />
            </a>
          </li>
          <div className="divider my-0 px-4" />
          <li>
            <a>Find your Society</a>
          </li>
          <li>
            <a>
              Create Society
              <FaPlus className="text-grey3 ml-auto font-thin" />
            </a>
          </li>
          <div className="divider my-0 px-4" />
          <div className="p-2 pb-4">
            <button className="btn btn-thin bg-black w-full">
              Leave Society
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
