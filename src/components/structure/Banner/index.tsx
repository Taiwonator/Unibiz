import Button from '@components/primitive/Button';
import { RxCross1, RxHamburgerMenu } from 'react-icons/rx';
import cx from 'classnames';

interface BannerProps {
  className?: string;
  sidebar?: {
    isCollapsed?: boolean;
    triggerToggle?: () => void;
  };
}

const Banner: React.FC<BannerProps> = ({ className, sidebar = {} }) => {
  const { isCollapsed, triggerToggle } = sidebar;
  return (
    <div className={className}>
      {' '}
      <Button type="secondary" isIcon onClick={triggerToggle}>
        {isCollapsed ? <RxHamburgerMenu /> : <RxCross1 />}
      </Button>
    </div>
  );
};

export default Banner;
