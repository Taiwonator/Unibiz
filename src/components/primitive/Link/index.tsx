import cx from 'classnames';
import { ReactNode } from 'react';
import NextLink from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

interface LinkProps {
  children?: ReactNode;
  className?: string;
  href: string;
  shallow?: boolean;
}

const Link: React.FC<LinkProps> = ({ children, className, href, shallow }) => {
  return (
    <NextLink
      className={cx(
        'inline-flex items-center gap-2 font-bold transition-all',
        'hover:text-positive',
        className
      )}
      href={href}
      shallow={shallow}
    >
      {children}
    </NextLink>
  );
};

export default Link;
