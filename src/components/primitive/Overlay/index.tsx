import { ReactNode } from 'react';

interface BottomProps {
  children: ReactNode;
}

export const Bottom: React.FC<BottomProps> = ({ children }) => (
  <div className="fixed z-10 bottom-0 left-0 w-full py-4 px-4 !mx-0">
    {children}
    <div className="absolute w-full h-full bg-white top-0 left-0 z-[-1] opacity-80" />
  </div>
);
