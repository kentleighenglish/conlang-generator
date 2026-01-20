<script lang="ts" setup>
  import type { ZodObject} from "zod";
  import { ShiftModeEnum, type SoundShift } from "~~/types/soundShift";

  const languageStore = useLanguageStore();
  const currentLanguage = computed(() => languageStore.currentLanguage);
  
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

const noVoiceAlternative = computed(() => model.value?.from ? !getVoicingAlternative(model.value?.from) : false);
</script>
<template>
  <UForm v-if="model" class="w-full space-y-4" :schema="schema">
    <!-- Step 1: From, To, drop shift, make voiced/voiceless -->
    <UFormField label="From">
      <TableSelectSound v-model="model.from" :lang="currentLanguage?.languageBase || undefined" class="w-full" />
    </UFormField>
    <USeparator />
    <div class="flex">
      <UFormField orientation="horizontal">
        <UCheckbox
          :model-value="model.shiftMode === ShiftModeEnum.changeVoice"
          label="Make voiced/voiceless"
          description="Makes voiced sounds voiceless and vice versa"
          :disabled="!model.from || noVoiceAlternative"
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
        @update:model-value="switchMode()"
      />
    </UFormField>
  </UForm>
</template>