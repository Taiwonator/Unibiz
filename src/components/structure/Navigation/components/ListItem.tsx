import { ReactNode } from 'react';
import cx from 'classnames';
import Link from 'next/link';

interface ListItem {
  active?: boolean;
  children: ReactNode;
  disabled?: boolean;
  href: string;
}

export const ListItem: React.FC<ListItem> = ({
  active,
  disabled,
  children,
  href,
}) => {
  return (
    <Link
      className={cx(
        'relative px-4 py-2',
        !disabled && 'hover:bg-grey1 hover:rounded-sm',
        disabled && 'text-grey3',
        active &&
          'font-extrabold before:absolute before:bg-black before:h-[2px] before:w-[50%] before:-bottom-2 before:left-[50%] before:-translate-x-[50%]'
      )}
      href={href}
    >
      {children}
    </Link>
  );
};
