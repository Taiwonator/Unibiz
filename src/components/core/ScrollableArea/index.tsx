import { ReactNode } from 'react';

interface ScrollableAreaProps {
  children?: ReactNode;
}

const ScrollableArea: React.FC<ScrollableAreaProps> = ({ children }) => {
  return (
    <div className="max-h-[550px] scrollbar-hide md:scrollbar-show md:overflow-auto md:slick-scrollbar md:pr-10">
      {children}
    </div>
  );
};

export default ScrollableArea;
