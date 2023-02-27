import MainLayout from '@components/layout/MainLayout';
import Head from 'next/head';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';

const EventsTest: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Unibiz | Events Test</title>
      </Head>
      <div className="h-full">I am a test</div>
    </>
  );
};

EventsTest.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default EventsTest;
