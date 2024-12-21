import Head from "next/head";
import { PlayerWrappedData } from "../../../../src/model/wrapped";
import styles from '../../../../styles/wrapped.module.css';
import { Slide8, getServerSideProps as getWrappedServerSideProps } from "../wrapped";
import { PlayerProfile } from "../../../../src/model/player";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Page(props: { player: PlayerProfile, wrapped: PlayerWrappedData, year: number, thank: boolean }) {
    // memorise the query param so we can yeet it later (to avoid the thanks message showing when the link is shared)
    const [thank, _] = useState(props.thank);

    const router = useRouter();

    useEffect(() => {
        if (props.thank) {
            router.replace(`/players/${props.player.id}/wrapped/share?year=${props.year}`);
        }
    }, []);

    return <>
        <Head>
            <title>{props.player.name}&apos;s Nucleoid Wrapped</title>
        </Head>

        <div className={styles.wrappedMain}>
            <Slide8 player={props.player} wrapped={props.wrapped} year={props.year} thank={thank} />
        </div>
    </>
}

export const getServerSideProps = getWrappedServerSideProps;
