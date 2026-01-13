import { defineStore } from "pinia";

import type { TranslateResponse, Translation } from "~~/types/translate";

export const useTranslationStore = defineStore("translation", () => {
  const languageStore = useLanguageStore();

  const translations = ref<
    Record<string, Translation[]>
  >({});
  const loading = ref<boolean>(false);

  const translate = async (translateInput: string[], synonymCount: number = 0) => {
    loading.value = true;

    if (!languageStore.currentLanguage) {
      return;
    }

    try {
      const data = await $fetch<TranslateResponse>("/api/translate", {
        query: {
          input: translateInput.join(","),
          synonymCount,
          inputLang: "en",
          outputLang: languageStore.currentLanguage.languageBase,
        },
      });

      translations.value = data;

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

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTranslationStore, import.meta.hot));