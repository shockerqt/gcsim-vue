// import { getCharacters } from './get';
import { generateLocalData } from './utils';

const GDB_DIR = `${process.cwd()}/scripts/genshin-db`;

// getCharacters(GDB_DIR);
generateLocalData(GDB_DIR);
