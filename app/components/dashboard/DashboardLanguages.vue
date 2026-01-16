<script setup lang="ts">
import type {
  AcceptableValue,
  SelectItem,
  TableColumn,
  TableRow,
} from "@nuxt/ui";
import type { SoundShift } from "~/stores/languages";
import { ValidLanguages, type LanguageKey } from "~~/types/translate";

const UButton = resolveComponent("UButton");
const UTooltip = resolveComponent("UTooltip");
const CustomSlider = resolveComponent("CustomSlider");
const UIcon = resolveComponent("UIcon");
const SelectSound = resolveComponent("TableSelectSound");
const languageStore = useLanguageStore();

const currentLanguage = computed(() => languageStore.currentLanguage);

const languageBaseOptions: Array<SelectItem> = Object.entries(ValidLanguages).map(
  ([key, lang]) => ({
    value: key,
    label: lang.label,
    icon: lang.icon,
  } satisfies SelectItem),
);

const updateSoundShift = (id: string, updateObj: Partial<SoundShift>) => {
  languageStore.updateSoundShift(id, updateObj);
};

const sortButton = (row: TableRow<SoundShift>, up = false) => {
  const disabled = up ? row.index === 0 : (row.index + 1) === data.value.length;

  return h(
    UButton,
    {
      icon: up ? "i-lucide:chevron-up": "i-lucide:chevron-down",
      variant: "ghost",
      color: disabled ? "accent" : "primary",
      disabled,
      onClick: () => languageStore.sortSoundShifts(row.index, up ? row.index - 1 : row.index + 1),
      ui: {
        base: ["disabled:opacity-25 aria-disabled:opacity-25"],
      },
    },
    () => {},
  );
};

const tableColumns: TableColumn<SoundShift>[] = [
  {
    id: "handle",
    meta: {
      class: {
          td: "w-32 whitespace-normal",
      },
    },
    cell: ({ row }) => h("div", {}, [
      sortButton(row, true),
      sortButton(row, false),
    ]),
  },
  {
    id: "index",
    cell: ({ row }) => `#${row.index + 1}`,
  },
  {
    accessorKey: "from",
    enableResizing: true,
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
    accessorKey: "occurrence",
    header: () => h("div", { class: "flex gap-1" }, [
      "Occurrence",
      h(UTooltip, {
        class: "cursor-pointer",
        text: "This determines how often this shift should occur, lower rates require higher chaos.",
      }, () => h(UIcon, { name: "i-ion-help-circle-outline", class: "size-4" })),
    ]),
    cell: ({ row, cell }) => h(CustomSlider, {
      min: 0,
      max: 1,
      step: 0.1,
      modelValue: cell.getValue(),
      "onUpdate:modelValue": (value: string) => updateSoundShift(row.original.id, { occurrence: Number(value) }),
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

// @ts-expect-error this is an issue with nuxtui ts or something
const languageBaseIcon = computed(() => languageBaseOptions.find((item) => (typeof item === "object" && item?.value) === currentLanguage.value?.languageBase)?.icon);
const onChangeLanguageBase = (newLanguageBase: AcceptableValue | undefined) => {
  if (newLanguageBase) {
    languageStore.changeLanguageBase(newLanguageBase as LanguageKey);
  }
};

const data = computed<SoundShift[]>(() => currentLanguage.value?.soundShifts ?? []);
</script>
<template>
  <UDashboardGroup
    storage="local"
    storage-key="languagesDashboard"
    class="h-full"
  >
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
              :data="data"
              :ui="{
                tbody: 'dashboard-languages-table'
              }"
            />
          </UCard>
        </div>
        <UEmpty v-else title="No language selected" />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
