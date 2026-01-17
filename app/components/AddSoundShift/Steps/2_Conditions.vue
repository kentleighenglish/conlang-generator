<script lang="ts" setup>
const model = defineModel<NewSoundShift>();
</script>
<template>
  <UForm v-if="model">
    <!-- Step 2: At start, at end, before, after -->
    <UFormField label="From">
      <TableSelectSound v-model="model.from" lang="en" />
    </UFormField>
  </UForm>
</template>