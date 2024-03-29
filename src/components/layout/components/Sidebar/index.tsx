// import StarryBackground from '@components/core/StarryBackground';
import cx from 'classnames';
import { Logo, Menu, MenuClassNames, Profile } from './components';
import { useSession } from 'next-auth/react';

interface SidebarClassNames extends MenuClassNames {
  sidebarCollapsed?: string;
  sidebarUncollapsed?: string;
}
interface SidebarProps {
  collapsed?: boolean;
  className?: string;
  classNames?: SidebarClassNames;
  actions?: {
    triggerCollapse?: () => void;
    triggerUncollapse?: () => void;
  };
}

const Sidebar: React.FC<SidebarProps> = ({
  actions = {},
  className,
  classNames,
  collapsed,
}) => {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div
      className={cx(
        'text-white bg-black inline-block transition-width ease-in-out delay-50 whitespace-nowrap overflow-hidden shrink-0 relative',
        'md:delay-50',
        collapsed && classNames?.sidebarCollapsed,
        !collapsed && classNames?.sidebarUncollapsed,
        className
      )}
      onMouseEnter={actions?.triggerUncollapse}
      onMouseLeave={actions?.triggerCollapse}
      onFocus={actions?.triggerUncollapse}
      onBlur={actions?.triggerCollapse}
    >
      <div className={cx('flex flex-col h-full gap-10 z')}>
        <Logo collapsed={collapsed} />
        <div className={cx('md:max-w-sidebar z-10')}>
          <Menu
            collapsed={collapsed}
            classNames={{
              menuItem: classNames?.menuItem,
              menuItemCollapsed: classNames?.menuItemCollapsed,
              menuItemUncollapsed: classNames?.menuItemUncollapsed,
            }}
            user={user}
          />
        </div>
        <div className="mt-auto">
          <Profile name={user?.name as string} collapsed={collapsed} />
        </div>
      </div>
      {/* <StarryBackground
        className={cx('motion-reduce:hidden')}
        width={650}
        height={1000}
      /> */}
    </div>
  );
};

export default Sidebar;

//
