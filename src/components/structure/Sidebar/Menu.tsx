import { ReactNode } from 'react';
import cx from 'classnames';
import { FaArrowRight } from 'react-icons/fa';
import { defaultUserItems, MenuItemType } from './fixtures';

export interface MenuClassNames extends MenuItemClassNames {
  menuItem?: string;
}

interface MenuProps {
  collapsed?: boolean;
  menuItems?: MenuItemType[];
  className?: string;
  classNames?: MenuClassNames;
}

const Menu: React.FC<MenuProps> = ({
  classNames = {},
  collapsed,
  menuItems = defaultUserItems,
}) => {
  return (
    <div className="grid gap-2">
      {menuItems.map((item) => (
        <MenuItem
          key={item.label}
          active={item.active}
          collapsed={collapsed}
          className={classNames.menuItem}
          classNames={{
            menuItemCollapsed: classNames.menuItemCollapsed,
            menuItemUncollapsed: classNames.menuItemUncollapsed,
          }}
        >
          <>
            {item.Icon}
            {!collapsed && <span className="leading-none">{item.label}</span>}
          </>
        </MenuItem>
      ))}
    </div>
  );
};

interface MenuItemClassNames {
  menuItemCollapsed?: string;
  menuItemUncollapsed?: string;
}

interface MenuItemProps {
  children: ReactNode;
  active?: boolean;
  collapsed?: boolean;
  className?: string;
  classNames?: MenuItemClassNames;
}

const MenuItem: React.FC<MenuItemProps> = ({
  active,
  children,
  className,
  classNames,
  collapsed,
}) => {
  return (
    <div
      className={cx(
        'inline-flex gap-2 py-4 px-4 items-center text-body-md text-lightergrey',
        !active &&
          'hover:bg-darkgrey hover:text-white hover:font-medium hover:rounded-md',
        !active && 'active:bg-grey',
        active && '!text-black font-bold bg-white rounded-md',
        !collapsed && cx(classNames?.menuItemUncollapsed),
        collapsed && classNames?.menuItemCollapsed,
        className
      )}
    >
      <>
        {children}
        {!collapsed && active && <FaArrowRight className="ml-auto" />}
      </>
    </div>
  );
};

export default Menu;
