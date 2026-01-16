<script lang="ts" setup>
const eventStore = useEventStore();

const modalOpen = ref<boolean>(false);

eventStore.subscribe("addSoundShift", () => {
  modalOpen.value = true;
});
</script>
<template>
  <UModal v-model:open="modalOpen">
    <template #body>
      MODAL TO ADD
    </template>
  </UModal>
</template>