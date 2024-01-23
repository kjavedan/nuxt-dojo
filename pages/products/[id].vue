<template>
  <div>
    <Head>
      <Title>Nuxt Dojo | {{ product.title }}</Title>
      <Meta name="description" :content="product.description" />
    </Head>
    <h1>{{ product.title }}</h1>
    <img :src="product.image" :alt="product.title" />
    <p>{{ product.description }}</p>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "products",
});

const { id } = useRoute().params;
const uri = `https://fakestoreapi.com/products/${id}`;
const { data: product } = await useFetch(uri);

if (!product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Product Not Found",
    fatal: true,
  });
}
</script>

<style lang="scss" scoped></style>
