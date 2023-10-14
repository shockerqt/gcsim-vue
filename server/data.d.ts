type I18n = {
  en: string;
  es: string;
};

type Image = {
  name: I18n;
  info: I18n;
  src: string;
};

type DataCharacters = Record<string, DataCharacter>;

interface DataCharacter {
  slug: string;
  name: I18n;
  simName: string;
  title: I18n;
  rarity: number;
  element: I18n;
  weapontype: I18n;
  substat: I18n;
  constellation: I18n;
  baseStats: {
    hp: number[];
    atk: number[];
    def: number[];
    critRate: number[];
    critDmg: number[];
    substat: number[];
  };
  images: {
    portrait: Image;
    splashart: Image;
    combat1: Image;
    combat2: Image;
    combat3: Image;
    combatsp?: Image;
    passive1: Image;
    passive2: Image;
    passive3: Image;
    passive4?: Image;
    c1: Image;
    c2: Image;
    c3: Image;
    c4: Image;
    c5: Image;
    c6: Image;
  };
}

type DataWeapons = Record<string, DataWeapon>;

interface DataWeapon {
  slug: string;
  name: I18n;
  effect?: I18n;
  effectName?: I18n;
  description: I18n;
  weapontype: I18n;
  rarity: number;
  lore: I18n;
  substat: string;
  baseStats: {
    atk: number[];
    substat?: number[];
  };
  r1?: [number, number];
  r2?: [number, number];
  r3?: [number, number];
  r4?: [number, number];
  r5?: [number, number];
  images: {
    portrait: Image;
  };
}

interface DataArtifactSet {
  slug: string;
  name: I18n;
  rarity: 4 | 5;
  twoPiecesBonus: I18n;
  fourPiecesBonus: I18n;
}

interface DataArtifactRelictType {
  slug: string;
  name: I18n;
}

interface DataArtifactStatName {
  slug: string;
  name: I18n;
}

interface DataArtifact {
  slug: string;
  name: I18n;
  set: DataArtifactSet;
  relicType: I18n;
  description: I18n;
  story: I18n;
  mainStat?: DataArtifactMainStat;
  image?: Image;
}

interface DataArtifactRelicTypeMainStat {
  relictType: DataArtifactRelictType;
  mainStat: DataArtifactMainStat[];
}

interface DataArtifactMainStat {
  name: DataArtifactStatName;
  rarity: 4 | 5;
  values: number[];
}



