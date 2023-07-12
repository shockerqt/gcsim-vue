import { paths, writeData } from './utils.js';

export interface CharacterImages {
  [k: string]: string;
}

type CharactersBaseStats = Record<string, CharacterImages>;

/**
 * Extract data fron 'genshin-db' repository and
 * generate a json file with an array of {@link DataCharacter}.
 */
export const createCharactersImages = async (save = false) => {
  try {
    const charactersImages: CharactersBaseStats = {};
    const charactersDataJson = (
      await import(`${paths.DATA}/charactersDataFromDb.json`)
    ).default;

    Object.entries(charactersDataJson).forEach(
      ([characterSlug, characterData]) => {
        const images = (characterData as DataCharacter).images;
        charactersImages[characterSlug] = {};
        Object.keys(images).forEach((imageSlug) => {
          charactersImages[characterSlug][imageSlug] = '';
        });
      }
    );

    if (save) {
      writeData('charactersImages', charactersImages);
    }
    return charactersImages;
  } catch (err) {
    console.error(err);
  }
};
