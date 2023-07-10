import { paths, writeData } from './utils.js';

/**
 * Extract data fron 'genshin-db' repository and
 * generate a json file with an array of {@link DataCharacter}.
 */
export const createCharactersData = async (save = false) => {
  try {
    const dbJson = (await import(`${paths.DATA}/charactersDataFromDb.json`, { assert: { type: 'json' } })).default;
    const imagesJson = (await import(`${paths.DATA}/charactersImages.json`, { assert: { type: 'json' } })).default;
    const statsJson = (await import(`${paths.DATA}/charactersStats.json`, { assert: { type: 'json' } })).default;

    const charactersSlugList = (await import(`${paths.DATA}/charactersSlugList.json`, { assert: { type: 'json' } })).default;

    verifySlugs(dbJson, charactersSlugList);
    verifySlugs(imagesJson, charactersSlugList);
    verifySlugs(statsJson, charactersSlugList);

    const data = dbJson;

    console.log(data.albedo.baseStats);

    for (const slug of Object.keys(data)) {
      const images = data[slug].images;

      Object.keys(images).forEach((imageSlug) => {
        data[slug].images[imageSlug].src = imagesJson[slug][imageSlug];
      });

      data[slug].baseStats = {
        ...statsJson[slug],
        lvls: dbJson[slug].baseStats.lvls,
      };
    }

    if (save) { writeData('charactersData', data); }
    return data;
  } catch (err) {
    console.error(err);
  }
};

const verifySlugs = (data: object, charactersSlugList: string[]) => {
  const length = charactersSlugList.length;
  if (Object.keys(data).length !== length) { throw new Error('Slugs length don\'t match'); }
  const dataSlugs = Object.keys(data);
  Object.keys(verifySlugs).forEach((slug) => {
    if (!dataSlugs.includes(slug)) { throw new Error('Data doesn\'t include all the characters'); }
  });
};
