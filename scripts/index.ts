import { createArtifactsFromDb } from './createArtifactsFromDb.js';
import { createCharactersData } from './createCharactersData.js';
import { createCharactersFromDb } from './createCharactersFromDb.js';

const run = async () => {
  // Generate characters data
  console.log('Generating characters data');
  try {
    await createArtifactsFromDb(true);
  } catch (error) {
    console.error(error);
  }
};

run();
