import cx from 'classnames';
import Link from 'next/link';
import { ReactNode } from 'react';
import { FaArrowRight } from 'react-icons/fa';

interface MenuItemClassNames {
  menuItemCollapsed?: string;
  menuItemUncollapsed?: string;
}

export interface MenuItemProps {
  children: ReactNode;
  active?: boolean;
  collapsed?: boolean;
  className?: string;
  classNames?: MenuItemClassNames;
  link: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  active,
  children,
  className,
  classNames,
  collapsed,
  link,
}) => {
  return (
    <li>
      <Link
        href={link}
        className={cx(
          'inline-flex gap-2 py-4 px-4 items-center text-body-md text-lightergrey select-none w-full',
          !active &&
            'hover:bg-darkgrey/60 hover:text-white hover:font-medium hover:rounded-md hover:cursor-pointer focus:bg-darkgrey focus:text-white focus:font-medium focus:rounded-md active:bg-grey',
          active && '!text-black font-bold bg-white rounded-md',
          !collapsed && cx(classNames?.menuItemUncollapsed),
          collapsed && classNames?.menuItemCollapsed,
          className
        )}
      >
        {children}
        {!collapsed && active && <FaArrowRight className="ml-auto" />}
      </Link>
    </li>
  );
};
