import Head from "next/head";
import PlayerAvatar from "../../components/player/PlayerAvatar";
import styles from '../../styles/player.module.css';

export default function Page() {
    return <>
        <Head>
            <title>Ghost</title>
        </Head>

        <div className={styles.player}>
            <div className={styles.playerHeader}>
                <PlayerAvatar className={styles.playerAvatar} size={64} />
                <h1 className={styles.playerUsername}>
                    Ghost
                </h1>
            </div>

            <p>
                Ooh spooky! This user doesn&apos;t appear to exist anymore :(
            </p>

            <footer style={{ fontSize: '8px' }}>
                This seems a little sus
            </footer>
        </div>
    </>
}
