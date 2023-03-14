import cx from 'classnames';
import { FaArrowDown } from 'react-icons/fa';
import { ListItem, Logo } from './components';

interface NavigationProps {
  type?: string;
}

const Navigation: React.FC<NavigationProps> = ({ type }) => {
  return (
    <div className={cx('text-sm font-sans shadow-sm border-b border-b-grey2')}>
      <div className={cx('container-lg px-6')}>
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
      </div>

      <nav
        className={cx(
          'flex gap-8 pb-2 pr-4 overflow-x-auto scrollbar-hide whitespace-nowrap md:container-lg'
        )}
      >
        <div className={cx('flex translate-x-2')}>
          <SocietyAdminListItems />
        </div>
      </nav>
    </div>
  );
};

const SocietyAdminListItems: React.FC = ({}) => {
  return (
    <>
      <ListItem href="#">Events</ListItem>
      <ListItem href="#">Hub</ListItem>
      <ListItem active href="#">
        Student Union
      </ListItem>
      <ListItem href="#">Photo Dump</ListItem>
      <ListItem href="#">Health Check</ListItem>
      <ListItem disabled href="#">
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
    <div className={cx('flex items-center gap-1 font-semibold', className)}>
      Hi Michael
      <span className={cx('text-green')}>:D</span>
      <span className={cx('bg-green rounded-full w-[25px] h-[25px]')} />
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
      <FaArrowDown className={cx('')} />
    </div>
  );
};

export default Navigation;
