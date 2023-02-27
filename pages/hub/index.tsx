import MainLayout from '@components/layout/MainLayout';
import Head from 'next/head';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';

const Hub: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Unibiz | Hub</title>
      </Head>
      <div>This is the hub</div>
    </>
  );
};

Hub.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Hub;
