<template>
  <div>
    <pre>{{ data }}</pre>
  </div>
</template>

<script setup>
const { data } = await useFetch("/api/currency/GBP");

console.log(data.value);
</script>

<style lang="scss" scoped></style>
