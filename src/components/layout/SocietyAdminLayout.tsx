import Navigation from '@components/structure/Navigation';
import { ReactNode } from 'react';
import BaseLayout from './BaseLayout';

interface SocietyAdminLayoutProps {
  children: ReactNode;
}

const SocietyAdminLayout: React.FC<SocietyAdminLayoutProps> = ({
  children,
}) => {
  return (
    <BaseLayout>
      <Navigation />
      <main>{children}</main>
    </BaseLayout>
  );
};

export default SocietyAdminLayout;
