import { ReactNode } from 'react';
import cx from 'classnames';

interface ScrollableAreaProps {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
}

const ScrollableArea: React.FC<ScrollableAreaProps> = ({
  children,
  className,
  disabled,
}) => {
  return (
    <div
      className={cx(
        !disabled &&
          'md:max-h-[450px] !overflow-x-hidden scrollbar-hide md:scrollbar-show md:slick-scrollbar md:pr-10',
        disabled && 'md:max-h-[unset]',
        className
      )}
    >
      {children}
    </div>
  );
};

export default ScrollableArea;
