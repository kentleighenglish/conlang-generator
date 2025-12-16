<script setup lang="ts">

const languages = [
    { label: "Old Manergot" }
];

const languageConfigTabs = [
    {
        label: "Vowel Shift"
    }
]
</script>
<template>
  <UDashboardGroup storage="local" storage-key="languagesDashboard">
    <UDashboardSidebar collapsible>
        <template #header>
            <h1 class="prose">Languages</h1>
        </template>
        <template #default>
            <UNavigationMenu
                highlight
                :items="languages"
                orientation="vertical"
            />
        </template>
    </UDashboardSidebar>
    <UDashboardPanel>
      <template #body>
        <UTabs :items="languageConfigTabs" variant="link">
            <template #trailing>
                <slot></slot><UCheckbox></UCheckbox>
            </template>
        </UTabs>
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>