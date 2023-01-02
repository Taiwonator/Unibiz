import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { withUrqlClient } from 'next-urql';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default withUrqlClient(() => ({
  url: 'http://localhost:4000',
}))(App);
