<script setup lang="ts">
    const { data } = await useFetch("/api/translate", {
        body: { input: "town" }
    });

    console.log(data);
</script>
<template>
    <div>TRANSLATOR</div>
</template>