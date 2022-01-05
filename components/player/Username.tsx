import useSWR from "swr";
import { apiFetcher } from "../../src/fetch";
import { PlayerProfile } from "../../src/model/player";

interface Props {
    uuid: string
}

const Username: React.FC<Props> = (props) => {
    const { data, error } = useSWR<PlayerProfile>(`/player/${props.uuid}/username`, apiFetcher);

    if (error) {
        console.log('Error fetching username:', error);
    }

    if (!data) {
        return <>Loading...</>;
    }

    return <>{data.name}</>;
}

export default Username;
