import { Layout } from 'antd';

import { Header } from 'components';

import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Layout className="Grid-layout">
            <Layout.Content className="Grid-layout__content">
                <Header />
                <Component {...pageProps} />
            </Layout.Content>
        </Layout>
    );
};
