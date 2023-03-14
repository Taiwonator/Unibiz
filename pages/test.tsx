import { NextPageWithLayout } from './_app';
import { ReactNode } from 'react';
import SocietyAdminLayout from '@components/layout/SocietyAdminLayout';

const Test: NextPageWithLayout = () => {
  return (
    <>
      <div>Hello there I am a test</div>
    </>
  );
};

Test.getLayout = (page: ReactNode) => (
  <SocietyAdminLayout>{page}</SocietyAdminLayout>
);

export default Test;
