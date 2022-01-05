import App, { AppContext, AppProps } from 'next/app';
import TranslationsProvider from '../components/translations/TranslationsProvider';
import '../styles/globals.css';
import styles from '../styles/App.module.css';
import { translationFetcher, Translations } from '../src/translations';
import Navbar from '../components/Navbar';
import Head from 'next/head';

function MyApp({ Component, pageProps, translations }: AppProps & { translations: Translations }) {
    return <TranslationsProvider translations={translations}>
        <Head>
            <link rel="icon" type="image/png" href="/icon.png" />
        </Head>

        <Navbar />
        <div className={styles.container}>
            <main className={styles.main}>
                <Component {...pageProps} />
            </main>
        </div>
    </TranslationsProvider>
}

MyApp.getInitialProps = async (context: AppContext) => {
    const appProps = await App.getInitialProps(context);

    const translations = await translationFetcher('en_us');

    return {
        translations,
        ...appProps,
    };
}

export default MyApp;
