export default defineEventHandler(async (event) => {
  const { data } = await $fetch(
    "https://api.currencyapi.com/v3/latest?apikey=cur_live_WcU5yHTfgaxwCahxylWMy2Z5yOuPfouRlobWibR3"
  );

  return data;
});
