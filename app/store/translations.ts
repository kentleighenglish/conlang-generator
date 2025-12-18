import { defineStore } from "pinia";

import type { TranslateResponse } from "~~/types/translate";

export const useTranslationStore = defineStore("translation", () => {
  const translations = ref<
    Record<string, { loading: boolean; items: TranslateResponse }>
  >({});

  const translate = async (translateInput: string) => {
    translations.value[translateInput] = {
      loading: true,
      items: [],
    };

    try {
      const data = await $fetch<TranslateResponse>("/api/translate", {
        query: {
          input: translateInput,
          lang: "de",
        },
      });

      translations.value[translateInput] = {
        loading: false,
        items: data,
      };
    } catch (e) {
      translations.value[translateInput].loading = false;
      throw e;
    }
  };

  return {
    translations,
    translate,
  };
});
