import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { SWRConfig } from "swr";
import PlayerAvatar from "../../components/player/PlayerAvatar";
import Username from "../../components/player/Username";
import StatisticDisplay from "../../components/StatisticDisplay";
import { T, TTitle } from "../../components/translations";
import { apiFetch } from "../../src/fetch"
import { idToTranslation, Leaderboard, LeaderboardEntry as LeaderboardEntryProps } from "../../src/model/leaderboards";
import { prefetch_players, useUsernameAndAvatar } from "../../src/model/player";
import styles from '../../styles/leaderboard.module.css';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;

    const res = await apiFetch<Leaderboard>('/leaderboard/' + id, {
        allow_notfound: true,
    });

    if (!res) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            leaderboard: res,
            fallback: {
                ...(await prefetch_players(res.map(e => e.player))),
            }
        },
    }
}

export default function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    const { id } = router.query;
    const [namespace, _] = (id as string).split(':');
    const leaderboard: Leaderboard = props.leaderboard;

    return <SWRConfig value={{ fallback: props.fallback }}>
        <div className={styles.leaderboardContainer}>
            <TTitle k={idToTranslation(id as string)} />

            <h1>
                <T k={`statistic.bundle.${namespace}`} />: <T k={idToTranslation(id as string)} />
            </h1>

            <table className={styles.leaderboard}>
                <thead>
                    <tr className={styles.leaderboardHeader}>
                        <th className={styles.leaderboardRankingHeader} />
                        <th className={styles.leaderboardAvatarHeader} />
                        <th className={styles.leaderboardPlayerHeader}>Player</th>
                        <th className={styles.leaderboardScoreHeader}>
                            <T k={idToTranslation(id as string)} />
                        </th>
                    </tr>
                </thead>
                <tbody className={styles.leaderboardBody}>
                    {leaderboard.map(entry => <LeaderboardEntry key={entry.player} leaderboard={id as string} {...entry} />)}
                </tbody>
            </table>
        </div>
    </SWRConfig>
}

const LeaderboardEntry: React.FC<LeaderboardEntryProps & { leaderboard: string }> = (props) => {
    const { username, ghost, avatar, error } = useUsernameAndAvatar(props.player, 32, styles.leaderboardAvatar);

    if (error) {
        console.log(error);
    }

    return <tr className={(ghost ? styles.ghost + ' ' : '') + styles.leaderboardRow}>
        <td>#{props.ranking}</td>
        <td>
            {avatar}
        </td>
        <td className={styles.leaderboardPlayer}>
            <Link href={!ghost ? `/players/${props.player}` : '/players/ghost'} className={ghost ? styles.ghost : ''}>
                {username}
            </Link>
        </td>
        <td>
            <StatisticDisplay no_adjust={true} stat={[props.leaderboard, props.value]} />
        </td>
    </tr>
}
