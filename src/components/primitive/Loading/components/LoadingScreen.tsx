import { ReactNode } from 'react';
import { LoadingSpinner } from '..';

interface LoadingScreenProps {
  children: ReactNode;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ children }) => {
  return (
    <div className="bg-skeleton h-[87.5vh] flex justify-center items-center">
      {children}
    </div>
  );
};
