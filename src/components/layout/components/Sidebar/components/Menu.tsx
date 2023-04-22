import { defaultUserItems, unionUserItems, MenuItemType } from '../fixtures';
import { MenuItem } from './MenuItem';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export interface MenuClassNames extends MenuItemClassNames {
  menuItem?: string;
}

export interface MenuProps {
  collapsed?: boolean;
  menuItems?: MenuItemType[];
  className?: string;
  classNames?: MenuClassNames;
  user?: any; // TEMP
}

export const Menu: React.FC<MenuProps> = ({
  classNames = {},
  collapsed,
  menuItems = defaultUserItems,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const menuItemsMap: any = {
    society_organiser: defaultUserItems,
    union_rep: unionUserItems,
    '': [],
  };
  menuItems = menuItemsMap[session?.user.type[0] || ''];

  return (
    <ul className="grid gap-2">
      {menuItems.map((item) => (
        <MenuItem
          key={item.label}
          active={`/${router.pathname.trim().split(' ')[0]}` === item.link}
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
