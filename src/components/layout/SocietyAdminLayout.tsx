import Navigation from '@components/structure/Navigation';
import { ReactNode } from 'react';

interface SocietyAdminLayoutProps {
  children: ReactNode;
}

const SocietyAdminLayout: React.FC<SocietyAdminLayoutProps> = ({
  children,
}) => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  );
};

export default SocietyAdminLayout;
