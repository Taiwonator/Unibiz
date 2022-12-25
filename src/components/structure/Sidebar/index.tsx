import cx from 'classnames';
import Logo from './Logo';
import Menu, { MenuClassNames } from './Menu';
import Profile from './Profile';

type SidebarClassNames = MenuClassNames; // In the future, union with logo, profile classNames if they obtain prop

interface SidebarProps {
  collapsed?: boolean;
  className?: string;
  classNames?: SidebarClassNames;
}

const Sidebar: React.FC<SidebarProps> = ({
  className,
  classNames,
  collapsed,
}) => {
  return (
    <div className={cx('text-white bg-black inline-block', className)}>
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
