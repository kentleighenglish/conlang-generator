<script setup lang="ts">
const props = withDefaults(defineProps<{
  input: string,
  lang?: string,
  ipa?: boolean,
}>(), {
  lang: undefined,
  ipa: false,
});

const languageStore = useLanguageStore();

const language = computed(() => languageStore.languages.find((l) => l.id === (props.lang || languageStore.currentLanguageId)));
const soundShifts = computed<SoundShift[]>(() => language.value?.soundShifts ?? []);

const generated = ref<{ text: string; ipa: string }>(languageStore.translate(props.input, props.lang));

const DisplayText = computed(() => props.ipa ? renderIPA(generated.value.ipa) : h("span", {}, generated.value.text));

watch(() => soundShifts, () => {
  generated.value = languageStore.translate(props.input, props.lang);
});
</script>
<template>
  <DisplayText />
</template>