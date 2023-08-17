export default defineEventHandler(async () => {
  const storage = useStorage('assets:server');
  const path = 'weaponsData.json';

  // const ok = await storage.hasItem(path);
  const data = await storage.getItem<DataWeapons>(path);
  if (data) {
    return data;
  }
});
