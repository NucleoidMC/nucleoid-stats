import { TranslationContext, translationFetcher, Translations } from "../../src/translations";

const TranslationsProvider: React.FC<{ translations: Translations }> = (props) => {
    return <TranslationContext.Provider value={props.translations}>
        {props.children}
    </TranslationContext.Provider>
}

export default TranslationsProvider;
