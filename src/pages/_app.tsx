import type { AppProps } from 'next/app';
import '../app/globals.css';
import RootLayout from '../app/components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;
