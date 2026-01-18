<script lang="ts" setup>
import type { SelectProps } from "@nuxt/ui";

defineProps<SelectProps>();
</script>
<template>
  <div class="flex gap-3">
    <div class="text-primary">{{ $attrs.modelValue }}</div>
    <USlider v-bind="$attrs"></USlider>
  </div>
</template>