import { createCharactersFromDb } from './createCharactersFromDb';

const run = async () => {
  const chars = await createCharactersFromDb();
  console.log(chars);
};

run();
