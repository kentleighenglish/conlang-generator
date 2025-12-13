import translate from "google-translate-api-x";
import datamuse from "datamuse";

import * as oldManergot from "../languages/old-manergot";

import type { Translation } from "../../types/translate";

const translationStorage = useStorage("translation");

type Language = {
    name: string;
    translate: (input: string, chaos?: number) => Translation[];
};
const languages: Record<string, Language> = {
    oldManergot,
    // "New Manergot":
    // "Tamani":
    // "Ogma":
};

type GoogleTranslation = { original: string; translated: string; lang: string; score: number; };
const grabTranslations = async (inputWord: string): Promise<GoogleTranslation[]> => {
    const out = [];

     const cached = await translationStorage.getItem(`translation:${inputWord}`);

    if (cached) {
        return cached as GoogleTranslation[];
    }

    try {
        const synonyms: Array<{ word: string, score: number; }> = await datamuse.request(`words?rel_syn=${inputWord}`);
        
        const filteredSyns = synonyms.map(({ word, score }) => ({ word, score })).slice(0, 5);

        const words = [{ word: inputWord, score: 10000 }, ...filteredSyns];

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

    await translationStorage.setItem(inputWord, out, {
        
    });

    return out;
};

type TranslationsCollection = {
    key: string;
    label: string;
    translations: Translation[]
};
export default defineEventHandler(async (event): Promise<TranslationsCollection> => {
    const { input: inputWord = null } = getQuery<{ input: string }>(event);
    console.log("INPUTWORD", inputWord);

    if (!inputWord) {
        throw "Input required";
    }

    const words = await grabTranslations(inputWord);

    const out: TranslationsCollection = [];
    for (const languageKey of Object.keys(languages)) {
        const language = languages[languageKey];

        const translatedWords: Translation[] = [];
        for (const word of words) {
            const translated = await languages.translate(word.translated, 0);
            translatedWords.push(...translated);
        }
        out.push({
            key: languageKey,
            label: language.name,
            translations: translatedWords
        });
    }

    return out;
});