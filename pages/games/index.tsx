import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { T } from "../../components/translations";
import { apiFetch } from "../../src/fetch";
import { RecentGame, RecentGames } from "../../src/model/games";
import styles from '../../styles/games/index.module.css';

export default function Page({ recentGames }: { recentGames: RecentGames }) {
    return <>
        <Head>
            <title>Recent games</title>
        </Head>

        <h1>Recent games</h1>

        <ul className={styles.games}>
            {recentGames.map(game => <Game key={game.id} game={game} />)}
        </ul>
    </>
}

const Game: React.FC<{ game: RecentGame }> = ({ game }) => {
    return <li>
        <Link href={"/games/" + game.id}>
            <a>
                <T k={"statistic.bundle." + game.namespace} />
            </a>
        </Link>
    </li>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const recentGames: RecentGames = (await apiFetch('/games/recent?limit=50'))!;

    return {
        props: {
            recentGames,
        },
    };
}
