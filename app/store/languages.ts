import { v4 as uuidv4 } from "uuid";
import { defineStore } from "pinia";

export type SoundShift = {
  from: string;
  to: string;
  preceding?: string;
  succeeding?: string;
  startOnly?: boolean;
  endOnly?: boolean;
}

type Language = {
  id: string;
  name: string;
  soundShifts: SoundShift[];
};

export const useLanguageStore = defineStore("language", () => {
  const languages = ref<Language[]>([]);
  const currentLanguageId = ref<string | null>(null);

  const currentLanguage = computed<Language | undefined>(() => languages.value.find(({ id }) => currentLanguageId.value = id));

  const init = () => {
    if(window && "localStorage" in window) {
      const storedLanguages = localStorage.getItem("languages");
      const storedCurrentLanguage = localStorage.getItem("currentLanguage");
      if (storedLanguages) {
        languages.value = JSON.parse(storedLanguages) as Language[];
      }
      if (storedCurrentLanguage) {
        currentLanguageId.value = storedCurrentLanguage;
      }
    }
  };

  const saveStoredLanguages = () => {
    if (window && "localStorage" in window) {
      localStorage.setItem("languages", JSON.stringify(languages.value));
    }
  };

  const setCurrentLanguage = (id: string) => {
    currentLanguageId.value = id;

    if (window && "localStorage" in window) {
      localStorage.setItem("currentLanguage", currentLanguageId.value);
    }
  };

  const addLanguage = ({ name }: { name: string }) => {
    languages.value.push({
      id: uuidv4(),
      name,
      soundShifts: [],
    });

    saveStoredLanguages();
  };

  return {
    languages,
    addLanguage,
    currentLanguage,
    currentLanguageId,
    setCurrentLanguage,
    init,
  };
});