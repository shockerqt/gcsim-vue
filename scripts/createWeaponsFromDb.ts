#!/usr/bin/env vite-node --script

import { opendir, readFile } from 'fs/promises';
import { paths, writeData } from './utils.js';

export const createWeaponsFromDb = async (save = false) => {
  try {
    const weaponsData: DataWeapon[] = [];
    const weaponFiles = await opendir(`${paths.GDB}/src/data/English/weapons`);

    for await (const weaponFile of weaponFiles) {
      const weaponFileName = weaponFile.name.split('.')[0];

      const weaponJsonEn = JSON.parse(
        await readFile(
          `${paths.GDB}/src/data/English/weapons/${weaponFileName}.json`,
          'utf-8',
        ),
      );

      const weaponJsonEs = JSON.parse(
        await readFile(
          `${paths.GDB}/src/data/Spanish/weapons/${weaponFileName}.json`,
          'utf-8',
        ),
      );

      weaponsData.push({
        slug: weaponFileName,
        name: {
          en: weaponJsonEn.name,
          es: weaponJsonEs.name,
        },
        description: {
          en: weaponJsonEn.description,
          es: weaponJsonEs.description,
        },
        rarity: parseInt(weaponJsonEn.rarity),
        ...(weaponJsonEn.effect &&
          weaponJsonEn.effectname && {
            effect: {
              en: weaponJsonEn.effect,
              es: weaponJsonEs.effect,
            },
            effectName: {
              en: weaponJsonEn.effectname,
              es: weaponJsonEs.effectname,
            },
          }),
        lore: {
          en: weaponJsonEn.story,
          es: weaponJsonEs.story,
        },
        ...(weaponJsonEn.substat && {
          substat: weaponJsonEn.substat,
        }),
        baseStats: {
          atk: [],
          ...(weaponJsonEn.substat && {
            substat: [],
          }),
        },
        images: {
          portrait: {
            info: {
              en: 'portrait',
              es: 'retrato',
            },
            name: {
              en: 'portrait',
              es: 'retrato',
            },
            src: '',
          },
        },
        ...(weaponJsonEn.r1 &&
          weaponJsonEn.r1.length > 0 &&
          weaponJsonEn.r2 &&
          weaponJsonEn.r2.length > 0 &&
          weaponJsonEn.r3 &&
          weaponJsonEn.r3.length > 0 &&
          weaponJsonEn.r4 &&
          weaponJsonEn.r4.length > 0 &&
          weaponJsonEn.r5 &&
          weaponJsonEn.r5.length > 0 && {
            // r1: weaponJsonEn.r1.map(
            //   (percentage: string) => parseFloat(percentage) / 100,
            // ),
            // r2: weaponJsonEn.r2.map(
            //   (percentage: string) => parseFloat(percentage) / 100,
            // ),
            // r3: weaponJsonEn.r3.map(
            //   (percentage: string) => parseFloat(percentage) / 100,
            // ),
            // r4: weaponJsonEn.r4.map(
            //   (percentage: string) => parseFloat(percentage) / 100,
            // ),
            // r5: weaponJsonEn.r5.map(
            //   (percentage: string) => parseFloat(percentage) / 100,
            // ),
            r1: weaponJsonEn.r1,
            r2: weaponJsonEn.r2,
            r3: weaponJsonEn.r3,
            r4: weaponJsonEn.r4,
            r5: weaponJsonEn.r5,
          }),
        weapontype: {
          en: weaponJsonEn.weapontype,
          es: weaponJsonEs.weapontype,
        },
      });
    }

    weaponsData.sort((a, b) => a.slug.localeCompare(b.slug));
    const localData: Record<string, DataWeapon> = {};
    weaponsData.forEach((weapon) => {
      localData[weapon.slug] = weapon;
    });
    if (save) {
      writeData('weaponsDataFromDb', localData);
    }
    return localData;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Extract data fron 'genshin-db' repository and
 * generate a json file with an array of {@link DataCharacter}.
 */
// export const createCharactersFromDb = async (save = false) => {
//   try {
//     const charactersData: DataCharacter[] = [];
//     const charFiles = await opendir(`${paths.GDB}/src/data/English/talents`);
//     for await (const charFile of charFiles) {
//       let charactersFilename = charFile.name;
//       const talentsFilename = charFile.name;
//       const constellationsFilename = charFile.name;
//       if (
//         charFile.name === 'traveleranemo.json' ||
//         charFile.name === 'travelerdendro.json' ||
//         charFile.name === 'travelerelectro.json' ||
//         charFile.name === 'travelergeo.json'
//       ) {
//         charactersFilename = 'aether.json';
//       }
//       const characterJsonEn = {
//         ...(await import(
//           `${paths.GDB}/src/data/English/characters/${charactersFilename}`,
//           { assert: { type: 'json' } }
//         )),
//       };
//       const characterJsonEs = {
//         ...(await import(
//           `${paths.GDB}/src/data/Spanish/characters/${charactersFilename}`,
//           { assert: { type: 'json' } }
//         )),
//       };
//       const talentsJsonEn = await import(
//         `${paths.GDB}/src/data/English/talents/${talentsFilename}`,
//         { assert: { type: 'json' } }
//       );
//       const talentsJsonEs = await import(
//         `${paths.GDB}/src/data/Spanish/talents/${talentsFilename}`,
//         { assert: { type: 'json' } }
//       );
//       const constellationsJsonEn = await import(
//         `${paths.GDB}/src/data/English/constellations/${constellationsFilename}`,
//         { assert: { type: 'json' } }
//       );
//       const constellationsJsonEs = await import(
//         `${paths.GDB}/src/data/Spanish/constellations/${constellationsFilename}`,
//         { assert: { type: 'json' } }
//       );
//       if (charactersFilename === 'aether.json') {
//         switch (charFile.name) {
//           case 'traveleranemo.json':
//             characterJsonEn.element = 'Anemo';
//             characterJsonEs.element = 'Anemo';
//             break;
//           case 'travelerdendro.json':
//             characterJsonEn.element = 'Dendro';
//             characterJsonEs.element = 'Dendro';
//             break;
//           case 'travelerelectro.json':
//             characterJsonEn.element = 'Electro';
//             characterJsonEs.element = 'Electro';
//             break;
//           case 'travelergeo.json':
//             characterJsonEn.element = 'Geo';
//             characterJsonEs.element = 'Geo';
//         }
//         characterJsonEn.name = `Traveler ${characterJsonEn.element}`;
//         characterJsonEs.name = `Viajero ${characterJsonEs.element}`;
//       }
//       const slug = slugify(characterJsonEn.name);
//       const characterData: DataCharacter = {
//         slug,
//         simName: slug.replace(/-/g, ''),
//         name: { en: characterJsonEn.name, es: characterJsonEs.name },
//         title: { en: characterJsonEn.title, es: characterJsonEs.title },
//         rarity: parseInt(characterJsonEn.rarity),
//         element: { en: characterJsonEn.element, es: characterJsonEs.element },
//         weapontype: {
//           en: characterJsonEn.weapontype,
//           es: characterJsonEs.weapontype,
//         },
//         substat: { en: characterJsonEn.substat, es: characterJsonEs.substat },
//         constellation: {
//           en: characterJsonEn.constellation,
//           es: characterJsonEs.constellation,
//         },
//         baseStats: {
//           hp: Array.from({ length: 14 }, () => 0),
//           atk: Array.from({ length: 14 }, () => 0),
//           def: Array.from({ length: 14 }, () => 0),
//           critRate: Array.from({ length: 14 }, () => 0.05),
//           critDmg: Array.from({ length: 14 }, () => 0.5),
//           substat: Array.from({ length: 14 }, () => 0),
//         },
//         images: {
//           portrait: {
//             name: {
//               en: 'portrait',
//               es: 'retrato',
//             },
//             info: {
//               en: `Image ${characterJsonEn.name}`,
//               es: `Imagen ${characterJsonEs.name}`,
//             },
//             src: '',
//           },
//           splashart: {
//             name: {
//               en: 'splashart',
//               es: 'splashart',
//             },
//             info: {
//               en: `Splash Art ${characterJsonEn.name}`,
//               es: `Splash Art ${characterJsonEs.name}`,
//             },
//             src: '',
//           },
//           combat1: {
//             name: {
//               en: talentsJsonEn.combat1.name,
//               es: talentsJsonEs.combat1.name,
//             },
//             info: {
//               en: talentsJsonEn.combat1.info,
//               es: talentsJsonEs.combat1.info,
//             },
//             src: '',
//           },
//           combat2: {
//             name: {
//               en: talentsJsonEn.combat2.name,
//               es: talentsJsonEs.combat2.name,
//             },
//             info: {
//               en: talentsJsonEn.combat2.info,
//               es: talentsJsonEs.combat2.info,
//             },
//             src: '',
//           },
//           ...(talentsJsonEn.combatsp && {
//             combatsp: {
//               name: {
//                 en: talentsJsonEn.combatsp.name,
//                 es: talentsJsonEs.combatsp.name,
//               },
//               info: {
//                 en: talentsJsonEn.combatsp.info,
//                 es: talentsJsonEs.combatsp.info,
//               },
//               src: '',
//             },
//           }),
//           combat3: {
//             name: {
//               en: talentsJsonEn.combat3.name,
//               es: talentsJsonEs.combat3.name,
//             },
//             info: {
//               en: talentsJsonEn.combat3.info,
//               es: talentsJsonEs.combat3.info,
//             },
//             src: '',
//           },
//           passive1: {
//             name: {
//               en: talentsJsonEn.passive1.name,
//               es: talentsJsonEs.passive1.name,
//             },
//             info: {
//               en: talentsJsonEn.passive1.info,
//               es: talentsJsonEs.passive1.info,
//             },
//             src: '',
//           },
//           passive2: {
//             name: {
//               en: talentsJsonEn.passive2.name,
//               es: talentsJsonEs.passive2.name,
//             },
//             info: {
//               en: talentsJsonEn.passive2.info,
//               es: talentsJsonEs.passive2.info,
//             },
//             src: '',
//           },
//           ...(talentsJsonEn.passive3?.name &&
//             talentsJsonEn.passive3?.info && {
//               passive3: {
//                 name: {
//                   en: talentsJsonEn.passive3.name,
//                   es: talentsJsonEs.passive3.name,
//                 },
//                 info: {
//                   en: talentsJsonEn.passive3.info,
//                   es: talentsJsonEs.passive3.info,
//                 },
//                 src: '',
//               },
//             }),
//           ...(talentsJsonEn.passive4?.name &&
//             talentsJsonEn.passive4?.info && {
//               passive4: {
//                 name: {
//                   en: talentsJsonEn.passive4.name,
//                   es: talentsJsonEs.passive4.name,
//                 },
//                 info: {
//                   en: talentsJsonEn.passive4.info,
//                   es: talentsJsonEs.passive4.info,
//                 },
//                 src: '',
//               },
//             }),
//           c1: {
//             name: {
//               en: constellationsJsonEn.c1.name,
//               es: constellationsJsonEs.c1.name,
//             },
//             info: {
//               en: constellationsJsonEn.c1.effect,
//               es: constellationsJsonEs.c1.effect,
//             },
//             src: '',
//           },
//           c2: {
//             name: {
//               en: constellationsJsonEn.c2.name,
//               es: constellationsJsonEs.c2.name,
//             },
//             info: {
//               en: constellationsJsonEn.c2.effect,
//               es: constellationsJsonEs.c2.effect,
//             },
//             src: '',
//           },
//           c3: {
//             name: {
//               en: constellationsJsonEn.c3.name,
//               es: constellationsJsonEs.c3.name,
//             },
//             info: {
//               en: constellationsJsonEn.c3.effect,
//               es: constellationsJsonEs.c3.effect,
//             },
//             src: '',
//           },
//           c4: {
//             name: {
//               en: constellationsJsonEn.c4.name,
//               es: constellationsJsonEs.c4.name,
//             },
//             info: {
//               en: constellationsJsonEn.c4.effect,
//               es: constellationsJsonEs.c4.effect,
//             },
//             src: '',
//           },
//           c5: {
//             name: {
//               en: constellationsJsonEn.c5.name,
//               es: constellationsJsonEs.c5.name,
//             },
//             info: {
//               en: constellationsJsonEn.c5.effect,
//               es: constellationsJsonEs.c5.effect,
//             },
//             src: '',
//           },
//           c6: {
//             name: {
//               en: constellationsJsonEn.c6.name,
//               es: constellationsJsonEs.c6.name,
//             },
//             info: {
//               en: constellationsJsonEn.c6.effect,
//               es: constellationsJsonEs.c6.effect,
//             },
//             src: '',
//           },
//         },
//       };
//       charactersData.push(characterData);
//     }

//     charactersData.sort((a, b) => a.slug.localeCompare(b.slug));
//     const localData: DataCharacters = {};
//     charactersData.forEach((character) => {
//       localData[character.slug] = character;
//     });
//     if (save) {
//       writeData('charactersDataFromDb', localData);
//     }
//     return localData;
//   } catch (err) {
//     console.error(err);
//   }
// };
