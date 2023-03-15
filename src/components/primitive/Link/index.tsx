import cx from 'classnames';
import { ReactNode } from 'react';
import NextLink from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

interface LinkProps {
  children?: ReactNode;
  className?: string;
  href: string;
}

const Link: React.FC<LinkProps> = ({ children, className, href }) => {
  return (
    <NextLink
      className={cx('inline-flex items-center gap-2 font-bold', className)}
      href={href}
    >
      {children}
      <FaArrowRight className="text-positive" />
    </NextLink>
  );
};

export default Link;
