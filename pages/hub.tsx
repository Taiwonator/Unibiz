import { NextPageWithLayout } from './_app';
import SocietyAdminLayout from '@components/layout/SocietyAdminLayout';
import useNavigation from 'src/hooks/useNavigation';
import { useEffect } from 'react';

const Hub: NextPageWithLayout = () => {
  const { setActiveNavItem } = useNavigation();

  useEffect(() => {
    setActiveNavItem('hub');
  }, []);

  return (
    <SocietyAdminLayout>
      <div>Hub Page</div>
    </SocietyAdminLayout>
  );
};

export default Hub;
