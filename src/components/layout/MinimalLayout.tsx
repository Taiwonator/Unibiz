import Navigation from '@components/structure/Navigation';
import { ReactNode } from 'react';
import BaseLayout from './BaseLayout';

interface MinimialLayoutProps {
  children: ReactNode;
}

const MinimialLayout: React.FC<MinimialLayoutProps> = ({ children }) => {
  return (
    <BaseLayout>
      <Navigation type="minimal" />
      <main>{children}</main>
    </BaseLayout>
  );
};

export default MinimialLayout;
