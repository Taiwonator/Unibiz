import { NextPageWithLayout } from './_app';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';
import TabbedArea, { tabsFixture } from '@components/core/TabbedArea';
import Control, { TextInput } from '@components/core/Form/Control';
import { Search, UniSelect } from '@components/core/Form';
import MinimialLayout from '@components/layout/MinimalLayout';
import BaseLayout from '@components/layout/BaseLayout';
import { LoadingScreen, LoadingSpinner } from '@components/primitive/Loading';

const Home: NextPageWithLayout = () => {
  return (
    <MinimialLayout>
      <LoadingScreen>
        <LoadingSpinner />
      </LoadingScreen>
    </MinimialLayout>
  );
};

export default Home;
