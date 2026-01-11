<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { getGroupedRowModel } from "@tanstack/vue-table";
import type { GroupingOptions } from "@tanstack/vue-table";

// import type { AcceptableValue } from "@nuxt/ui";

import type { Translation } from "~~/types/translate";

const translateInput = ref<string[]>([]);
const synonymCount = ref<number>(0);

const translationStore = useTranslationStore();

const data = computed(
  () => translateInput.value.reduce((acc, input) => ([
    ...acc,
    ...(translationStore.translations[input.toLowerCase()] || []),
  ]), [] as Translation[]),
);

const onInputUpdate = async () => {
  if (translateInput.value.length) {
    await translationStore.translate(translateInput.value, synonymCount.value);
  }
};

const renderIPA = (ipa: string) => h("code", { class: "text-primary" }, `/${ipa}/`);
const tableColumns: TableColumn<Translation>[] = [
  // {
  //   id: "title",
  //   header: "Language",
  // },
  {
    id: "baseWordKey",
    accessorKey: "baseWord",
    header: "Tag",
  },
  {
    accessorKey: "original",
    header: "Original",
  },
  {
    accessorKey: "originalIPA",
    header: "IPA",
    cell: ({ cell }) => renderIPA(cell.getValue() as string),
  },
  {
    accessorKey: "translated",
    header: "Translated",
  },
  {
    accessorKey: "translatedIPA",
    header: "Translated IPA",
    cell: ({ cell }) => renderIPA(cell.getValue() as string),
  },
];

const groupingOptions = ref<GroupingOptions>({
  groupedColumnMode: "remove",
  getGroupedRowModel: getGroupedRowModel(),
});
</script>
<template>
  <UDashboardGroup storage="local" storage-key="translatorDashboard">
    <UDashboardPanel>
      <template #body>
        <UForm>
          <UInputTags 
            v-model="translateInput"
            type="text"
            placeholder="Translate Input"
            size="xl"
            :max="10"
            :loading="translationStore.loading"
            required
            @change="onInputUpdate"
          />
          <UInputNumber 
            v-model="synonymCount"
            type="number"
            placeholder="Translate Input"
            size="xl"
            :max="10"
            :loading="translationStore.loading"
            required
            @change="onInputUpdate"
          />
        </UForm>
        <UTable
          :data="data"
          :columns="tableColumns"
          :grouping-options="groupingOptions"
          :grouping="['baseWord']"
          :ui="{
            root: 'min-w-full',
            td: 'empty:p-0', // helps with the colspaned row added for expand slot
          }"
        >
          <template #title-cell="{ row }">
            <div v-if="row.getIsGrouped()" class="flex items-center">
              <span
                class="inline-block"
                :style="{ width: `calc(${row.depth} * 1rem)` }"
              />

              <UButton
                variant="outline"
                color="neutral"
                class="mr-2"
                size="xs"
                :icon="row.getIsExpanded() ? 'i-lucide-minus' : 'i-lucide-plus'"
                @click="row.toggleExpanded()"
              />
              <strong v-if="row.groupingColumnId === 'baseWord'">
                {{ row.original.baseWord }}
              </strong>
            </div>
          </template>
        </UTable>
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
