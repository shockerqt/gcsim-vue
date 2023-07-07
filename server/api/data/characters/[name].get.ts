export default defineEventHandler(async (event) => {
  const name = event?.context?.params?.name;

  if (!name) { throw createError({ statusCode: 404, statusMessage: 'Page Not Found' }); }

  const storage = useStorage('assets:server');
  const path = 'charactersData.json';

  const data = await storage.getItem<DataCharacters>(path);
  if (data?.[name]) { return data[name]; }
  return null;
});
