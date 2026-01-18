<script lang="ts" setup>
  import type { ZodObject} from "zod";
  import type { SoundShift } from "~~/types/soundShift";

  const model = defineModel<SoundShift>();
  defineProps<{
    schema: ZodObject,
  }>();
</script>
<template>
  <UForm v-if="model" class="w-full space-y-4" :schema="schema">
    <!-- Step 2: At start, at end, before, after -->
    <UFormField label="From">
      <TableSelectSound v-model="model.from" lang="en" />
    </UFormField>
  </UForm>
</template>