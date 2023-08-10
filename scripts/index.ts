import { createCharactersData } from './createCharactersData.js';
import { createCharactersFromDb } from './createCharactersFromDb.js';

const run = async () => {
  // Generate characters data
  console.log('Generating characters data');
  try {
    await createCharactersFromDb();
    await createCharactersData();
  } catch (error) {
    console.error(error);
  }
};

run();
