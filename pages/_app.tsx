import '~/styles/main.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import { MDXProvider } from '@mdx-js/react';
import { OutLink } from '~/components/OutLink';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={{ a: OutLink }}>
      <Component {...pageProps} />
      <ToastContainer position="bottom-center" />
    </MDXProvider>
  );
}

export default MyApp;
