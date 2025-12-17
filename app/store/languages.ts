import { defineStore } from "pinia";

type Language = {
    name: string;
    vowelShiftsEnabled: boolean;
    consonantShiftsEnabled: boolean;
    vowelShifts: [];
    consonantShifts: [];
}

export const useLanguageStore = defineStore("language", () => {
    const languages = ref<Language[]>([]);

    const storedLanguages = localStorage.getItem("languages");
    if (storedLanguages) {
        languages.value = JSON.parse(storedLanguages) as Language[];
    }

    return {
        languages
    };
});