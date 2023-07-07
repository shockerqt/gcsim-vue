export default defineEventHandler(async () => {
  const storage = useStorage('assets:server');
  const path = 'charactersData.json';

  // const ok = await storage.hasItem(path);
  const data = await storage.getItem<DataCharacters>(path);
  if (data) { return data; }
});
