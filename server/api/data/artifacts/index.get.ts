export default defineEventHandler(async () => {
  const storage = useStorage('assets:server');
  const path = 'artifactsData.json';

  // const ok = await storage.hasItem(path);
  const data = await storage.getItem<DataArtifacts>(path);
  if (data) {
    return data;
  }
});
