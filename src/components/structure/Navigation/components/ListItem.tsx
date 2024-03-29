import { ReactNode } from 'react';
import cx from 'classnames';
import Link from 'next/link';

interface ListItem {
  activeItem?: string;
  children: ReactNode;
  components?: {
    Dropdown?: ReactNode;
  };
  disabled?: boolean;
  href?: string;
  id: string;
  onClick?: () => void;
  shallow?: boolean;
}

export const ListItem: React.FC<ListItem> = ({
  activeItem,
  disabled,
  children,
  href,
  id,
  shallow,
  onClick,
}) => {
  return (
    <Link
      className={cx(
        'relative px-4 py-2',
        !disabled && 'hover:bg-grey1 hover:rounded-sm',
        disabled && 'text-grey3',
        activeItem === id &&
          'font-extrabold before:absolute before:bg-black before:h-[2px] before:w-[50%] before:-bottom-2 before:left-[50%] before:-translate-x-[50%]'
      )}
      href={href || ''}
      onClick={onClick}
      shallow
    >
      {children}
    </Link>
  );
};
