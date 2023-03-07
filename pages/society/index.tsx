import Head from 'next/head';
import { useCreateUserMutation, useGetAllUsersQuery } from 'generated/graphql';
import { isProduction } from '@lib/env-helpers';
import { ReactElement, useEffect } from 'react';
import MainLayout from '@components/layout/MainLayout';
import { NextPageWithLayout } from '../_app';
import { useSession, signIn } from 'next-auth/react';
import moment from 'moment';
import { useRouter } from 'next/router';

const Home: NextPageWithLayout = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Unibiz | Society Home</title>
      </Head>
      <div>Hello there {session && session.user?.name}</div>
    </>
  );
};

Home.getLayout = (page: ReactElement) => (
  <MainLayout pageTitle="Home">{page}</MainLayout>
);

export default Home;
