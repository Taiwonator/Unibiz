import Navigation from '@components/structure/Navigation';
import { ReactNode } from 'react';

interface MinimialLayoutProps {
  children: ReactNode;
}

const MinimialLayout: React.FC<MinimialLayoutProps> = ({ children }) => {
  return (
    <>
      <Navigation type="minimal" />
      <main>{children}</main>
    </>
  );
};

export default MinimialLayout;
