import { NextPageWithLayout } from './_app';
import { ReactNode, useEffect } from 'react';
import SocietyAdminLayout from '@components/layout/SocietyAdminLayout';
import useNavigation from 'src/hooks/useNavigation';

const Dump: NextPageWithLayout = () => {
  const { setActiveNavItem } = useNavigation();

  useEffect(() => {
    setActiveNavItem('photo-dump');
  }, []);

  return (
    <SocietyAdminLayout>
      <div>Photo Dump Page</div>
    </SocietyAdminLayout>
  );
};

export default Dump;
