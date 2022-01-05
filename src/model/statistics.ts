export const NULL_UUID = '00000000-0000-0000-0000-000000000000';
export const UUID_REGEX = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

const IGNORE_LIST = [
    'plasmid:games_played',
    'plasmid:games_won',
    'plasmid:games_lost',
]

export interface ResStatistics {
    [key: string]: number
}

export interface PlayerStatistics {
    [game: string]: ResStatistics
}

export interface GameStatistics {
    [player: string]: PlayerStatistics
}

export type Statistic = [string, number];
export type Statistics = Statistic[];

export function keyToTranslation(key: string): string {
    if (!key.includes(':')) {
        throw new Error("Invalid statistic key: " + key);
    }
    const pts = key.split(':', 2);
    return `statistic.${pts[0]}.${pts[1]}`;
}

export function getNamespace(game: GameStatistics): string {
    for (const uuid in game) {
        const player = game[uuid];
        return Object.keys(player)[0];
    }
    throw new Error();
}

export function getStatistics(game: GameStatistics, uuid: string): Statistics {
    const player = game[uuid];
    const stats = player[Object.keys(player)[0]]
    return toStatistics(stats, false);
}

export function toStatistics(stats: ResStatistics, remove_time: boolean = true): Statistics {
    const statistics: Statistics = [];
    for (const key in stats) {
        if (IGNORE_LIST.includes(key)) continue;
        // TODO: Fix in backend
        if (remove_time && key.endsWith('_time')) continue;
        const value = stats[key];
        statistics.push([key, value]);
    }
    statistics.sort((a, b) => a[0].localeCompare(b[0]))
    return statistics;
}

export function getGlobals(game: GameStatistics): Statistics {
    if (Object.prototype.hasOwnProperty.call(game, NULL_UUID)) {
        return getStatistics(game, NULL_UUID) ?? {};
    } else {
        return [];
    }
}

export function getPlayers(game: GameStatistics): string[] {
    const players = Object.keys(game).filter(k => k !== NULL_UUID);
    players.sort((a, b) => a.localeCompare(b));
    return players;
}
