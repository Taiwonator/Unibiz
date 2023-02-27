import Button from '@components/primitive/Button';
import resolvePageTitle from '@lib/page-title-resolver';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa';
import { RxCross1, RxHamburgerMenu } from 'react-icons/rx';

interface BannerProps {
  className?: string;
  sidebar?: {
    isCollapsed?: boolean;
    triggerToggle?: () => void;
  };
}

const Banner: React.FC<BannerProps> = ({ className, sidebar = {} }) => {
  const router = useRouter();
  const pageDepth = router.pathname.split('/').length - 1;
  const { isCollapsed, triggerToggle } = sidebar;
  return (
    <div className={cx('flex gap-4 items-center', className)}>
      <Button
        type={isCollapsed ? 'secondary' : 'negative'}
        isIcon
        onClick={triggerToggle}
      >
        {isCollapsed ? <RxHamburgerMenu /> : <RxCross1 />}
      </Button>
      <div className="flex items-center gap-2">
        {pageDepth > 1 && (
          <Button type="blank" onClick={() => router.back()}>
            <FaArrowLeft
              size={30}
              className="hover:-translate-x-1 hover:text-green"
            />
          </Button>
        )}
        <h1 className="text-heading-sm">
          {resolvePageTitle(router.pathname.slice(1))}
        </h1>
      </div>
    </div>
  );
};

export default Banner;
