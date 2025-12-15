
export type ValidLanguage = "de" | "ru";

// export interface LanguageClass {
//     name: string;
//     key: string;
//     translate(input: string): Promise<Translation[]> | Translation[];
// };

export type Translation = {
    original: string;
    translated: string;
    ipa: string;
    lang: string;
    score: number;
};

// export type Translation = {
//     rootText: string;
//     rootTextIPA: string;
//     translatedText: string;
//     translatedTextIPA: string;
//     chaos: number;
// }

// export type TranslateResponseItem = Translation & GoogleTranslation & {
//     languageKey: string;
//     languageLabel: string;
// };
export type TranslateResponse = Array<Translation>;