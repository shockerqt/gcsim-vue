import { opendir, writeFile } from 'fs/promises';
// import charactersLocalData from './data/charactersData.json';

const CHARS_DATA_PATH = `${process.cwd()}/scripts/data/charactersData.json`;

export const writeTo = async (path:string, object: Object) => {
  await writeFile(
    path,
    JSON.stringify(object, null, 2),
    { flag: 'w' },
  );
};

export const slugify = (str: string) => {
  str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
  return str;
};

export const generateLocalData = async (GDB_DIR: string) => {
  try {
    // backup
    const oldLocalData: { [k: string]: any } = await import(CHARS_DATA_PATH);
    writeTo(`${process.cwd()}/scripts/data/charactersDataOld.json`, oldLocalData);

    const localData: { [k: string]: any } = {};
    const charFiles = await opendir(`${GDB_DIR}/src/data/English/characters`);
    for await (const charFile of charFiles) {
      if (charFile.name === 'aether.json' || charFile.name === 'lumine.json') { continue; }
      const characterJsonEn = await import(`${GDB_DIR}/src/data/English/characters/${charFile.name}`);
      const characterJsonEs = await import(`${GDB_DIR}/src/data/Spanish/characters/${charFile.name}`);
      const talentsJsonEn = await import(`${GDB_DIR}/src/data/English/talents/${charFile.name}`);
      const talentsJsonEs = await import(`${GDB_DIR}/src/data/Spanish/talents/${charFile.name}`);
      const constellationsJsonEn = await import(`${GDB_DIR}/src/data/English/constellations/${charFile.name}`);
      const constellationsJsonEs = await import(`${GDB_DIR}/src/data/Spanish/constellations/${charFile.name}`);
      const slug = slugify(characterJsonEn.name);
      localData[slug] = {
        name: { en: characterJsonEn.name, es: characterJsonEs.name },
        title: { en: characterJsonEn.title, es: characterJsonEs.title },
        rarity: characterJsonEn.rarity,
        element: { en: characterJsonEn.element, es: characterJsonEs.element },
        weapontype: { en: characterJsonEn.weapontype, es: characterJsonEs.weapontype },
        substat: { en: characterJsonEn.substat, es: characterJsonEs.substat },
        constellation: { en: characterJsonEn.constellation, es: characterJsonEs.constellation },
        baseStats: {
          lvls: [
            '1',
            '20',
            '20+',
            '40',
            '40+',
            '50',
            '50+',
            '60',
            '60+',
            '70',
            '70+',
            '80',
            '80+',
            '90',
          ],
          hp: Array.from({ length: 14 }, () => 0),
          atk: Array.from({ length: 14 }, () => 0),
          def: Array.from({ length: 14 }, () => 0),
          critRate: Array.from({ length: 14 }, () => 0.05),
          critDmg: Array.from({ length: 14 }, () => 0.5),
          substat: Array.from({ length: 14 }, () => 0),
        },
        images: {
          portrait: { name: 'portrait', info: `Image ${characterJsonEn.name}`, src: '' },
          splashart: { name: 'splashart', info: `Splash Art ${characterJsonEn.name}`, src: '' },
          combat1: {
            name: { en: talentsJsonEn.combat1.name, es: talentsJsonEs.combat1.name },
            info: { en: talentsJsonEn.combat1.info, es: talentsJsonEs.combat1.info },
            src: '',
          },
          combat2: {
            name: { en: talentsJsonEn.combat2.name, es: talentsJsonEs.combat2.name },
            info: { en: talentsJsonEn.combat2.info, es: talentsJsonEs.combat2.info },
            src: '',
          },
          ...(talentsJsonEn.combatsp && {
            combatsp: {
              name: { en: talentsJsonEn.combatsp.name, es: talentsJsonEs.combatsp.name },
              info: { en: talentsJsonEn.combatsp.info, es: talentsJsonEs.combatsp.info },
              src: '',
            },
          }),
          combat3: {
            name: { en: talentsJsonEn.combat3.name, es: talentsJsonEs.combat3.name },
            info: { en: talentsJsonEn.combat3.info, es: talentsJsonEs.combat3.info },
            src: '',
          },
          passive1: {
            name: { en: talentsJsonEn.passive1.name, es: talentsJsonEs.passive1.name },
            info: { en: talentsJsonEn.passive1.info, es: talentsJsonEs.passive1.info },
            src: '',
          },
          passive2: {
            name: { en: talentsJsonEn.passive2.name, es: talentsJsonEs.passive2.name },
            info: { en: talentsJsonEn.passive2.info, es: talentsJsonEs.passive2.info },
            src: '',
          },
          passive3: {
            name: { en: talentsJsonEn.passive3.name, es: talentsJsonEs.passive3.name },
            info: { en: talentsJsonEn.passive3.info, es: talentsJsonEs.passive3.info },
            src: '',
          },
          ...(talentsJsonEn.passive4?.name && talentsJsonEn.passive4?.info && {
            passive4: {
              name: { en: talentsJsonEn.passive4.name, es: talentsJsonEs.passive4.name },
              info: { en: talentsJsonEn.passive4.info, es: talentsJsonEs.passive4.info },
              src: '',
            },
          }),
          c1: {
            name: { en: constellationsJsonEn.c1.name, es: constellationsJsonEs.c1.name },
            effect: { en: constellationsJsonEn.c1.effect, es: constellationsJsonEs.c1.effect },
            src: '',
          },
          c2: {
            name: { en: constellationsJsonEn.c2.name, es: constellationsJsonEs.c2.name },
            effect: { en: constellationsJsonEn.c2.effect, es: constellationsJsonEs.c2.effect },
            src: '',
          },
          c3: {
            name: { en: constellationsJsonEn.c3.name, es: constellationsJsonEs.c3.name },
            effect: { en: constellationsJsonEn.c3.effect, es: constellationsJsonEs.c3.effect },
            src: '',
          },
          c4: {
            name: { en: constellationsJsonEn.c4.name, es: constellationsJsonEs.c4.name },
            effect: { en: constellationsJsonEn.c4.effect, es: constellationsJsonEs.c4.effect },
            src: '',
          },
          c5: {
            name: { en: constellationsJsonEn.c5.name, es: constellationsJsonEs.c5.name },
            effect: { en: constellationsJsonEn.c5.effect, es: constellationsJsonEs.c5.effect },
            src: '',
          },
          c6: {
            name: { en: constellationsJsonEn.c6.name, es: constellationsJsonEs.c6.name },
            effect: { en: constellationsJsonEn.c6.effect, es: constellationsJsonEs.c6.effect },
            src: '',
          },
        },
      };

      if (localData[slug].constellation.en !== localData[slug].constellation.es) {
        console.log(localData[slug].constellation.es);
        console.log(localData[slug].constellation.en);
      }

      // const characterJsonEs = await import(`${GDB_DIR}/src/data/Spanish/characters/${charFile.name}`);
      // console.log(characterJsonEn, characterJsonEs);
      // console.log(charFile.name);
    }
    writeTo(CHARS_DATA_PATH, localData);
  } catch (err) {
    console.error(err);
  }
};
