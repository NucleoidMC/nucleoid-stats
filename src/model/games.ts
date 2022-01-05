export interface RecentGame {
    id: string
    namespace: string
    players: string[]
    server: string
    date_played: string
}

export type RecentGames = RecentGame[];
