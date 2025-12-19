<script setup>
import { useLanguageStore } from './store/languages';

const languageStore = useLanguageStore();

onMounted(() => {
  languageStore.init();
});
</script>
<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage v-if="languageStore.storeInitialized" />
      <UEmpty v-else title="Loading" class="h-screen" />
    </NuxtLayout>
  </UApp>
</template>
