import MainLayout from '@components/layout/MainLayout';
import Head from 'next/head';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';

const Space: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Unibiz | Space</title>
      </Head>
      <div>This is the Space</div>
    </>
  );
};

Space.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout pageTitle="Space">{page}</MainLayout>;
};

export default Space;
