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
    <!-- Step 1: From, To, drop shift, make voiced/voiceless -->
    <UFormField label="From">
      <TableSelectSound v-model="model.from" lang="en" class="w-full" />
    </UFormField>
    <USeparator />
    <UFormField orientation="horizontal">
      <UCheckbox label="Make voiced/voiceless" description="vo" />
    </UFormField>
    <UFormField label="To">
      <TableSelectSound v-model="model.to" lang="en" />
    </UFormField>
  </UForm>
</template>