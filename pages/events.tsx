import { NextPageWithLayout } from './_app';
import SocietyAdminLayout from '@components/layout/SocietyAdminLayout';
import useNavigation from 'src/hooks/useNavigation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import retreiveFirstName from '@lib/first-name-retreiver';

const Events: NextPageWithLayout = () => {
  const { setActiveNavItem } = useNavigation();

  useEffect(() => {
    setActiveNavItem('events');
  }, []);

  return (
    <SocietyAdminLayout>
      <div className="bg-grey0 py-10">
        <div className="container-lg h-screen"></div>
      </div>
    </SocietyAdminLayout>
  );
};

export default Events;
