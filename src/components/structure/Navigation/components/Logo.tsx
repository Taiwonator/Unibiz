import Image from 'next/image';
import cx from 'classnames';
import Link from 'next/link';

interface LogoProps {
  className: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link href="/events">
      <div className="flex">
        <div className={cx('max-w-[23px] order-1', className)}>
          <Image src="/U.png" width={100} height={100} alt="Logo" />
        </div>
        <span className="hidden order-2 font-bold text-xl leading-[1.15em] sm:block">
          NIBIZ
        </span>
      </div>
    </Link>
  );
};
