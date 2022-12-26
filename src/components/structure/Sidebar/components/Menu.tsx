import { defaultUserItems, MenuItemType } from '../fixtures';
import { MenuItem } from './MenuItem';

export interface MenuClassNames extends MenuItemClassNames {
  menuItem?: string;
}

export interface MenuProps {
  collapsed?: boolean;
  menuItems?: MenuItemType[];
  className?: string;
  classNames?: MenuClassNames;
}

export const Menu: React.FC<MenuProps> = ({
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

export interface MenuItemClassNames {
  menuItemCollapsed?: string;
  menuItemUncollapsed?: string;
}
