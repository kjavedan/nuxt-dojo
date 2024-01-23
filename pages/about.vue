<template>
  <div>
    <pre>{{ data }}</pre>
  </div>
</template>

<script setup>
const { data } = await useFetch("/api/ninja");
</script>

<style lang="scss" scoped></style>
