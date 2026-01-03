<script lang="ts" setup>
import * as ipa from "~/data/ipa";
import { useLanguageStore } from "~/store/languages";
import type { LanguageKey } from "~~/types/translate";

const languageStore = useLanguageStore();

const currentLanguage = computed(() => languageStore.currentLanguage);

const ipaLanguages: Record<LanguageKey, ipa.IPALanguage> = {
  en: ipa.en,
  de: ipa.de,
  ru: ipa.de, // @todo change this
};

const currentIPA = computed(() => {
  if (currentLanguage.value && currentLanguage.value.languageBase) {
    return ipaLanguages[currentLanguage.value.languageBase];
  }

  return ipa.all;
});

</script>
<template>
  <div>
    <UModal>
      <UButton variant="outline" size="sm" rounded icon="i-lucide:pencil" />
      <template #body>
        This is a modal
      </template>
    </UModal>
  </div>
</template>