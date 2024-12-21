import Head from "next/head";
import styles from '../../styles/wrapped.module.css';
import { apiFetch } from "../../src/fetch";
import { GetServerSideProps } from "next";
import { DataQueryResult } from "../../src/model/data";

export default function Page(props: { gameCount: number, playerCount: number }) {
    return <>
        <Head>
            <title>Nucleoid Wrapped</title>
        </Head>

        <div className={styles.wrappedMain}>
            {/* From: https://icon-sets.iconify.design/basil/present-solid/ */}
            <svg xmlns="http://www.w3.org/2000/svg" width="196" height="196" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M6.25 5.5A3.25 3.25 0 0 1 12 3.423A3.25 3.25 0 0 1 17.062 7.5H18a2.5 2.5 0 0 1 2.5 2.5v1.25a.75.75 0 0 1-.75.75h-6.7a.3.3 0 0 1-.3-.3V8.24a3.267 3.267 0 0 1-.75-.663a3.267 3.267 0 0 1-.75.662V11.7a.3.3 0 0 1-.3.3h-6.7a.75.75 0 0 1-.75-.75V10A2.5 2.5 0 0 1 6 7.5h.938a3.236 3.236 0 0 1-.688-2Zm5 0a1.75 1.75 0 1 0-3.5 0a1.75 1.75 0 0 0 3.5 0Zm1.5 0a1.75 1.75 0 1 0 3.5 0a1.75 1.75 0 0 0-3.5 0Z" clipRule="evenodd"/><path fill="currentColor" d="M11.25 13.65a.3.3 0 0 0-.3-.3H5.649a.833.833 0 0 0-.82.692a11.592 11.592 0 0 0 0 3.916l.224 1.309a2.008 2.008 0 0 0 1.755 1.656l1.065.119a37.15 37.15 0 0 0 3.071.215a.298.298 0 0 0 .306-.299V13.65Zm1.806 7.607a.298.298 0 0 1-.306-.299V13.65a.3.3 0 0 1 .3-.3h5.301c.406 0 .752.292.82.692c.223 1.296.223 2.62 0 3.916l-.223 1.309a2.008 2.008 0 0 1-1.756 1.656l-1.065.119a37.177 37.177 0 0 1-3.071.215Z"/></svg>
            <h1>Welcome to Nucleoid Wrapped 2024!</h1>

            <p>
                This year over {props.playerCount} people have played over {props.gameCount} games on Nucleoid.
                Nucleoid Wrapped is the recap of your year on Nucloid.
            </p>

            <p>
                Log into the server at{' '}
                <code className={styles.serverAddress}>nucleoid.xyz</code>,
                and then in chat you will recieve a message with a link to your personal Nucleoid Wrapped!
                <br />
                This link will only appear until January 10th 2025, and then never again!
            </p>

            <p>
                Note that Nucleoid Wrapped is based on your play history between 2023-12-01 and 2024-12-20 (inclusive),
                and only games that track statistics are included (those with leaderboards).
            </p>
        </div>
    </>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const games = await apiFetch<DataQueryResult>(`/stats/data/query?query=games_by_year`);
    const players = await apiFetch<DataQueryResult>(`/stats/data/query?query=players_by_year`);

    const gameCount = games!.data.filter(v => v.date === '2024-01-01')[0].value;
    const playerCount = players!.data.filter(v => v.date === '2024-01-01')[0].value;

    return {
        props: {
            gameCount,
            playerCount,
        }
    }
}
