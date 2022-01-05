export interface LeaderboardEntry {
    player: string
    ranking: number
    value: number
}

export type Leaderboard = LeaderboardEntry[];

export type PlayerRank = [number, number];
export interface PlayerRankings {
    [leaderboard: string]: PlayerRank
}

export interface GroupedPlayerRankings {
    global: [string, PlayerRank][]
    groups: [string, [string, PlayerRank][]][]
}

export function idToTranslation(id: string): string {
    if (!id.includes(':')) {
        throw new Error("Invalid leaderboard id: " + id);
    }
    const pts = id.split(':', 2);
    return `leaderboard.${pts[0]}.${pts[1]}`;
}

export function groupRankings(rankings: PlayerRankings): GroupedPlayerRankings {
    const groups = new Map<string, [string, PlayerRank][]>();
    const grouped: GroupedPlayerRankings = {
        global: [],
        groups: [],
    };

    for (const leaderboard in rankings) {
        const pts = leaderboard.split(':', 2);
        const namespace = pts[0];
        const name = pts[1];
        if (namespace === 'nucleoid') {
            grouped.global.push([name, rankings[leaderboard]]);
        } else {
            if (!groups.has(namespace)) {
                const group: [string, PlayerRank][] = [];
                groups.set(namespace, group);
                grouped.groups.push([namespace, group]);
            }
            groups.get(namespace)!.push([name, rankings[leaderboard]]);
        }
    }

    // Sort everything
    grouped.groups.forEach(([_, group]) => group.sort((a, b) => a[0].localeCompare(b[0])));
    grouped.groups.sort((a, b) => a[0].localeCompare(b[0]));
    grouped.global.sort((a, b) => a[0].localeCompare(b[0]));

    return grouped;
}
