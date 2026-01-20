<script setup>
const languageStore = useLanguageStore();

onMounted(() => {
  languageStore.init();
});
</script>
<template>
  <UApp>
    <SoundShiftForm />
    <NuxtLayout>
      <NuxtPage v-if="languageStore.storeInitialized" />
      <UEmpty v-else title="Loading" class="h-screen" />
    </NuxtLayout>
  </UApp>
</template>
