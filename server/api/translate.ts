import translate from "google-translate-api-x";
// @ts-expect-error there are no datamuse types, and can't be bothered to make some
import datamuse from "datamuse";

import { OldManergot } from "../languages/old-manergot";

import type { LanguageClass, GoogleTranslation, TranslateResponse } from "../../types/translate";

type LanguageClassConstructor = new () => LanguageClass;
const languages: LanguageClassConstructor[] = [
    OldManergot,
    // "New Manergot":
    // "Tamani":
    // "Ogma":
];

const grabTranslations = cachedFunction(async (inputWord: string): Promise<GoogleTranslation[]> => {
    const out = [];

    try {
        const synonyms: Array<{ word: string, score: number; }> = await datamuse.request(`words?rel_syn=${inputWord}`);
        
        const filteredSyns = synonyms.map(({ word, score }) => ({ word, score })).slice(0, 5);

        const words = [{ word: inputWord, score: 1000000 }, ...filteredSyns];

        for (const { word, score } of words){
            const response = await translate(word, { from: "en", to: "de" });
            out.push({ original: word, translated: response.text, lang: "de", score });
        }
        // for (let word of words){
        //     const response = await translate(word, { from: "en", to: "ru" });
        //     out.push({ original: word, translated: response.text, lang: "ru" });
        // }
    } catch (e) {
        console.error("Error while translating", e);
    }

    return out;
}, {
  maxAge: 60 * 60,
  name: "translation",
  getKey: (input: string) => `translation:${input}`
});

export default defineEventHandler(async (event): Promise<TranslateResponse> => {
    const { input = null } = getQuery<{ input: string }>(event);
    
    if (!input) {
        throw "Input required";
    }
    const inputWord = input?.toLowerCase().trim();

    const words = await grabTranslations(inputWord);

    const out: TranslateResponse = [];
    for (const languageClass of languages) {
        const language = new languageClass();

        for (const word of words) {
            const translated = language.translate(word.translated);
            out.push(...translated.map((t) => ({
                ...word,
                ...t,
                languageLabel: language.name,
                languageKey: language.key,
            })));
        }
    }

    return out;
});