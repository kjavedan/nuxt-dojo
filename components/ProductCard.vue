<template>
  <div class="card text-center flex flex-col justify-between">
    <div class="flex items-center h-full">
      <img class="w-full h-auto thumb" :src="image" :alt="title" />
    </div>
    <NuxtLink :to="`/products/${id}`">
      <p class="font-bold m-4 truncate">
        {{ title }}
      </p>
      <p class="btn">open</p>
    </NuxtLink>
  </div>
</template>
<script setup>
defineProps(["title", "id", "image"]);
</script>

<style lang="scss" scoped></style>
