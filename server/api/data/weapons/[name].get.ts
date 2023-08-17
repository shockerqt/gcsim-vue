export default defineEventHandler(async (event) => {
  const name = event?.context?.params?.name;

  if (!name) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
  }

  const storage = useStorage('assets:server');
  const path = 'weaponsData.json';

  const data = await storage.getItem<DataWeapons>(path);
  const dataWeapon: DataWeapon | null = data?.[name] ?? null;

  return dataWeapon;
});
