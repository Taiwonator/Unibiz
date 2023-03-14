import MainLayout from '@components/layout/MainLayout';
import Head from 'next/head';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';

const Union: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Unibiz | Union</title>
      </Head>
      <div>This is the Union</div>
    </>
  );
};

Union.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout pageTitle="Union">{page}</MainLayout>;
};

export default Union;
