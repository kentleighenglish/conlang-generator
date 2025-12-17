<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';


const languages = [
    { label: "Old Manergot" }
];

const languageConfigTabs: TabsItem[] = [
    {
        label: "Vowel Shift",
        slot: "vowelShift",
    }
];
</script>
<template>
  <UDashboardGroup storage="local" storage-key="languagesDashboard" class="h-full">
    <UDashboardSidebar collapsible :ui="{ root: 'min-h-full' }">
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
    <UDashboardPanel class="h-full min-h-full overflow-hidden">
      <template #body>
        <div class="grid grid-rows-2 grid-cols-2 w-full h-full gap-4">
          <UCard variant="outline">
            <template #header>
              <h2>Vowel Shifts</h2>
            </template>
          </UCard>
          <UCard variant="outline">
            <template #header>
              <h2>Consonant Shifts</h2>
            </template>
          </UCard>
          <UCard variant="outline">
            PANEL 3
          </UCard>
          <UCard variant="outline">
            PANEL 4
          </UCard>
        </div>
        <!-- <UTabs :items="languageConfigTabs" variant="link">
            <template #trailing>
                <slot></slot><UCheckbox></UCheckbox>
            </template>
            <template #vowelShift>
                VOWEL SHIFT
            </template>
        </UTabs> -->
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>