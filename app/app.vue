<script setup>
import { useLanguageStore } from './store/languages';

const languageStore = useLanguageStore();

onMounted(() => {
  languageStore.init();
});
</script>
<template>
  <UApp>
    <NuxtPage v-if="languageStore.storeInitialized" />
    <UEmpty v-else title="Loading" class="h-screen" />
  </UApp>
</template>
