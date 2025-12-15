import { defineStore } from "pinia";

import type { TranslateResponse } from "~~/types/translate";

export const useTranslationStore = defineStore("translations", () => {
    const toast = useToast();

    const translations = ref<Record<string, { loading: boolean; items: TranslateResponse }>>({});

    const translate = async (translateInput: string) => {
        translations.value[translateInput] = {
            loading: true,
            items: []
        };

        const data = await $fetch<TranslateResponse>("/api/translate", {
            query: {
                input: translateInput
            },
        });

        translations.value[translateInput] = {
            loading: false,
            items: data
        };
    };

    return {
        translations,
        translate
    };
});