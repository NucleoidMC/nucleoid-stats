import Head from "next/head";
import { PlayerWrappedData } from "../../../../src/model/wrapped";
import styles from '../../../../styles/wrapped.module.css';
import { Slide8, getServerSideProps as getWrappedServerSideProps } from "../wrapped";
import { PlayerProfile } from "../../../../src/model/player";

export default function Page(props: { player: PlayerProfile, wrapped: PlayerWrappedData }) {
    return <>
        <Head>
            <title>{props.player.name}&apos;s Nucleoid Wrapped</title>
        </Head>

        <div className={styles.wrappedMain}>
            <Slide8 player={props.player} wrapped={props.wrapped} />
        </div>
    </>
}

export const getServerSideProps = getWrappedServerSideProps;
