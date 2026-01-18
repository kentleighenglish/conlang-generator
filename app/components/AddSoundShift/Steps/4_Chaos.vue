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
    <UFormField label="Occurrence">
      <USlider v-model="model.occurrence" />
      <!-- Step 4: Chaos, Occurrence, and so on -->
    </UFormField>
  </UForm>
</template>
