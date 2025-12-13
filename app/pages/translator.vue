<script setup lang="ts">

const translateInput = ref<string>("");
    
const { data, execute, status } = await useFetch("/api/translate", {
    query: {
        input: translateInput
    },
    immediate: false,
    watch: false,
});
const isLoading = computed(() => status.value === "pending");

console.log(data.value);

const onTranslate = async () => {
    if (translateInput.value.length) {
        await execute();
    }
};
</script>
<template>
    <div>
        <UFieldGroup>
            <UInput v-model="translateInput" type="text" placeholder="Translate Input" :loading="isLoading" />
            <UButton :disabled="isLoading || !translateInput.length" :loading="isLoading" @click="onTranslate">Translate</UButton>
        </UFieldGroup>
        {{ data }}
    </div>
</template>