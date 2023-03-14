import '../styles/globals.css';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { withUrqlClient } from 'next-urql';
import { SessionProvider } from 'next-auth/react';
import MainLayout from '@components/layout/MainLayout';
import { NavigationProvider } from 'src/context/NavigationContext';

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return (
    <SessionProvider session={pageProps.session}>
      <NavigationProvider>
        {getLayout(<Component {...pageProps} />)}
      </NavigationProvider>
    </SessionProvider>
  );
};

export default withUrqlClient(() => ({
  url: 'http://localhost:4000',
}))(App as any);

// change menu items depending on user type
