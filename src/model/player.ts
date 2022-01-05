import { apiFetch } from "../fetch";

export interface PlayerProfile {
    id: string
    name: string
}

export async function prefetch_players(players: string[]): Promise<{ [key: string]: PlayerProfile }> {
    const result: { [key: string]: PlayerProfile } = {};
    const promises = players.map(async player => {
        const profile = await apiFetch<PlayerProfile>(`/player/${player}/username`);
        if (!profile) {
            throw new Error('Unknown player: ' + player);
        }
        result[`/player/${player}/username`] = profile;
    });
    await Promise.all(promises);
    return result;
}
