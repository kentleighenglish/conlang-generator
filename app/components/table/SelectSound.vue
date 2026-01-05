<script lang="ts" setup>
import * as ipa from "~/data/ipa";
import type { LanguageKey } from "~~/types/translate";

const { lang } = defineProps<{
  lang: LanguageKey | undefined,
}>();


const model = defineModel<string>("");
const emit = defineEmits(["update:modelValue"]);

const ipaLanguages: Record<LanguageKey, ipa.IPALanguage> = {
  en: ipa.en,
  de: ipa.de,
  ru: ipa.de, // @todo change this
};

const currentIPA = computed(() => {
  if (lang) {
    return ipaLanguages[lang];
  }

  return ipa.all;
});

const allOptions = computed(() => [
  ...currentIPA.value.vowels.map((vowel) => vowel.ligature),
  ...currentIPA.value.consonants.map((consonant) => consonant.ligature),
].map((ligature) => ({ label: ligature, value: ligature })));
</script>
<template>
  <div>
    <!-- <UModal> // @todo create IPA table for vowels and consonants the user can choose from
      <UButton variant="outline" size="sm" rounded icon="i-lucide:pencil" />
      <template #body>
        This is a modal
      </template>
    </UModal> -->
    <USelect
      :model-value="model"
      :items="allOptions"
      placeholder="Select Sound"
      label="Base Language"
      @update:model-value="emit('update:modelValue', $event)"
    />
  </div>
</template>