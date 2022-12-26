import cx from 'classnames';
import Logo from './Logo';
import Menu, { MenuClassNames } from './Menu';
import Profile from './Profile';

interface SidebarClassNames extends MenuClassNames {
  // And will extend Logo/Profile classNames in the future
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
  return (
    <div
      className={cx(
        'text-white bg-black inline-block transition-width ease-in-out delay-50 whitespace-nowrap overflow-hidden shrink-0',
        collapsed && classNames?.sidebarCollapsed,
        !collapsed && classNames?.sidebarUncollapsed,
        className
      )}
      onMouseEnter={actions?.triggerUncollapse}
      onMouseLeave={actions?.triggerCollapse}
    >
      <div className={cx('flex flex-col h-full gap-10')}>
        <Logo collapsed={collapsed} />
        <div className={cx('md:max-w-sidebar')}>
          <Menu
            collapsed={collapsed}
            classNames={{
              menuItem: classNames?.menuItem,
              menuItemCollapsed: classNames?.menuItemCollapsed,
              menuItemUncollapsed: classNames?.menuItemUncollapsed,
            }}
          />
        </div>
        <div className="mt-auto">
          <Profile collapsed={collapsed} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
