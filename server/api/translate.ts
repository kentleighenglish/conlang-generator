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

const grabTranslations = cachedFunction(
  async (
    inputWord: string,
    languages: Array<LanguageKey>,
  ): Promise<Translation[]> => {
    const out = [];

    try {
      const synonyms: Array<{ word: string; score: number }> =
        await datamuse.request(`words?rel_syn=${inputWord}`);

      const filteredSyns = synonyms
        .map(({ word, score }) => ({ word, score }))
        .slice(0, 5);

      const words = [{ word: inputWord, score: 1000000 }, ...filteredSyns];

      for (const { word, score } of words) {
        for (const lang of languages) {
          const response = await translate(word, { from: "en", to: lang.toString() });

          const ipa = await fetchIPA(response.text, lang);

          out.push({
            original: word,
            translated: response.text,
            lang: lang,
            score,
            ipa,
          });
        }
      }
    } catch (e) {
      console.error("Error while translating", e);
    }

    return out;
  },
  {
    maxAge: 60 * 60,
    name: "translation",
    getKey: (input: string) => `translation:${input}`,
  },
);

export default defineEventHandler(async (event): Promise<TranslateResponse> => {
  const { input = null, lang } = getQuery<{ input: string; lang: string }>(
    event,
  );

  if (!input) {
    throw "Input required";
  } else if (!lang) {
    throw "Language required";
  }

  const inputWord = input?.toLowerCase().trim();

  const langKeys = lang.split(",") as LanguageKey[];

  if (
    langKeys.filter((key) => !languages.includes(key as LanguageKey)).length >
    0
  ) {
    throw "Invalid language provided";
  }

  const words = await grabTranslations(inputWord, langKeys);

  if (!words) {
    return [];
  }

  return words;
});
