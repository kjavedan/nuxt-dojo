export default defineEventHandler(async (event) => {
  //BODY DATA
  const body = await readBody(event);
  const uri = "https://service.x55api.cc/period/pageList";
  const { data } = await $fetch(uri, { method: "post", body });

  return data;
});
