import { NextPageWithLayout } from './_app';
import SocietyAdminLayout from '@components/layout/SocietyAdminLayout';
import useNavigation from 'src/hooks/useNavigation';
import { useEffect } from 'react';

const Health: NextPageWithLayout = () => {
  const { setActiveNavItem } = useNavigation();

  useEffect(() => {
    setActiveNavItem('health-check');
  }, []);

  return (
    <SocietyAdminLayout>
      <div>Health Page</div>
    </SocietyAdminLayout>
  );
};

export default Health;
