import Button from '@components/primitive/Button';
import ScreenButton from '@components/primitive/ScreenButton';
import Head from 'next/head';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

export default function Events() {
  const experiences = [];
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
}
