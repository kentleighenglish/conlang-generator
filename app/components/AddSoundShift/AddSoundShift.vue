<script lang="tsx" setup>
import { cloneDeep } from "lodash";
import type { StepperItem } from "@nuxt/ui";
import type { VNode } from "vue";
import * as z from "zod";

import ShiftsForm from "./Steps/1_Shifts.vue";
import ConditionsForm from "./Steps/2_Conditions.vue";
import FlagsForm from "./Steps/3_Flags.vue";
import ChaosForm from "./Steps/4_Chaos.vue";
import type { NewSoundShift } from "~~/types/soundShift";
import { ShiftModeArray } from "~~/types/soundShift";

const eventStore = useEventStore();
const languageStore = useLanguageStore();

const modalOpen = ref<boolean>(false);

eventStore.subscribe("addSoundShift", () => {
  resetForm();
  modalOpen.value = true;
});

const form = ref<NewSoundShift>(
  cloneDeep(languageStore.initialSoundShift as NewSoundShift),
);
const resetForm = () => form.value = cloneDeep(languageStore.initialSoundShift);

resetForm();

const schema: z.ZodObject[] = [
  z.object({
    from: z.string("You must select a sound to shift"),
    to: z.string().optional(),
    shiftMode: z.enum(ShiftModeArray as string[]).optional(),
  }).refine(({ to, shiftMode }) => {
    return ((!!shiftMode && !to) || (!!to && !shiftMode)) ? true : false;
  }),
  z.object({
    startOnly: z.boolean(),
    leading: z.string().optional(),
    endOnly: z.boolean(),
    trailing: z.string().optional(),
  }).refine(({ startOnly, leading, endOnly, trailing }) => (
    (!startOnly || (startOnly && !trailing)) &&
    ((!endOnly) || (endOnly && !trailing))
  )) ,
  z.object({
    preventMultipleIterations: z.boolean(),
  }),
  z.object({
    occurrence: z.number(),
  }),
];

const validateStep = (stepSchema?: z.ZodObject) => stepSchema?.safeParse(form.value).success;
const currentStepValid = computed(() => validateStep(schema[currentStep.value]));

const steps = computed<Array<StepperItem & { form: VNode }>>(() => ([
  {
    title: "Shift",
    icon: "i-material-symbols:translate",
    form: h(ShiftsForm, {
      schema: schema[0]!,
    }),
  },
  {
    title: "Conditions",
    icon: "i-material-symbols:rule-rounded",
    form: h(ConditionsForm, {
      schema: schema[1]!,
    }),
    disabled: !validateStep(schema[0]),
  },
  {
    title: "Flags",
    icon: "i-ion:flag",
    form: h(FlagsForm, {
      schema: schema[2]!,
    }),
    disabled: !validateStep(schema[1])
  },
  {
    title: "Chaos",
    icon: "i-ion:dice",
    form: h(ChaosForm, {
      schema: schema[3]!,
    }),
    disabled: !validateStep(schema[2]),
  },
]));

const stepper = useTemplateRef("stepper");
const currentStep = ref<number>(0);

const onSubmit = () => {
  languageStore.addSoundShift(form.value);
  resetForm();
  modalOpen.value = false;
}
</script>
<template>
  <UModal v-model:open="modalOpen">
    <template #title>
      <div class="w-100">
        <UStepper 
          ref="stepper"
          v-model="currentStep"
          :items="steps"
          size="sm"
        />
      </div>
    </template>
    <template #body>
      <component :is="steps[currentStep]!.form" v-model="form" />
    </template>
    <template #footer>
      <div class="flex gap-2 justify-between mt-4 w-full">
        <div>
          <UButton
            v-if="stepper?.hasPrev"
            leading-icon="i-lucide-arrow-left"
            @click="stepper?.prev()"
          >Prev</UButton>
        </div>
        <div>
          <UButton
            v-if="stepper?.hasNext"
            trailing-icon="i-lucide-arrow-right"
            :variant="!currentStepValid ? 'subtle' : 'solid'"
            :color="!currentStepValid ? 'primary' : 'primary'"
            :disabled="!currentStepValid"
            @click="stepper?.next()"
          >Next</UButton>
          <UButton
            v-else
            :variant="!currentStepValid ? 'subtle' : 'solid'"
            :color="!currentStepValid ? 'primary' : 'primary'"
            :disabled="!currentStepValid"
            @click="onSubmit"
          >Save</UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>