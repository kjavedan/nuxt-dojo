<template>
  <div>
    <div class="grid grid-cols-4 gap-5">
      <div v-for="(p, index) in products" :key="index">
        <ProductCard :title="p.title" :id="p.id" :image="p.image"></ProductCard>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "products",
});

useHead({
  title: "Nuxt Dojo | Merch",
  meta: [{ name: "description", content: "Nuxt 3 Merch" }],
});

const { data: products } = await useFetch("https://fakestoreapi.com/products");
</script>

<style lang="scss" scoped></style>
