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
    <NuxtPage />
  </UApp>
</template>
