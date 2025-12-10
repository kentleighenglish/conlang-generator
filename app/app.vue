<script setup lang="ts">
  const navItems = [
      {
        label: "Translator",
        to: "/translator",
      }
  ]
</script>
<template>
  <UApp>
    <UNavigationMenu :items="navItems" />
    <UContainer class="mt-4">
      <NuxtPage />
    </UContainer>
  </UApp>
</template>
