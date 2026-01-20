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
          v-model="model.allowMultipleIterations"
          class="flex align-center"
          label="Allow Multiple Iterations"
          description="Will allow this sound shift to be affected by further sound shifts"
        />
      </UFormField>
  </UForm>
</template>