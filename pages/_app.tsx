import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { withUrqlClient } from 'next-urql';
import MainLayout from '@components/layout/MainLayout';

const App = ({ Component, pageProps }: AppProps) => {
  console.log('pageProps: ', pageProps);
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
};

export default withUrqlClient(() => ({
  url: 'http://localhost:4000',
}))(App);
