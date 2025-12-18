<script setup lang="ts">
import type { NavigationMenuItem, TableColumn } from '@nuxt/ui';
import { useLanguageStore, type SoundShift } from '~/store/languages';

const { languages, addLanguage, setCurrentLanguage, currentLanguage, currentLanguageId } = useLanguageStore();

const addLanguageModalOpen = ref<boolean>(false);
const navItems = computed<NavigationMenuItem[]>(() => ([
  ...languages.map((language) => ({
    label: language.name,
    active: language.id === currentLanguageId,
    onSelect: () => setCurrentLanguage(language.id),
  })),
  {
    label: "Add Language",
    icon: "i-ion:plus",
    onSelect: (e: Event) => {
      e.preventDefault();
      addLanguageModalOpen.value = true;
    }
  }
]));

const tableColumns: TableColumn<SoundShift>[] = [
    {
        id: "title",
        header: "Language"
    },
];

const addLanguageName = ref<string>("");
const onAddLanguage = () => {
  if (addLanguageName.value) {
    addLanguage({ name: addLanguageName.value });
  }
};

</script>
<template>
  <UDashboardGroup storage="local" storage-key="languagesDashboard" class="h-full">
    <UModal ref="addLanguageModal" v-model:open="addLanguageModalOpen">
      <template #body>
        <UForm @submit="onAddLanguage">
          <UInput v-model="addLanguageName" type="text" placeholder="Name" />
          <UButton type="submit" block color="primary">Add</UButton>
        </UForm>
      </template>
    </UModal>
    <UDashboardSidebar collapsible :ui="{ root: 'min-h-full' }">
        <template #header>
            <h1 class="prose">Languages</h1>
        </template>
        <template #default>
            <UNavigationMenu
                highlight
                :items="navItems"
                orientation="vertical"
            />
        </template>
    </UDashboardSidebar>
    <UDashboardPanel class="h-full min-h-full overflow-hidden">
      <template #body>
        <UCard v-if="currentLanguage" variant="outline">
          <UTable :columns="tableColumns" :data="currentLanguage.soundShifts" />
        </UCard>
        <UEmpty v-else title="No language selected" />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>