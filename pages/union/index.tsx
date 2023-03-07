import Head from 'next/head';
import { ReactElement, useEffect } from 'react';
import MainLayout from '@components/layout/MainLayout';
import { NextPageWithLayout } from '../_app';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Unibiz | Union Home</title>
      </Head>
      <div>Union Section</div>
    </>
  );
};

Home.getLayout = (page: ReactElement) => (
  <MainLayout pageTitle="Union Home">{page}</MainLayout>
);

export default Home;
