<script lang="ts" setup>
import type { StepperItem } from "@nuxt/ui";

const eventStore = useEventStore();

const modalOpen = ref<boolean>(false);

eventStore.subscribe("addSoundShift", () => {
  modalOpen.value = true;
});

const steps: StepperItem[] = [
  {
    title: "Shift",
    icon: "i-material-symbols:translate",
  },
  {
    title: "Conditions",
    icon: "i-material-symbols:rule-rounded",
  },
  {
    title: "Flags",
    icon: "i-ion:flag",
  },
  {
    title: "Occurrence",
    icon: "i-ion:dice",
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
      <!-- Step 1: From, To, drop shift, make voiced/voiceless -->
      <!-- Step 2: At start, at end, before, after -->
      <!-- Step 3: Prevent multiple iterations,  -->
      <!-- Step 3: Occurrence -->
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