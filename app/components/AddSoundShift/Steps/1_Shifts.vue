<script lang="ts" setup>
  import type { ZodObject} from "zod";
  import { ShiftModeEnum, type SoundShift } from "~~/types/soundShift";
  
  const model = defineModel<SoundShift>();
  defineProps<{
    schema: ZodObject,
  }>();

const switchMode = (mode?: ShiftModeEnum) => {
  if (model.value) {
    if (mode) {
      model.value.shiftMode = mode === model.value.shiftMode ? undefined : mode;
      model.value.to = undefined;
    } else {
      model.value.shiftMode = undefined;
    }
  }
};
</script>
<template>
  <UForm v-if="model" class="w-full space-y-4" :schema="schema">
    <!-- Step 1: From, To, drop shift, make voiced/voiceless -->
    <UFormField label="From">
      <TableSelectSound v-model="model.from" lang="en" class="w-full" />
    </UFormField>
    <USeparator />
    <div class="flex">
      <UFormField orientation="horizontal">
        <UCheckbox
          :model-value="model.shiftMode === ShiftModeEnum.changeVoice"
          label="Make voiced/voiceless"
          description="Makes voiced sounds voiceless and vice versa"
          @update:model-value="switchMode(ShiftModeEnum.changeVoice)"
        />
      </UFormField>
      <UFormField orientation="horizontal">
        <UCheckbox
          :model-value="model.shiftMode === ShiftModeEnum.dropSound"
          label="Drop sound"
          description="Drops the sound from the word"
          @update:model-value="switchMode(ShiftModeEnum.dropSound)"
        />
      </UFormField>
    </div>
    <UFormField label="To">
      <TableSelectSound
        v-model="model.to"
        class="w-full"
        lang="en"
        @update:model-value="switchMode()"
      />
    </UFormField>
  </UForm>
</template>