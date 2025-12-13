<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { getGroupedRowModel } from "@tanstack/vue-table";
import type { GroupingOptions } from "@tanstack/vue-table";
    
import type { TranslateResponse, TranslateResponseItem } from "~~/types/translate";

const translateInput = ref<string>("");
    
const { data, execute, status } = await useFetch<TranslateResponse>("/api/translate", {
    query: {
        input: translateInput
    },
    immediate: false,
    watch: false,
});
const isLoading = computed(() => status.value === "pending");

const onTranslate = async () => {
    if (translateInput.value.length) {
        await execute();
    }
};

const tableColumns: TableColumn<TranslateResponseItem>[] = [
    {
        id: "title",
        header: "Language"
    },
    {
        id: 'languageKey',
        accessorKey: 'languageKey'
    },
    {
        accessorKey: "original",
        header: "English"
    },
    {
        accessorKey: "rootText",
        header: "Original"
    },
    {
        accessorKey: "rootTextIPA",
        header: "Original IPA"
    },
    {
        accessorKey: "translatedText",
        header: "Translated"
    },
    {
        accessorKey: "translatedTextIPA",
        header: "Translated IPA"
    },
    {
        accessorKey: "chaos",
        header: "Chaos"
    },
    {
        accessorKey: "score",
        header: "Score",
        aggregationFn: "sum",
        aggregatedCell: () => "Hello world"
    },
    // {
    //     accessorKey: "windowsLinux",
    //     header: "Windows/Linux",
    //     cell: ({ cell }: CellContext<TableData, TableShortcut>) => generateShortcutVnodes(cell.getValue())
    // },
    // {
    //     accessorKey: "macos",
    //     header: "MacOS",
    //     cell: ({ cell }: CellContext<TableData, TableShortcut>) => generateShortcutVnodes(cell.getValue())
    // }
];

const groupingOptions = ref<GroupingOptions>({
  groupedColumnMode: "remove",
  getGroupedRowModel: getGroupedRowModel()
});
</script>
<template>
    <div>
        <UFieldGroup>
            <UForm @submit="onTranslate">
                <UInput v-model="translateInput" type="text" placeholder="Translate Input" :loading="isLoading" required />
                <UButton :disabled="isLoading || !translateInput.length" type="submit">Translate</UButton>
            </UForm>
        </UFieldGroup>
        <UTable
            :data="data"
            :columns="tableColumns"
            :grouping-options="groupingOptions"
            :grouping="['languageKey']"
            :ui="{
                root: 'min-w-full',
                td: 'empty:p-0' // helps with the colspaned row added for expand slot
            }"
        >
            <template #title-cell="{ row }">
                <div v-if="row.getIsGrouped()" class="flex items-center">
                    <span class="inline-block" :style="{ width: `calc(${row.depth} * 1rem)` }" />

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
        </UTable>
    </div>
</template>