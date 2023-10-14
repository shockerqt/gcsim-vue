#!/usr/bin/env vite-node --script

import { opendir, readFile } from 'fs/promises';
import { paths, writeData } from './utils.js';

const relicTypeSlugs = [
  'flower',
  'plume',
  'sands',
  'goblet',
  'circlet'
];

export const createArtifactsFromDb = async (save = false) => {
  try {
    const data: DataArtifact[] = [];
    const files = await opendir(`${paths.GDB}/src/data/English/artifacts`);

    for await (const weaponFile of files) {
      const fileName = weaponFile.name.split('.')[0];

      const artifactJsonEn = JSON.parse(
        await readFile(
          `${paths.GDB}/src/data/English/artifacts/${fileName}.json`,
          'utf-8',
        ),
      );

      const artifactJsonEs = JSON.parse(
        await readFile(
          `${paths.GDB}/src/data/Spanish/artifacts/${fileName}.json`,
          'utf-8',
        ),
      );

      const artifactRarities = artifactJsonEn.rarity;

      for (const rarity of artifactRarities) {
        if (rarity < 4) continue;

        for (const relicTypeSlug of relicTypeSlugs) {
          if (!(relicTypeSlug in artifactJsonEn)) continue;

          data.push({
            slug: `${fileName}${relicTypeSlug}`,
            name: {
              en: artifactJsonEn[relicTypeSlug].name,
              es: artifactJsonEs[relicTypeSlug].name,
            },
            relicType: {
              en: artifactJsonEn[relicTypeSlug].relictype,
              es: artifactJsonEs[relicTypeSlug].relictype,
            },
            set: {
              slug: fileName,
              name: {
                en: artifactJsonEn.name,
                es: artifactJsonEs.name,
              },
              rarity,
              twoPiecesBonus: {
                en: artifactJsonEn['2pc'],
                es: artifactJsonEs['2pc'],
              },
              fourPiecesBonus: {
                en: artifactJsonEn['4pc'],
                es: artifactJsonEs['4pc'],
              },
            },
            description: {
              en: artifactJsonEn[relicTypeSlug].description,
              es: artifactJsonEs[relicTypeSlug].description,
            },
            story: {
              en: artifactJsonEn[relicTypeSlug].story,
              es: artifactJsonEs[relicTypeSlug].story,
            },
          });

        }
      }
    }

    data.sort((a, b) => a.slug.localeCompare(b.slug));
    const localData: Record<string, DataArtifact> = {};
    data.forEach((entry) => {
      localData[entry.slug] = entry;
      console.log(entry);
    });
    if (save) {
      writeData('artifactsDataFromDb', localData);
    }
    return localData;
  } catch (error) {
    console.error(error);
  }
};

