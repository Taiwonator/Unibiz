import Navigation from '@components/structure/Navigation';
import classNames from 'classnames';
import { ReactNode } from 'react';
import BaseLayout from './BaseLayout';

interface SocietyAdminLayoutProps {
  children: ReactNode;
  className?: string;
}

const SocietyAdminLayout: React.FC<SocietyAdminLayoutProps> = ({
  children,
  className,
}) => {
  return (
    <BaseLayout>
      <Navigation />
      <main className={className}>{children}</main>
    </BaseLayout>
  );
};

export default SocietyAdminLayout;
