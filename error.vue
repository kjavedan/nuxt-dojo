<template>
  <div class="mt-7 mx-w-sm mx-auto text-center card">
    <p class="mt-7 text-7xl font-bold">{{ error.statusCode }}</p>
    <p class="mt-7 text-6xl">Ooops.</p>
    <p class="mt-7">{{ error.message }}</p>
    <div class="my-7">
      <NuxtLink class="btn" to="/">Go home</NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps(["error"]);
</script>

<style lang="scss" scoped></style>
