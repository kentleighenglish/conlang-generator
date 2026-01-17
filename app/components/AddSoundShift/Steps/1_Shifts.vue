<script lang="ts" setup>
const model = defineModel<NewSoundShift>();
</script>
<template>
  <UForm v-if="model">
    <UFormField label="From">
      <TableSelectSound v-model="model.from" lang="en" />
      <!-- Step 1: From, To, drop shift, make voiced/voiceless -->
    </UFormField>
  </UForm>
</template>