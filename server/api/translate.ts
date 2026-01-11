import translate from "google-translate-api-x";
// @ts-expect-error there are no datamuse types, and can't be bothered to make some
import datamuse from "datamuse";
import { fetchIPA } from "../helpers/unalengua";

// import { OldManergot } from "../languages/old-manergot";

import type {
  Translation,
  TranslateResponse,
  LanguageKey,
} from "../../types/translate";

// type LanguageClassConstructor = new () => LanguageClass;
// const languages: LanguageClassConstructor[] = [
//     OldManergot,
//     // "New Manergot":
//     // "Tamani":
//     // "Ogma":
// ];

const languages: Array<LanguageKey> = ["en", "ru"];

type ScoredWord = { word: string; score: number };

const grabSynonyms = cachedFunction(
  async (input: string): Promise<ScoredWord[]> => {
    const synonyms: Array<{ word: string; score: number }> = await datamuse.request(`words?rel_syn=${input}`);

    const filteredSyns = synonyms
      .map(({ word, score }) => ({ word, score }));

    return filteredSyns;
  },
  {
    maxAge: 60 * 60,
    name: "translation",
    getKey: (input: string) => `translation:${input}`,
  },
);

const grabTranslation = cachedFunction(
  async (
    inputWord: string,
    lang: LanguageKey,
  ): Promise<Pick<Translation, "translated" | "ipa">> => {
    try {
      const response = await translate(inputWord, { from: "en", to: lang.toString() });

      const ipa = await fetchIPA(response.text, lang);

      return {
        translated: response.text,
        ipa,
      };
    } catch (e) {
      console.error("Error while translating", e);
    }

    throw "Error while translating";
  },
  {
    maxAge: 60 * 60,
    name: "translation",
    getKey: (input: string, lang: string) => `translation:${input}:${lang}`,
  },
);

export default defineEventHandler(async (event): Promise<TranslateResponse> => {
  const { input = null, inputLang, outputLang, synonymCount = 0 } = getQuery<{
    input: string[];
    outputLang: LanguageKey;
    inputLang: LanguageKey;
    synonymCount?: number; 
  }>(
    event,
  );

  if (!input) {
    throw "Input required";
  }
  if(!Array.isArray(input)) {
    throw "Invalid input";
  }
  if (!inputLang) {
    throw "Input Language required";
  }
  if (!outputLang) {
    throw "Output Language required";
  }

  const inputLowercase = input.map(str => str.toLowerCase().trim());

  const langKeys = outputLang.split(",") as LanguageKey[];

  if (
    langKeys.filter((key) => !languages.includes(key as LanguageKey)).length >
    0
  ) {
    throw "Invalid language provided";
  }

  const output: TranslateResponse = {};

  for (const word of inputLowercase) {
    const translated: Translation[] = [];

    for (const lang of langKeys) {
      const translatedWord = await grabTranslation(word, lang);

      if (translatedWord) {
        translated.push({
          ...translatedWord,
          original: word,
          lang,
          score: 10000,
        });
      }

      if (synonymCount > 0) {
        const synonyms = await grabSynonyms(word);

        for (const synonymWord of synonyms ?? []) {
          const translatedSynonymWord = await grabTranslation(synonymWord.word, lang);
          if (translatedSynonymWord) {
            translated.push({
              ...translatedSynonymWord,
              original: synonymWord.word,
              score: synonymWord.score,
              lang,
            });
          }
        }
      }
    }
    
    if (!translated.length) {
      throw `Cannot translate ${word}`;
    }

    output[word] = translated;
  }

  return output;
});
