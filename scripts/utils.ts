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
    { flag: 'w' },
  );
};

export const backupData = async (filename: string) => {
  await writeTo(
    `${paths.DATA}/old/${filename}${filenameVersion()}.json`,
    await import(`${paths.DATA}/${filename}.json`),
  );
};

export const writeData = async (filename: string, data: Object) => {
  await writeTo(
    `${paths.DATA}/old/${filename}${filenameVersion()}.json`,
    await import(`${paths.DATA}/${filename}.json`),
  );
  await writeTo(`${paths.DATA}/${filename}.json`, data);
};
