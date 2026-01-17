<script lang="tsx" setup>
import { cloneDeep } from "lodash";
import type { StepperItem } from "@nuxt/ui";
import type { VNode } from "vue";

import ShiftsForm from "./Steps/1_Shifts.vue";
import ConditionsForm from "./Steps/2_Conditions.vue";
import FlagsForm from "./Steps/3_Flags.vue";
import ChaosForm from "./Steps/4_Chaos.vue";

const eventStore = useEventStore();
const languageStore = useLanguageStore();

const modalOpen = ref<boolean>(false);

eventStore.subscribe("addSoundShift", () => {
  modalOpen.value = true;
});

const form = ref<NewSoundShift>(cloneDeep(languageStore.initialSoundShift as NewSoundShift));
const resetForm = () => form.value = cloneDeep(languageStore.initialSoundShift);

resetForm();

const steps: Array<StepperItem & { form: VNode }> = [
  {
    title: "Shift",
    icon: "i-material-symbols:translate",
    form: h(ShiftsForm, {}),
  },
  {
    title: "Conditions",
    icon: "i-material-symbols:rule-rounded",
    form: h(ConditionsForm, {}),
  },
  {
    title: "Flags",
    icon: "i-ion:flag",
    form: h(FlagsForm, {}),
  },
  {
    title: "Chaos",
    icon: "i-ion:dice",
    form: h(ChaosForm, {}),
  },
];

const stepper = useTemplateRef("stepper");
const currentStep = ref<number>(0);
</script>
<template>
  <UModal v-model:open="modalOpen">
    <template #title>
      <div class="w-100">
        <UStepper ref="stepper" v-model="currentStep" :items="steps" size="sm"></UStepper>
      </div>
    </template>
    <template #body>
      <component :is="steps[currentStep]!.form" v-model="form" />
    </template>
    <template #footer>
      <div class="flex gap-2 justify-between mt-4 w-full">
        <UButton
          leading-icon="i-lucide-arrow-left"
          variant="solid"
          :disabled="!stepper?.hasPrev"
          @click="stepper?.prev()"
        >Prev</UButton>

        <UButton
          trailing-icon="i-lucide-arrow-right"
          variant="solid"
          :disabled="!stepper?.hasNext"
          @click="stepper?.next()"
        >Next</UButton>
      </div>
    </template>
  </UModal>
</template>