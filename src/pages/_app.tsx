import type { AppProps } from 'next/app';
import '../app/globals.css'; // Make sure the path to globals.css is correct
import RootLayout from '../app/components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;
