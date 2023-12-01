export interface PlayerWrappedData {
    played_count: number;
    top_games: PerGameStat[],
    days_played: number,
    days_played_games: PerGameStat[],
    most_players: number,
    most_players_games: PerGameStat[],
}

export interface PerGameStat {
    namespace: string;
    total: number;
}
