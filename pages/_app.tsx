import '~/styles/main.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import type { AppProps } from 'next/app';
import { MDXProvider } from '@mdx-js/react';
import {OutLink} from '~/components/OutLink';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <MDXProvider components={{ a: OutLink }}>
            <Component {...pageProps} />
        </MDXProvider>
    );
}

export default MyApp;
