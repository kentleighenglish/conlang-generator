<script setup lang="ts">
// import type { TableColumn } from "@nuxt/ui";
// import { getGroupedRowModel } from "@tanstack/vue-table";
// import type { GroupingOptions } from "@tanstack/vue-table";

// import type { AcceptableValue } from "@nuxt/ui";
import { useTranslationStore } from "~/store/translations";

// import type { TranslateResponseItem } from "~~/types/translate";

const translateInput = ref<string[]>([]);

const translationStore = useTranslationStore();

// const data = computed(
//   () =>
//     translationStore.translations[loadedTranslateInput.value] || {
//       loading: false,
//       items: [],
//     },
// );

const onInputUpdate = async () => {
  if (translateInput.value.length) {
    await translationStore.translate(translateInput.value);
  }
};

// const tableColumns: TableColumn<TranslateResponseItem>[] = [
//   {
//     id: "title",
//     header: "Language",
//   },
//   {
//     id: "languageKey",
//     accessorKey: "languageKey",
//   },
//   {
//     accessorKey: "original",
//     header: "English",
//   },
//   {
//     accessorKey: "rootText",
//     header: "Translated",
//   },
//   {
//     accessorKey: "rootTextIPA",
//     header: "Translated IPA",
//   },
//   {
//     accessorKey: "translatedText",
//     header: "Conlang",
//   },
//   {
//     accessorKey: "translatedTextIPA",
//     header: "Conlang IPA",
//   },
//   {
//     accessorKey: "chaos",
//     header: "Chaos",
//   },
//   {
//     accessorKey: "score",
//     header: "Score",
//     aggregationFn: "sum",
//     aggregatedCell: () => "Hello world",
//   },
// ];

// const groupingOptions = ref<GroupingOptions>({
//   groupedColumnMode: "remove",
//   getGroupedRowModel: getGroupedRowModel(),
// });
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
        </UForm>
        <!-- <UTable
          :data="data.items"
          :columns="tableColumns"
          :grouping-options="groupingOptions"
          :grouping="['languageKey']"
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
              <strong v-if="row.groupingColumnId === 'languageKey'">
                {{ row.original.languageLabel }}
              </strong>
            </div>
          </template>
        </UTable> -->
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
