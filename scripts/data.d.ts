export type I18n = {
  en: string;
  es: string;
}

export type Image = {
  name: I18n;
  info: I18n;
  src: string;
}

export interface CharacterData {
  slug: string;
  name: I18n;
  title: I18n;
  rarity: number;
  element: I18n;
  weapontype: I18n;
  substat: I18n;
  constellation: I18n;
  baseStats: {
    lvls: string[];
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
