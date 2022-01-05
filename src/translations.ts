import { createContext } from "react";
import { Fetcher } from "swr";

export interface Translations {
    [key: string]: string
}

export const translationFetcher: Fetcher<Translations> = async (locale: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_TRANSLATIONS_URL}/translate/${locale}/all`).then(res => res.json());
}

export const TranslationContext = createContext<Translations>({});

const ARG_FORMAT = /%(?:(\d+)\$)?([A-Za-z%]|$)/g;

function substituteTemplate(template: string, args: string[]): string {
    const result: string[] = [];
    let pos = 0;
    let i = 0;
    for (const match of template.matchAll(ARG_FORMAT)) {
        console.log(match, match.index);
        result.push(template.substring(pos, match.index!));
        pos = match.index! + match[0].length;
        switch (match[2]) {
            case '%':
                result.push('%')
                break;
            case "s":
                const idx = match[1];
                if (idx) {
                    const index = parseInt(idx);
                    if (index < args.length) {
                        result.push(args[index]);
                    } else {
                        throw new Error("Invalid format string: index out of bounds");
                    }
                } else {
                    if (i < args.length) {
                        result.push(args[i]);
                        i += 1;
                    } else {
                        result.push(match[0]);
                    }
                }
                break;
            default:
                throw new Error("Invalid translation string: invalid format template");
        }
    }
    if (pos < template.length) {
        result.push(template.substring(pos));
    }
    return result.join("");
}

export function performTranslation(translations: Translations, id: string, args?: string[]): string {
    if (Object.prototype.hasOwnProperty.call(translations, id)) {
        return substituteTemplate(translations[id], args ?? []);
    } else {
        if (args) {
            return `${id}{${args.join(", ")}}`;
        } else {
            return id;
        }
    }
}
