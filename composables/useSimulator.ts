type ArtifactsSet = {
  name: string;
  count: number;
}

type Artifact = {
  name: string;
  lvl: number;
  rarity: number;
  mainStat: string;
  mainStatValue: number;
  substats: Record<string, number>;
};

type Stats = {
  hp: number;
  atk: number;
  def: number;
  critRate: number;
  critDmg: number;
  substat: number;
}

export interface SimulatorEntry {
  ui: {
    selectedArtifact: number | null;
  },
  character: {
    name: string;
    slug: string;
    simName: string;
    rarity: number;
    substat: string;
    lvl: string;
    cons: number;
    c1: number;
    c2: number;
    c3: number;
    portraitImg: string;
  };
  weapon: {
    name: string,
    lvl: string,
    refine: number,
  };
  artifactsSets: ArtifactsSet[];
  artifacts: (Artifact | null)[];
  stats: Stats;
}

export const useSimulator = () => {
  const lang = 'en';
  const state = useState<(SimulatorEntry | null)[]>('simulator-state', () => [null, null, null, null]);
  const active = useState<number | null>('simulator-selected-entry', () => null);

  const setCharacter = async (slug: string) => {
    console.log(active.value, 'SET CHARACTER');
    if (active.value === null) { return; }
    // new character data
    const { data: { value: characterData } } = await useFetch(`/api/data/characters/${slug}`);
    console.log('setCharacter', characterData);
    if (!characterData) { throw createError('Couldn\'t find character on db'); }
    const baseStatsIndex = characterData.baseStats.lvls.length - 1;
    // old character data
    const currentState = state.value[active.value]!;
    state.value[active.value] = {
      ui: {
        selectedArtifact: null,
      },
      character: {
        name: characterData.name[lang],
        slug,
        simName: characterData.simName,
        substat: characterData.substat[lang],
        rarity: characterData.rarity,
        lvl: currentState.character.lvl || characterData.baseStats.lvls[baseStatsIndex],
        cons: characterData.rarity === 4 ? 6 : 0,
        c1: currentState.character.c1,
        c2: currentState.character.c2,
        c3: currentState.character.c3,
        portraitImg: characterData.images.portrait.src,
      },
      weapon: {
        name: 'favoniussword',
        lvl: currentState.weapon.lvl,
        refine: 1,
      },
      artifactsSets: [
      ],
      artifacts: [
        null,
        null,
        null,
        null,
        null,
      ],
      stats: {
        hp: characterData.baseStats.hp[baseStatsIndex],
        atk: characterData.baseStats.atk[baseStatsIndex],
        def: characterData.baseStats.def[baseStatsIndex],
        critRate: characterData.baseStats.critRate[baseStatsIndex],
        critDmg: characterData.baseStats.critDmg[baseStatsIndex],
        substat: characterData.baseStats.substat[baseStatsIndex],
      },
    };
  };

  const createEntry = async (n: number, characterSlug = 'albedo') => {
    const { data: { value: characterData } } = await useFetch(`/api/data/characters/${characterSlug}`);
    if (!characterData) { throw createError('Couldn\'t find character on db'); }
    const baseStatsIndex = characterData.baseStats.lvls.length - 1;

    state.value[n] = {
      ui: {
        selectedArtifact: null,
      },
      character: {
        name: characterData.name[lang],
        slug: characterSlug,
        simName: characterData.simName,
        substat: characterData.substat[lang],
        rarity: characterData.rarity,
        lvl: characterData.baseStats.lvls[baseStatsIndex],
        cons: characterData.rarity === 4 ? 6 : 0,
        c1: 9,
        c2: 9,
        c3: 9,
        portraitImg: characterData.images.portrait.src,
      },
      weapon: {
        name: 'favoniussword',
        lvl: '90/90',
        refine: 1,
      },
      artifactsSets: [
      ],
      artifacts: [
        null,
        null,
        null,
        null,
        null,
      ],
      stats: {
        hp: characterData.baseStats.hp[baseStatsIndex],
        atk: characterData.baseStats.atk[baseStatsIndex],
        def: characterData.baseStats.def[baseStatsIndex],
        critRate: characterData.baseStats.critRate[baseStatsIndex],
        critDmg: characterData.baseStats.critDmg[baseStatsIndex],
        substat: characterData.baseStats.substat[baseStatsIndex],
      },
    };
  };

  return {
    state,
    config: () => generateConfig(state.value),
    createEntry,
    setCharacter,
    active,
  };
};

const generateConfig = (state: (SimulatorEntry | null)[]) => {
  const entry = state[0] as SimulatorEntry;

  const artifacts = () => {
    return entry.artifacts.map(artifact =>
      artifact ? `${artifact.mainStat}=${artifact.mainStatValue} ` : '');
  };

  const sets = () => {
    return entry.artifactsSets.map(set => (
      `${entry.character.name} add set="${set.name}" count=${set.count};`
    ));
  };

  const substats = () => {
    return 'def%=0.124 def=39.36 hp=507.88 hp%=0.0992 atk=33.08 atk%=0.1984 er=0.1102 em=39.64 cr=0.3972 cd=0.662';
  };

  const template = `
${entry.character.name} char lvl=${entry.character.lvl} cons=${entry.character.cons} talent=${entry.character.c1},${entry.character.c2},${entry.character.c3}; 
${entry.character.name} add weapon="${entry.weapon.name}" refine=${entry.weapon.refine} lvl=${entry.weapon.lvl};
${sets().join('\n')}
${entry.character.name} add stats ${artifacts().join(' ')};
${entry.character.name} add stats ${substats()};
`;

  return template;
};
