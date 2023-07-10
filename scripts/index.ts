import { createCharactersData } from './createCharactersData.js';

const run = async () => {
  // await createCharactersFromDb(true);
  // const stats = await createCharactersImages();
  await createCharactersData(true);
};

run();
