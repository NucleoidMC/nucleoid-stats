import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useContext } from "react";
import { T } from "../../components/translations";
import { apiFetch } from "../../src/fetch";
import { idToTranslation } from "../../src/model/leaderboards";
import styles from '../../styles/leaderboard.module.css';
import { TranslationContext, performTranslation } from "../../src/translations";

export default function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const leaderboards: string[] = props.leaderboards;

    const translations = useContext(TranslationContext); 

    const groups = (() => {
        const groupsByName: Map<string, string[]> = new Map();
        const groups: [string, string[]][] = [];
        for (const board of leaderboards) {
            const [namespace, _] = board.split(':', 2);
            if (!groupsByName.has(namespace)) {
                const group: string[] = [];
                groupsByName.set(namespace, group);
                groups.push([performTranslation(translations, `statistic.bundle.${namespace}`), group]);
                groups.sort((a, b) => a[0].localeCompare(b[0]));
            }
            const group = groupsByName.get(namespace)!;
            group.push(board);
            group.sort((a, b) => a.localeCompare(b));
        }
        return groups;
    })();

    return <div className={styles.leaderboardContainer}>
        <Head>
            <title>Leaderboards</title>
        </Head>

        <h1>Leaderboards</h1>

        {groups.map(([namespace, boards]) => <React.Fragment key={namespace}>
            <h2>{namespace}</h2>

            <ul>
                {boards.map(leaderboard => <li key={leaderboard}>
                    <Link href={`/leaderboards/${leaderboard}`} key={leaderboard}>
                        <a>
                            <T k={idToTranslation(leaderboard)} />
                        </a>
                    </Link>
                </li>)}
            </ul>
        </React.Fragment>)}
    </div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await apiFetch<string[]>('/leaderboards');

    res?.sort((a, b) => a.localeCompare(b));

    return {
        props: {
            leaderboards: res,
        },
    };
}
