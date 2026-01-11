export type LanguageKey = "en" | "de" | "ru";
export type ValidLanguageDef = { label: string, icon: string };
export const ValidLanguages: Record<LanguageKey, ValidLanguageDef> = {
  en: { label: "English", icon: "i-emojione:flag-for-united-kingdom"},
  de: { label: "German", icon: "i-emojione:flag-for-germany" },
  ru: { label: "Russian", icon: "i-emojione:flag-for-russia" },
};

// export interface LanguageClass {
//     name: string;
//     key: string;
//     translate(input: string): Promise<Translation[]> | Translation[];
// };

export type Translation = {
  original: string;
  originalIPA: string;
  translated: string;
  translatedIPA: string;
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
export type TranslateResponse = Record<string, Translation[]>;
