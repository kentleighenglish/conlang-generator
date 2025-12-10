<script setup lang="ts">
    const { data } = await useFetch(`/api/translate?input=town`);

    console.log(data.value);
</script>
<template>
    <div>TRANSLATOR</div>
</template>