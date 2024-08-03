import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PlayerAvatar from "../../components/player/PlayerAvatar";
import StatisticDisplay from "../../components/StatisticDisplay";
import TabbedSection, { Tabs } from "../../components/TabbedSection";
import { T } from "../../components/translations";
import { apiFetch } from "../../src/fetch";
import { GroupedPlayerRankings, groupRankings, PlayerRank, PlayerRankings } from "../../src/model/leaderboards";
import { PlayerProfile } from "../../src/model/player";
import { keyToTranslation, PlayerStatistics, ResStatistics, toStatistics } from "../../src/model/statistics";
import styles from '../../styles/player.module.css';

export default function Page(props: { statistics: PlayerStatistics, rankings: GroupedPlayerRankings, username: string }) {
    const router = useRouter();
    const id = router.query.id as string;
    const [selected, setSelected] = useState((router.query.game as string | undefined) || props.rankings.groups[0][0]);

    function updateSelected(newSelected: string) {
        router.push(`/players/${id}?game=${newSelected}`, undefined, { shallow: true });
    }

    // Always set the query on initial page load
    useEffect(() => {
        updateSelected(selected);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Update internal state when the route is updated
    useEffect(() => {
        setSelected(router.query.game as string);
    }, [router.query.game]);

    return <>
        <Head>
            <title>{props.username}</title>
        </Head>

        <div className={styles.player}>
            <div className={styles.playerHeader}>
                <PlayerAvatar className={styles.playerAvatar} uuid={id} size={64} />
                <h1 className={styles.playerUsername}>
                    {props.username}
                </h1>
            </div>

            <h2>Global rankings</h2>
            <RankingsGroup namespace="nucleoid" rankings={props.rankings.global} />

            <StatsSection stats={props.statistics} selected={selected} updateSelected={updateSelected} />

            <h3>Rankings</h3>
            <RankingsSection rankings={props.rankings} selected={selected} updateSelected={updateSelected} />
        </div>
    </>
}

const StatsSection: React.FC<{ stats: PlayerStatistics, selected: string, updateSelected: (s: string) => void }> = (props) => {
    const tabs: Tabs = {};
    const namespaces = Object.keys(props.stats);
    for (const namespace of namespaces) {
        tabs[namespace] = {
            name: <T k={`statistic.bundle.${namespace}`} />,
            content: <>
                <h3>Stats</h3>
                <StatsGroup namespace={namespace} stats={props.stats[namespace]} />
            </>
        };
    }

    return <>
        <h2>By game</h2>
        <TabbedSection tabs={tabs} selected={props.selected} updateSelected={props.updateSelected}
                    tabLineClassName={styles.tabRow} tabClassName={styles.tab} selectedTabClassName={styles.tabSelected} />
    </>
}

const RankingsSection: React.FC<{ rankings: GroupedPlayerRankings, selected: string, updateSelected: (s: string) => void }> = (props) => {
    const tabs: Tabs = {};

    for (const [namespace, rankings] of props.rankings.groups) {
        tabs[namespace] = {
            name: <T k={`statistic.bundle.${namespace}`} />,
            content: <RankingsGroup namespace={namespace} rankings={rankings} />,
        };
    }

    return <>
        <TabbedSection tabs={tabs} selected={props.selected} updateSelected={props.updateSelected} hideTabRow={true} />
    </>
}

const StatsGroup: React.FC<{ namespace: string, stats: ResStatistics }> = (props) => {
    const stats = toStatistics(props.stats);

    return <div className={styles.statsGroup}>
        {stats.map(stat => <div className={styles.valueContainer} key={stat[0]}>
            <div className={styles.valueTitle}>
                <T k={keyToTranslation(stat[0])} />
            </div>
            <div className={styles.value}>
                <StatisticDisplay stat={stat} />
            </div>
        </div>)}
    </div>
}

const RankingsGroup: React.FC<{ namespace: string, rankings: [string, PlayerRank][] }> = (props) => {
    return <div className={styles.statsGroup}>
        {props.rankings.map(([key, ranking]) => <div className={styles.valueContainer} key={key}>
            <div className={styles.valueTitle}>
                <Link href={`/leaderboards/${props.namespace}:${key}`}>
                    <T k={`leaderboard.${props.namespace}.${key}`} />
                </Link>
            </div>
            <div className={styles.value}>
                #{ranking[0]}
            </div>
        </div>)}
    </div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;

    const rankings = await apiFetch<PlayerRankings>(`/player/${id}/rankings`, {
        allow_notfound: true,
    });

    const statistics = await apiFetch<PlayerStatistics>(`/stats/player/${id}`, {
        allow_notfound: true,
    })

    if (!rankings || !statistics) {
        return {
            notFound: true,
        };
    }

    const profile = await apiFetch<PlayerProfile>(`/player/${id}/username`);

    return {
        props: {
            rankings: groupRankings(rankings),
            statistics,
            username: profile!.name,
        },
    };
}
