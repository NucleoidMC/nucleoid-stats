import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import React from "react";
import { SWRConfig } from "swr";
import PlayerAvatar from "../../components/player/PlayerAvatar";
import Username from "../../components/player/Username";
import StatisticDisplay from "../../components/StatisticDisplay";
import { T, TTitle } from "../../components/translations";
import { apiFetch } from "../../src/fetch";
import { prefetch_players } from "../../src/model/player";
import { GameStatistics, getGlobals, getNamespace, getPlayers, getStatistics, keyToTranslation, NULL_UUID, Statistic } from "../../src/model/statistics";
import styles from '../../styles/games/game.module.css';
import playerStyles from '../../styles/player.module.css';

export default function Page({ game, fallback }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const globals = getGlobals(game);

    return <SWRConfig value={{ fallback }}>
        <TTitle k={'statistic.bundle.' + getNamespace(game)} />

        <h1>
            <T k={'statistic.bundle.' + getNamespace(game)} />
        </h1>

        <div className={styles.globals}>
            {globals.map(s => <Statistic key={s[0]} stat={s} />)}
        </div>

        <div className={styles.players}>
            {getPlayers(game).map(player => <Player key={player} game={game} id={player} />)}
        </div>
    </SWRConfig>
}

const Statistic: React.FC<{ stat: Statistic, className?: string }> = ({ stat, className }) => {
    return <p className={styles.stat}>
        <T k={keyToTranslation(stat[0])} />: <StatisticDisplay stat={stat} />
    </p>
}

const Player: React.FC<{ game: GameStatistics, id: string }> = ({ game, id }) => {
    return <div className={playerStyles.player}>
        <Link href={`/players/${id}`}>
            <div className={playerStyles.playerHeader}>
                <PlayerAvatar className={playerStyles.playerAvatar} uuid={id} size={64} />
                <h2 className={playerStyles.playerUsername}>
                    <Username uuid={id} />
                </h2>
            </div>
        </Link>
        <div className={playerStyles.playerStats}>
            {getStatistics(game, id).map(s => <Statistic key={s[0]} stat={s} />)}
        </div>
    </div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;

    const res = await apiFetch<GameStatistics>('/stats/game/' + id, {
        allow_notfound: true,
    });

    if (!res || Object.keys(res).length === 0) { // this is a workaround for a problem with the backend not properly 404ing
        return {
            notFound: true,
        };
    }

    return {
        props: {
            game: res,
            fallback: {
                ...(await prefetch_players(Object.keys(res).filter(s => s !== NULL_UUID))),
            },
        },
    };
}
