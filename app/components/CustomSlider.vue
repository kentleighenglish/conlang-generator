<script lang="ts" setup>
import type { SelectProps } from "@nuxt/ui";

defineProps<SelectProps>();
const model = defineModel<number | number[] | undefined>();
</script>
<template>
  <div class="flex gap-3">
    <div class="text-primary">{{ model }}</div>
    <USlider v-bind="$attrs" v-model="model"></USlider>
  </div>
</template>