import Head from 'next/head';
import { useCreateUserMutation, useGetAllUsersQuery } from 'generated/graphql';
import { isProduction } from '@lib/env-helpers';
import { ReactElement } from 'react';
import MainLayout from '@components/layout/MainLayout';
import { NextPageWithLayout } from './_app';

const isProd = isProduction();

const Home: NextPageWithLayout = () => {
  const [result] = useGetAllUsersQuery();
  const [mutationResult, executeMutation] = useCreateUserMutation();

  const { data, fetching, error } = result;
  const { data: d, fetching: f, error: e } = mutationResult;

  if (isProd) {
    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;
  }

  const createUser = (): void => {
    if (isProd) {
      executeMutation({
        email: 'email_test22123352g4v523220@gmail.com',
        password: 'password',
        firstName: 'Michael',
        lastName: 'Taiwo',
      });
    } else {
      alert('create user');
    }
  };

  return (
    <>
      <Head>
        <title>Unibiz</title>
      </Head>
      <div>Hello there</div>
    </>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
