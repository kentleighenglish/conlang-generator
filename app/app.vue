<script setup lang="ts">
const dashboardNav = [
  {
    label: "Languages",
    value: "languages"
  },
  {
    label: "Translator",
    value: "translator"
  }
];
</script>
<template>
  <UApp>
    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar title="Conlang Generator">
          <template #right>
            <UTabs :items="dashboardNav" default-value="languages" size="lg" />
          </template>
        </UDashboardNavbar>
      </template>
    </UDashboardPanel>
  </UApp>
</template>
