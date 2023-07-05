import { writeFile } from 'fs/promises';

export const paths = {
  GDB: `${process.cwd()}/scripts/genshin-db`,
  DATA: `${process.cwd()}/scripts/data`,
};

export const slugify = (str: string) => {
  str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
  return str;
};

export const filenameVersion = () => {
  const date = new Date();
  return slugify(date.toISOString());
};

export const writeTo = async (path: string, object: Object) => {
  await writeFile(
    path,
    JSON.stringify(object, null, 2),
    { flag: 'w+' },
  );
};

export const backupData = async (filename: string) => {
  try {
    const backup = await import(`${paths.DATA}/${filename}.json`);
    if (backup) {
      await writeTo(
      `${paths.DATA}/old/${filename}${filenameVersion()}.json`,
      backup,
      );
    }
  } catch (error) {
    console.error('ERROR utils/backupData()', error);
  }
};

/**
 * Save a serializable object to json file creating a backup version
 * @param filename the name of the file (without extension)
 * @param data the json data
 */
export const writeData = async (filename: string, data: Object) => {
  try {
    await backupData(filename);
    await writeTo(`${paths.DATA}/${filename}.json`, data);
  } catch (error) {
    console.error('ERROR utils/writeData()', error);
  }
};
