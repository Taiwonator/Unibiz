import MainLayout from '@components/layout/MainLayout';
import Head from 'next/head';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';

const Health: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Unibiz | Health</title>
      </Head>
      <div>This is the Health</div>
    </>
  );
};

Health.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout pageTitle="Health">{page}</MainLayout>;
};

export default Health;
