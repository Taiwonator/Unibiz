import '../styles/globals.css';
import { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import {
  NextUrqlClientConfig,
  WithUrqlClient,
  withUrqlClient,
} from 'next-urql';
import { SessionProvider } from 'next-auth/react';
import { NavigationProvider } from 'src/context/NavigationContext';
import { AlertProvider } from 'src/context/AlertContext';
import { AppProvider } from '@context/AppContext';
import { authExchange } from '@urql/exchange-auth';
import { dedupExchange, cacheExchange, fetchExchange } from 'urql';
import Head from 'next/head';
import { ModalProvider } from '@context/ModalContext';

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page: ReactElement) => page);
  return (
    <>
      <Head>
        <title>Unibiz</title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <AppProvider>
          <NavigationProvider>
            <AlertProvider>
              <ModalProvider>
                {getLayout(<Component {...pageProps} />)}
              </ModalProvider>
            </AlertProvider>
          </NavigationProvider>
        </AppProvider>
      </SessionProvider>
    </>
  );
};

const authExchangeFunc = async (utils: any) => {
  const token = 'I cant believe it';
  return {
    addAuthToOperation(operation: any) {
      if (!token) return operation;
      return utils.appendHeaders(operation, {
        Authorization: `Bearer ${token}`,
      });
    },
  };
};

const client: NextUrqlClientConfig = (ssrExchange, ctx) => {
  return {
    url: 'http://localhost:4000/graphql',
    exchanges: [
      dedupExchange,
      cacheExchange,
      authExchange(authExchangeFunc as any),
      fetchExchange,
    ],
    fetchOptions: {
      credentials: 'include',
    },
  };
};

export default withUrqlClient(client)(App as any);

// Disseration talk about process of storing jwt (not on cookies)
// https://www.rdegges.com/2018/please-stop-using-local-storage/

// change menu items depending on user type
