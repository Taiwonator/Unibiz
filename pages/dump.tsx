import { NextPageWithLayout } from './_app';
import { ReactNode, useEffect } from 'react';
import SocietyAdminLayout from '@components/layout/SocietyAdminLayout';
import useNavigation from 'src/hooks/useNavigation';
import { Control } from '@components/core/Form';

const Dump: NextPageWithLayout = () => {
  const { setActiveNavItem } = useNavigation();

  useEffect(() => {
    setActiveNavItem('photo-dump');
  }, []);

  return (
    <>
      <div className="flex w-screen h-[75vh] justify-center items-center">
        <Control
          label="Upload Photos"
          labels={{ bottomLeft: 'Should be no more than 4MB each photo' }}
          type="file"
          className="flex items-center"
        />
      </div>
    </>
  );
};

Dump.getLayout = (page) => <SocietyAdminLayout>{page}</SocietyAdminLayout>;

export default Dump;
