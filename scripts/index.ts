import { createCharactersData } from './createCharactersData';

const run = async () => {
  // const chars = await createCharactersFromDb(true);
  // const stats = await createCharactersImages(true);
  const data = await createCharactersData(true);
  console.log(data);
};

run();
