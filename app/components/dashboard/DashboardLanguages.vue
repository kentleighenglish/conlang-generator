<script setup lang="ts">
import type {
  AcceptableValue,
  NavigationMenuItem,
  SelectItem,
  TableColumn,
} from "@nuxt/ui";
import { useLanguageStore, type SoundShift } from "~/store/languages";
import { ValidLanguages, type LanguageKey } from "~~/types/translate";

const languageStore = useLanguageStore();

const currentLanguage = computed(() => languageStore.currentLanguage);

const languageBaseOptions: Array<SelectItem & { value: string }> = Object.entries(ValidLanguages).map(
  ([key, lang]) => ({
    value: key,
    label: lang.label,
    icon: lang.icon,
  } satisfies SelectItem),
);

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

const updateSoundShift = (id: string, updateObj: Partial<SoundShift>) => {
  languageStore.updateSoundShift(id, updateObj);
};

const UButton = resolveComponent("UButton");
const UTooltip = resolveComponent("UTooltip");
const USlider = resolveComponent("USlider");
const UIcon = resolveComponent("UIcon");
const SelectSound = resolveComponent("TableSelectSound");
const tableColumns: TableColumn<SoundShift>[] = [
  {
    id: "index",
    cell: ({ row }) => `#${row.index + 1}`,
  },
  {
    accessorKey: "from",
    header: "From",
    cell: ({ row, cell }) => h(SelectSound, {
      lang: currentLanguage.value?.languageBase,
      modelValue: cell.getValue(),
      "onUpdate:modelValue": (value: string) => updateSoundShift(row.original.id, { from: value }),
    }),
  },
  {
    accessorKey: "to",
    header: "To",
    cell: ({ row, cell }) => h(SelectSound, {
      lang: currentLanguage.value?.languageBase,
      modelValue: cell.getValue(),
      "onUpdate:modelValue": (value: string) => updateSoundShift(row.original.id, { to: value }),
    }),
  },
  {
    accessorKey: "preceding",
    header: "Preceding",
  },
  {
    accessorKey: "chaos",
    header: () => h("div", { class: "flex gap-1" }, [
      "Occurrence",
      h(UTooltip, {
        class: "cursor-pointer",
        text: "This determines how often this shift should occur, lower rates require higher chaos.",
      }, h(UIcon, { name: "i-ion-help-circle-outline", class: "size-4" })),
    ]),
    cell: ({ row, cell }) => h(USlider, {
      min: 0,
      max: 1,
      step: 0.1,
      modelValue: cell.getValue(),
      "onUpdate:modelValue": (value: string) => updateSoundShift(row.original.id, { chaos: Number(value) }),
    }),
  },
  {
    id: "actions",
    cell: ({ row }) => h(UButton, {
      icon: "i-ion:trash",
      variant: "ghost",
      onClick: () => languageStore.removeSoundShift(row.original.id),
    }),
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

const languageBaseIcon = computed(() => languageBaseOptions.find((item) => (typeof item === "object" && item?.value) === currentLanguage.value?.languageBase)?.icon);
const onChangeLanguageBase = (newLanguageBase: AcceptableValue | undefined) => {
  if (newLanguageBase) {
    languageStore.changeLanguageBase(newLanguageBase as LanguageKey);
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
        <div v-if="currentLanguage">
          <UCard variant="outline">
            <template #header>
              <div class="flex justify-between">
                <USelect
                  :items="languageBaseOptions"
                  placeholder="Select Base Language"
                  label="Base Language"
                  :icon="languageBaseIcon"
                  :disabled="currentLanguage.soundShifts.length > 0"
                  :model-value="currentLanguage.languageBase?.toString()"
                  @update:model-value="onChangeLanguageBase"
                />
                <UButton
                  trailing-icon="i-ion:add-circle-outline"
                  :disabled="!currentLanguage.languageBase"
                  @click="languageStore.addSoundShift()"
                >
                  Add Sound Shift
                </UButton>
              </div>
            </template>
            <UTable
              :columns="tableColumns"
              :data="currentLanguage.soundShifts"
            />
          </UCard>
        </div>
        <UEmpty v-else title="No language selected" />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
