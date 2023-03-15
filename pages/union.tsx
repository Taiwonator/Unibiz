import { NextPageWithLayout } from './_app';
import SocietyAdminLayout from '@components/layout/SocietyAdminLayout';
import useNavigation from 'src/hooks/useNavigation';
import { useEffect } from 'react';

const Union: NextPageWithLayout = () => {
  const { setActiveNavItem } = useNavigation();

  useEffect(() => {
    setActiveNavItem('student-union');
  }, []);

  return (
    <SocietyAdminLayout>
      <div>Union Page</div>
    </SocietyAdminLayout>
  );
};

export default Union;
