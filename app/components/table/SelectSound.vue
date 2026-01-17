<script lang="ts" setup>
import * as ipa from "~/data/ipa";
import type { LanguageKey } from "~~/types/translate";

const props = withDefaults(defineProps<{
  lang?: LanguageKey | undefined,
}>(), {
  lang: undefined,
});


const model = defineModel<string>();

const onInput = (value: string) => model.value = value;

const ipaLanguages: Record<LanguageKey, ipa.IPALanguage> = {
  en: ipa.en,
  de: ipa.de,
  ru: ipa.de, // @todo change this to actual russian
};

const currentIPA = computed(() => {
  if (props.lang) {
    return ipaLanguages[props.lang];
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
      :class="$attrs.class"
      @update:model-value="onInput"
    />
  </div>
</template>