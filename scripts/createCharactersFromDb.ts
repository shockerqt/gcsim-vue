import { opendir } from 'fs/promises';
import { paths, slugify, writeData } from './utils.js';

// export interface CharacterData {
//   slug: string;
//   name: I18n;
//   title: I18n;
//   rarity: number;
//   element: I18n;
//   weapontype: I18n;
//   substat: I18n;
//   constellation: I18n;
//   baseStats: {
//     lvls: string[];
//     hp: number[];
//     atk: number[];
//     def: number[];
//     critRate: number[];
//     critDmg: number[];
//     substat: number[];
//   };
//   images: {
//     portrait: Image;
//     splashart: Image;
//     combat1: Image;
//     combat2: Image;
//     combat3: Image;
//     combatsp?: Image;
//     passive1: Image;
//     passive2: Image;
//     passive3: Image;
//     passive4?: Image;
//     c1: Image;
//     c2: Image;
//     c3: Image;
//     c4: Image;
//     c5: Image;
//     c6: Image;
//   };
// }

/**
 * Extract data fron 'genshin-db' repository and
 * generate a json file with an array of {@link DataCharacter}.
 */
export const createCharactersFromDb = async (save = false) => {
  try {
    const charactersData: DataCharacter[] = [];
    const charFiles = await opendir(`${paths.GDB}/src/data/English/talents`);
    for await (const charFile of charFiles) {
      let charactersFilename = charFile.name;
      const talentsFilename = charFile.name;
      const constellationsFilename = charFile.name;
      if (
        charFile.name === 'traveleranemo.json' ||
        charFile.name === 'travelerdendro.json' ||
        charFile.name === 'travelerelectro.json' ||
        charFile.name === 'travelergeo.json'
      ) {
        charactersFilename = 'aether.json';
      }
      const characterJsonEn = { ...await import(`${paths.GDB}/src/data/English/characters/${charactersFilename}`, { assert: { type: 'json' } }) };
      const characterJsonEs = { ...await import(`${paths.GDB}/src/data/Spanish/characters/${charactersFilename}`, { assert: { type: 'json' } }) };
      const talentsJsonEn = await import(`${paths.GDB}/src/data/English/talents/${talentsFilename}`, { assert: { type: 'json' } });
      const talentsJsonEs = await import(`${paths.GDB}/src/data/Spanish/talents/${talentsFilename}`, { assert: { type: 'json' } });
      const constellationsJsonEn = await import(`${paths.GDB}/src/data/English/constellations/${constellationsFilename}`, { assert: { type: 'json' } });
      const constellationsJsonEs = await import(`${paths.GDB}/src/data/Spanish/constellations/${constellationsFilename}`, { assert: { type: 'json' } });
      if (charactersFilename === 'aether.json') {
        switch (charFile.name) {
          case 'traveleranemo.json':
            characterJsonEn.element = 'Anemo';
            characterJsonEs.element = 'Anemo';
            break;
          case 'travelerdendro.json':
            characterJsonEn.element = 'Dendro';
            characterJsonEs.element = 'Dendro';
            break;
          case 'travelerelectro.json':
            characterJsonEn.element = 'Electro';
            characterJsonEs.element = 'Electro';
            break;
          case 'travelergeo.json':
            characterJsonEn.element = 'Geo';
            characterJsonEs.element = 'Geo';
        }
        characterJsonEn.name = `Traveler ${characterJsonEn.element}`;
        characterJsonEs.name = `Viajero ${characterJsonEs.element}`;
      }
      const slug = slugify(characterJsonEn.name);
      const characterData = {
        slug,
        simName: slug.replace(/-/g, ''),
        name: { en: characterJsonEn.name, es: characterJsonEs.name },
        title: { en: characterJsonEn.title, es: characterJsonEs.title },
        rarity: parseInt(characterJsonEn.rarity),
        element: { en: characterJsonEn.element, es: characterJsonEs.element },
        weapontype: { en: characterJsonEn.weapontype, es: characterJsonEs.weapontype },
        substat: { en: characterJsonEn.substat, es: characterJsonEs.substat },
        constellation: { en: characterJsonEn.constellation, es: characterJsonEs.constellation },
        baseStats: {
          lvls: ['1/20', '20', '20/40', '40', '40/50', '50', '50/60', '60', '60/70', '70', '70/80', '80', '80/90', '90/90'],
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
          ...(talentsJsonEn.passive3?.name && talentsJsonEn.passive3?.info && {
            passive3: {
              name: { en: talentsJsonEn.passive3.name, es: talentsJsonEs.passive3.name },
              info: { en: talentsJsonEn.passive3.info, es: talentsJsonEs.passive3.info },
              src: '',
            },
          }),
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
      charactersData.push(characterData);
    }

    charactersData.sort((a, b) => a.slug.localeCompare(b.slug));
    const localData: DataCharacters = {};
    charactersData.forEach((character) => { localData[character.slug] = character; });
    if (save) { writeData('charactersDataFromDb', localData); }
    return localData;
  } catch (err) {
    console.error(err);
  }
};
