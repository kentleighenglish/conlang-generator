<script lang="ts" setup>
  import type { ZodObject} from "zod";
  import type { SoundShift } from "~~/types/soundShift";

  const model = defineModel<SoundShift>();
  defineProps<{
    schema: ZodObject,
  }>();

  const invalidateFields = (key: string) => {
    if (model.value) {
      switch (true) {
        case !!(key === "endOnly" && model.value.endOnly):
          console.log("end only enabled");
          model.value.trailing = undefined;
          break;
        case !!(key === "trailing" && model.value.trailing):
          model.value.endOnly = false;
          break;
        case !!(key === "startOnly" && model.value.startOnly):
          model.value.leading = undefined;
          break;
        case !!(key === "leading" && model.value.leading):
          model.value.startOnly = false;
          break;
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
          @update:model-value="invalidateFields('startOnly')"
        />
      </UFormField>
      <UFormField label="Leading Sound" class="w-full">
        <TableSelectSound v-model="model.leading" lang="en" class="w-full" @update:model-value="invalidateFields('leading')" />
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
          @update:model-value="invalidateFields('endOnly')"
        />
      </UFormField>
      <UFormField label="Trailing sound" class="w-full">
        <TableSelectSound v-model="model.trailing" lang="en" class="w-full" @update:model-value="invalidateFields('trailing')" />
      </UFormField>
    </div>
  </UForm>
</template>