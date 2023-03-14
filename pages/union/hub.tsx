import Head from 'next/head';
import { ReactElement } from 'react';
import MainLayout from '@components/layout/MainLayout';
import { NextPageWithLayout } from '../_app';

const Hub: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Unibiz | Union Hub</title>
      </Head>
      <div>Union Hub</div>
    </>
  );
};

Hub.getLayout = (page: ReactElement) => (
  <MainLayout pageTitle="Union Hub">{page}</MainLayout>
);

export default Hub;
