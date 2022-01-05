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
import { prefetch_players } from "../../src/model/player";
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
    return <tr className={styles.leaderboardRow}>
        <td>#{props.ranking}</td>
        <td>
            <PlayerAvatar className={styles.leaderboardAvatar} size={32} uuid={props.player} />
        </td>
        <td className={styles.leaderboardPlayer}>
            <Link href={`/players/${props.player}`}>
                <a>
                    <Username uuid={props.player} />
                </a>
            </Link>
        </td>
        <td>
            <StatisticDisplay stat={[props.leaderboard, props.value]} />
        </td>
    </tr>
}
