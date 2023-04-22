import Image from 'next/image';
import cx from 'classnames';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface LogoProps {
  className: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  const { data: session } = useSession();

  return (
    <Link href={session ? '/events' : ''}>
      <div className="flex h-full items-center">
        <div className={cx('max-w-[23px] order-1', className)}>
          <Image src="/U.png" width={100} height={100} alt="U Logo" />
        </div>
        <span className="hidden order-2 ml-[0.1em] sm:block max-w-[60px]">
          <Image src="/NIBIZ.png" width={52} height={16} alt="NIBIZ Logo" />
        </span>
      </div>
    </Link>
  );
};
