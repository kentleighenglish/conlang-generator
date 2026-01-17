<script lang="ts" setup>
const model = defineModel<NewSoundShift>();
</script>
<template>
  <UForm v-if="model" class="w-full">
    <!-- Step 1: From, To, drop shift, make voiced/voiceless -->
    <UFormField label="From">
      <TableSelectSound v-model="model.from" lang="en" />
    </UFormField>
    <UFormField label="From">
      <UCheckbox />
    </UFormField>
    <UFormField label="To">
      <TableSelectSound v-model="model.to" lang="en" />
    </UFormField>
  </UForm>
</template>