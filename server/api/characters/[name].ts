export default defineEventHandler(async (event) => {
  const storage = useStorage('assets:server');
  const path = `charactersData:${event?.context?.params?.name}.json`;

  const ok = await storage.hasItem(path);
  if (!ok) { throw createError({ statusCode: 404, statusMessage: 'Page Not Found' }); }

  const data = await storage.getItem(path);
  return {
    name: data?.character.name,
    fullname: data?.character.fullname,
    title: data?.character.title,
    element: data?.character.element,
    rarity: parseInt(data?.character.rarity),
    splashImage: data?.character.images.namegachasplash,
    talentImages: data?.talents.images,
  };
});
