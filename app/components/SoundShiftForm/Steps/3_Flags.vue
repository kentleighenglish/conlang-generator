<script lang="ts" setup>
  import type { ZodObject} from "zod";
import type { SoundShift } from "~~/types/soundShift";
  const model = defineModel<SoundShift>();
  defineProps<{
    schema: ZodObject,
  }>();

const form = useTemplateRef("form");
</script>
<template>
  <UForm v-if="model" ref="form" class="w-full space-y-4" :schema="schema">
      <UFormField orientation="horizontal" class="w-full">
        <UCheckbox
          v-model="model.preventMultipleIterations"
          class="flex align-center"
          label="Prevent Multiple Iterations"
          description="Will ensure this sound shift is not affected by further sound shifts"
        />
      </UFormField>
  </UForm>
</template>