<script setup lang="ts">
import type { NavigationMenuItem, SelectItem, TableColumn } from "@nuxt/ui";
import { useLanguageStore, type SoundShift } from "~/store/languages";
import { ValidLanguages } from "~~/types/translate";

const languageStore = useLanguageStore();

const languageOptions: SelectItem[] = Object.values(ValidLanguages);

const addLanguageModalOpen = ref<boolean>(false);
const navItems = computed<NavigationMenuItem[]>(() => [
  ...languageStore.languages.map((language) => ({
    label: language.name,
    active: language.id === languageStore.currentLanguageId,
    onSelect: () => languageStore.setCurrentLanguage(language.id),
  })),
  {
    label: "Add Language",
    icon: "i-ion:plus",
    onSelect: (e: Event) => {
      e.preventDefault();
      addLanguageModalOpen.value = true;
    },
  },
]);

const tableColumns: TableColumn<SoundShift>[] = [
  {
    id: "index",
    cell: ({ row }) => `#${row.index + 1}`,
  },
  {
    accessorKey: "from",
    header: "From",
  },
  {
    accessorKey: "to",
    header: "To",
  },
  {
    accessorKey: "preceding",
    header: "Preceding",
  },
];

const addLanguageName = ref<string>("");
const onAddLanguage = () => {
  if (addLanguageName.value) {
    languageStore.addLanguage({ name: addLanguageName.value });
    addLanguageModalOpen.value = false;
    addLanguageName.value = "";
  }
};
</script>
<template>
  <UDashboardGroup
    storage="local"
    storage-key="languagesDashboard"
    class="h-full"
  >
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
        <UNavigationMenu highlight :items="navItems" orientation="vertical" />
      </template>
    </UDashboardSidebar>
    <UDashboardPanel class="h-full min-h-full overflow-hidden">
      <template #body>
        <USelect :items="languageOptions" />
        <UCard v-if="languageStore.currentLanguage" variant="outline">
          <template #header>
            <div class="flex justify-end">
              <UButton
                trailing-icon="i-ion:add-circle-outline"
                @click="languageStore.addSoundShift()"
              >
                Add Sound Shift
              </UButton>
            </div>
          </template>
          <UTable
            :columns="tableColumns"
            :data="languageStore.currentLanguage.soundShifts"
          />
        </UCard>
        <UEmpty v-else title="No language selected" />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
