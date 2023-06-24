import genshinDb from 'genshin-db'
import fs from 'fs'

function writeTo(path, object) {
  fs.writeFile(new URL(`assets/${path}`, import.meta.url), JSON.stringify(object), { flag: 'w' }, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}


genshinDb.setOptions({ queryLanguages: ['English', 'Spanish'] })
const dbCharacter = genshinDb.characters("names", {"matchCategories":true,"verboseCategories":true,"queryLanguages":["English","Spanish"]});

// export characters
const characters = [];
for (const character of dbCharacter) {
  characters.push(
    {
      name: character.name,
      rarity: character.rarity,
      weapontype: character.weapontype,
      element: character.element,
      imgSrc: character.images.icon,
      slug: character.name.replace(' ', '_'),
      splash: character.images.
    }
  );
}

writeTo('characters.json', characters);

for (const character of dbCharacter) {
  const charInfo = genshinDb.characters(character.name, {"verboseCategories":true});
  const talents = genshinDb.talents(character.name, {"verboseCategories":true});
  const data = { character: charInfo, talents };
  
  writeTo(`charactersData/${character.name.replace(' ', '_')}.json`, data);
}


console.log(characters)


// genshinDb.characters("names", {"matchCategories":true,"verboseCategories":true,"queryLanguages":["English","Spanish"]});
// genshinDb.talents("names", {"matchCategories":true,"verboseCategories":true,"queryLanguages":["English","Spanish"]});
// genshinDb.constellations("names", {"matchCategories":true,"verboseCategories":true,"queryLanguages":["English","Spanish"]});
// genshinDb.weapons("names", {"matchCategories":true,"verboseCategories":true,"queryLanguages":["English","Spanish"]});


// https://upload-os-bbs.mihoyo.com/game_record/genshin/equip/UI_EquipIcon_Claymore_Maria.png
