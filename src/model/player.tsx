import { ReactElement, useEffect, useState } from "react";
import useSWR from "swr";
import PlayerAvatar from "../../components/player/PlayerAvatar";
import { apiFetch, apiFetcher } from "../fetch";

export interface PlayerProfile {
    id: string
    name: string
}

export async function prefetch_players(players: string[]): Promise<{ [key: string]: PlayerProfile | null }> {
    const result: { [key: string]: PlayerProfile | null } = {};
    const promises = players.map(async player => {
        const profile = await apiFetch<PlayerProfile>(`/player/${player}/username`);
        // if (!profile) {
        //     throw new Error('Unknown player: ' + player);
        // }
        result[`/player/${player}/username`] = profile;
    });
    await Promise.all(promises);
    return result;
}

interface UsernameAndAvatar {
    username: string;
    avatar: ReactElement;
    error: any | undefined;
    ghost: boolean;
}

export function useUsernameAndAvatar(uuid: string, avatarSize: number, avatarClass: string): UsernameAndAvatar {
    const [username, setUsername] = useState<string | null>('Loading...');

    const { data, error } = useSWR<PlayerProfile>(`/player/${uuid}/username`, apiFetcher);

    useEffect(() => {
        if (data) {
            setUsername(data.name);
        } else {
            setUsername(null);
        }
    }, [data]);

    const avatar = <PlayerAvatar uuid={username ? uuid : undefined} size={avatarSize} className={avatarClass} />;

    if (error) {
        return {
            error,
            username: username || 'Ghost player',
            ghost: !username,
            avatar,
        };
    } else {
        return {
            username: username || 'Ghost player',
            ghost: !username,
            avatar,
            error: undefined,
        };
    }
}
