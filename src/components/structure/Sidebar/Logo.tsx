import Image from 'next/image';
import cx from 'classnames';
import ULogo from 'public/logo.png';

interface LogoProps {
  collapsed?: boolean;
}

const Logo: React.FC<LogoProps> = ({ collapsed }) => {
  return (
    <div className={cx('flex items-center gap-2')}>
      <Image
        className={cx('max-w-3')}
        src={ULogo}
        alt="Unibiz Logo"
        width={60}
        height={60}
        placeholder="blur"
      />
      {!collapsed && (
        <h2 className={cx('font-extrabold text-body-md')}>UNIBIZ ADMIN</h2>
      )}
    </div>
  );
};

export default Logo;
