import translate from "google-translate-api-x";
import datamuse from "datamuse";

import * as cache from "../cache";

import oldManergot from "../languages/old-manergot";
import type { OldManergotResponse } from "../languages/old-manergot";

cache.createCache("translations");

const languages: Record<string, (input: string, chaos?: number) => OldManergotResponse> = {
    "Old Manergot": oldManergot,
    // "New Manergot":
    // "Tamani":
    // "Ogma":
}

const grabTranslations = async (inputWord: string) => {
    const out = [];

    const cached = cache.get("translations", inputWord)
    if (cached) {
        return cached;
    }

    try {
        const synonyms: Array<{ word: string }> = await datamuse.request(`words?rel_syn=${inputWord}`);
        
        const filteredSyns = synonyms.map(syn => syn.word).slice(0, 5);

        const words = [inputWord, ...filteredSyns];

        for (const word of words){
            const response = await translate(word, { from: "en", to: "de" });
            out.push({ original: word, translated: response.text, lang: "de" });
        }
        // for (let word of words){
        //     const response = await translate(word, { from: "en", to: "ru" });
        //     out.push({ original: word, translated: response.text, lang: "ru" });
        // }
    } catch (e) {
        console.error("Error while translating", e);
    }

    cache.set("translations", inputWord, out);

    return out;
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.input) {
        throw "Input required";
    }

    const words = await grabTranslations(body.input);

    for (const language of Object.keys(languages)) {
        const translatedWords = [];
        for (const word of words) {
            const translated = await languages[language](word.translated, 0);
            translatedWords.push(translated);
        }
        console.log(language, translatedWords);
    }
})