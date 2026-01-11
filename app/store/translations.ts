import { defineStore } from "pinia";

import type { TranslateResponse } from "~~/types/translate";
import { useLanguageStore } from "./languages";

export const useTranslationStore = defineStore("translation", () => {
  const languageStore = useLanguageStore();

  const translations = ref<
    Record<string, { loading: boolean; items: TranslateResponse }>
  >({});
  const loading = ref<boolean>(false);

  const translate = async (translateInput: string[]) => {
    loading.value = true;

    if (!languageStore.currentLanguage) {
      return;
    }

    try {
      const data = await $fetch<TranslateResponse>("/api/translate", {
        query: {
          input: translateInput.join(","),
          synonyms: 0,
          inputLang: "en",
          outputLang: languageStore.currentLanguage.languageBase,
        },
      });
      console.log(data);

      // translations.value[translateInput] = {
      //   loading: false,
      //   items: data,
      // };
      loading.value = false;
    } catch (e) {
      loading.value = false;
      throw e;
    }
  };

  return {
    loading,
    translations,
    translate,
  };
});
