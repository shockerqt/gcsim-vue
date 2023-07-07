import { createCharactersData } from './createCharactersData';

const run = async () => {
  // await createCharactersFromDb(true);
  // const stats = await createCharactersImages();
  await createCharactersData(true);
};

run();
