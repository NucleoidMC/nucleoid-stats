import Head from "next/head";
import React, { useContext } from "react";
import { performTranslation, TranslationContext } from "../../src/translations";

export interface TProps {
    k: string
    params?: string[]
}

export const T: React.FC<TProps> = (props) => {
    const translations = useContext(TranslationContext);

    return <>
        {performTranslation(translations, props.k, props.params)}
    </>
}

export const TTitle: React.FC<TProps> = (props) => {
    const translations = useContext(TranslationContext);
    const s = performTranslation(translations, props.k, props.params);
    return <Head>
        <title>{s}</title>
    </Head>
}
