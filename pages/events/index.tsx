import MainLayout from '@components/layout/MainLayout';
import Button from '@components/primitive/Button';
import Head from 'next/head';
import Link from 'next/link';
import { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';
import { FaPlus } from 'react-icons/fa';

const Events: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Unibiz | Events</title>
      </Head>
      <div className="h-full grid grid-cols-1 grid-rows-1">
        <div className="flex items-center justify-center">
          <p>Get Creating :)</p>
        </div>
        <div className="flex justify-end">
          <Link href="/events/test">
            <Button>
              {' '}
              <FaPlus />
              Create Your First Event
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

Events.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Events;
