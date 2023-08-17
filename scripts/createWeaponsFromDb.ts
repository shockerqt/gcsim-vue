#!/usr/bin/env vite-node --script

import { opendir, readFile } from 'fs/promises';
import { paths, writeData } from './utils.js';

export const createWeaponsFromDb = async (save = false) => {
  try {
    const weaponsData: DataWeapon[] = [];
    const weaponFiles = await opendir(`${paths.GDB}/src/data/English/weapons`);

    const weaponsBasestats = JSON.parse(
      await readFile(`${paths.DATA}/weaponsDataBasestats.json`, 'utf-8'),
    );

    for await (const weaponFile of weaponFiles) {
      const weaponFileName = weaponFile.name.split('.')[0];
      if (!(weaponFileName in weaponsBasestats)) {
        console.log(weaponFileName);
        continue;
      }

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
          atk: weaponsBasestats[weaponFileName].baseStats,
          ...(weaponJsonEn.substat && {
            substat: weaponsBasestats[weaponFileName].substats,
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

createWeaponsFromDb(true);
