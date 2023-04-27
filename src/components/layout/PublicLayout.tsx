import Navigation from '@components/structure/Navigation';
import { ReactNode } from 'react';
import BaseLayout from './BaseLayout';

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <BaseLayout>
      <Navigation type="minimal" />
      <main>{children}</main>
    </BaseLayout>
  );
};

export default PublicLayout;
