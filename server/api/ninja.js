export default defineEventHandler(async (event) => {
  const { currencyKey } = useRuntimeConfig();

  const { data } = await $fetch(currencyKey);

  return data;
});
