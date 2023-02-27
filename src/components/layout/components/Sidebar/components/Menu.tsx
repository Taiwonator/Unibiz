import { defaultUserItems, MenuItemType } from '../fixtures';
import { MenuItem } from './MenuItem';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  console.log('router: ', router.pathname.split('/')[1]);
  return (
    <ul className="grid gap-2">
      {menuItems.map((item) => (
        <MenuItem
          key={item.label}
          active={`/${router.pathname.split('/')[1]}` === item.link}
          link={item.link}
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
    </ul>
  );
};

export interface MenuItemClassNames {
  menuItemCollapsed?: string;
  menuItemUncollapsed?: string;
}
