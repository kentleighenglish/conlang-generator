import { v4 as uuidv4 } from "uuid";
import { defineStore } from "pinia";
import type { LanguageKey } from "~~/types/translate";

export type SoundShift = {
  id: string;
  from: string | null;
  to: string | null;
  chaos: number;
  preceding?: string;
  succeeding?: string;
  startOnly?: boolean;
  endOnly?: boolean;
};

type Language = {
  id: string;
  name: string;
  languageBase: LanguageKey | null;
  soundShifts: SoundShift[];
};

export const useLanguageStore = defineStore("language", () => {
  const storeInitialized = ref<boolean>(false);
  const languages = ref<Language[]>([]);
  const currentLanguageId = ref<string | null>(null);

  const currentLanguage = computed<Language | undefined>(() =>
    languages.value.find(({ id }) => (currentLanguageId.value = id)),
  );

  const init = () => {
    if (window && "localStorage" in window) {
      const storedLanguages = localStorage.getItem("languages");
      const storedCurrentLanguage = localStorage.getItem("currentLanguage");
      if (storedLanguages) {
        languages.value = JSON.parse(storedLanguages) as Language[];
      }
      if (storedCurrentLanguage) {
        currentLanguageId.value = storedCurrentLanguage;
      }
      storeInitialized.value = true;
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
      languageBase: null,
      soundShifts: [],
    });

    saveStoredLanguages();
  };

  const changeLanguageBase = (baseLanguage: LanguageKey) => {
    languages.value.map((language) => {
      if (language.id === currentLanguageId.value) {
        language.languageBase = baseLanguage;
      }

      return language;
    });

    saveStoredLanguages();
  };

  const addSoundShift = () => {
    const soundShifts = [...(currentLanguage.value?.soundShifts || [])];

    soundShifts.push({
      id: uuidv4(),
      from: null,
      to: null,
      chaos: 0,
    });

    languages.value.map((language) => {
      if (language.id === currentLanguageId.value) {
        language.soundShifts = soundShifts;
      }

      return language;
    });

    saveStoredLanguages();
  };

  const removeSoundShift = (id: string) => {
    const soundShifts = [...(currentLanguage.value?.soundShifts || [])];

    languages.value.map((language) => {
      if (language.id === currentLanguageId.value) {
        language.soundShifts = soundShifts.filter((soundShift) => soundShift.id !== id);
      }

      return language;
    });

    saveStoredLanguages();
  };


  const updateSoundShift = (id: string, updated: Partial<SoundShift>) => {
    const soundShifts = [...(currentLanguage.value?.soundShifts || [])];

    languages.value.map((language) => {
      if (language.id === currentLanguageId.value) {
        language.soundShifts = soundShifts.map((soundShift) => {
          if (soundShift.id === id) {
            return {
              ...soundShift,
              ...updated,
            };
          }
          return soundShift;
        });
      }

      return language;
    });

    saveStoredLanguages();
  };

  return {
    languages,
    addLanguage,
    changeLanguageBase,
    addSoundShift,
    removeSoundShift,
    updateSoundShift,
    currentLanguage,
    currentLanguageId,
    setCurrentLanguage,
    init,
    storeInitialized,
  };
});
