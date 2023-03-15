import cx from 'classnames';
import { useState, useContext } from 'react';
import { FaArrowDown } from 'react-icons/fa';
import { ListItem, Logo } from './components';
import useNavigation from '../../../hooks/useNavigation';
import { FaArrowRight, FaPlus, FaPlusCircle } from 'react-icons/fa';

interface NavigationProps {
  type?: 'minimal';
}

const Navigation: React.FC<NavigationProps> = ({ type }) => {
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
      <ListItem activeItem={activeNavItem} disabled id="superlist">
        Superlist
      </ListItem>
    </>
  );
};

interface UserProfileProps {
  className?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ className }) => {
  return (
    <div className={cx('dropdown dropdown-bottom dropdown-end', className)}>
      <label tabIndex={0}>
        <div className={cx('flex items-center gap-1 font-semibold', className)}>
          <p>Hi Michael</p>
          <span className={cx('text-green')}>:D</span>
          <span className={cx('bg-green rounded-full w-[25px] h-[25px]')} />
        </div>
      </label>
      <ul className="menu dropdown-content  mt-2 bg-base-100 w-56 shadow-md text-sm">
        <p className="text-grey4 px-4 py-2">taiwonator77@gmail.com</p>
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
          <a>Log Out</a>
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
    <div className={cx('flex items-center gap-2 font-semibold', className)}>
      <span className={cx('bg-purple rounded-full w-[25px] h-[25px]')} />
      Christian Union
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
