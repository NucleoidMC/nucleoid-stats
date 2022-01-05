import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import styles from '../styles/App.module.css';
import potato from '../public/potato.png';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Nucleoid: 404</title>
      </Head>

      <h1>
        Oopie! 404: Not found
      </h1>

      <p>
        If you are seeing this then you are probably a bit lost, sorry. Maybe try looking at the links above?
      </p>

      <Image src={potato} alt="Tiny Potato" />

      <p>
        Please take this tater to make up for your troubles.
      </p>

      <footer className={styles.footer}>
        &quot;Tiny Potato&quot; licensed by FabricMC under CC-BY 4.0
      </footer>
    </>
  )
}

export default Home
