<script lang="ts" setup>
  import type { ZodObject} from "zod";
  import type { SoundShift } from "~~/types/soundShift";

  const model = defineModel<SoundShift>();
  defineProps<{
    schema: ZodObject,
  }>();

  const invalidateFields = () => {
    if (model.value) {
      if (model.value.endOnly) {
        model.value.trailing = undefined;
      }
      if (model.value.startOnly) {
        model.value.leading = undefined;
      }
    }
  };  
</script>
<template>
  <UForm v-if="model" class="w-full space-y-4" :schema="schema">
    <!-- Step 2: At start, at end, before, after -->
    <div class="flex gap-8">
      <UFormField orientation="horizontal" class="w-full" :ui="{ root: 'flex align-items-center' }">
        <UCheckbox
          v-model="model.startOnly"
          class="flex align-center"
          label="Start Only"
          description="Restrict shift to sounds at start"
          @update:model-value="invalidateFields()"
        />
      </UFormField>
      <UFormField label="Leading Sound" class="w-full">
        <TableSelectSound v-model="model.leading" lang="en" class="w-full" @update:model-value="invalidateFields()" />
      </UFormField>
    </div>
    <USeparator />
    <div class="flex gap-8">
      <UFormField orientation="horizontal" class="w-full">
        <UCheckbox
          v-model="model.endOnly"
          class="flex align-center"
          label="End Only"
          description="Restrict shift to sounds at end"
          @update:model-value="invalidateFields()"
        />
      </UFormField>
      <UFormField label="Trailing sound" class="w-full">
        <TableSelectSound v-model="model.trailing" lang="en" class="w-full" @update:model-value="invalidateFields()" />
      </UFormField>
    </div>
  </UForm>
</template>