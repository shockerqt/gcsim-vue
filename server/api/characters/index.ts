export default defineEventHandler(async () => {
  const storage = useStorage('assets:server');
  const path = 'characters.json';

  // const ok = await storage.hasItem(path);
  const data = await storage.getItem(path);
  return data;
});
