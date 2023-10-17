type ArtifactSet = {
  slug: string;
}

type Artifact = {
  name: string;
  slug: string;
  lvl: number;
  rarity: number;
  set: ArtifactSet;
};

type Stats = {
  hp: number;
  atk: number;
  def: number;
  critRate: number;
  critDmg: number;
  substat: number;
};

type CharactersModal = { open: false } | { open: true; entryId: number };
type WeaponsModal =
  | { open: false }
  | { open: true; entryId: number; fixedWeapontype: string };
type ArtifactsModal =
  | { open: false }
  | { open: true; entryId: number; fixedArtifactType: string };

export interface SimulatorEntry {
  ui: {
    selectedArtifact: number | null;
  };
  character: {
    name: string;
    slug: string;
    simName: string;
    rarity: number;
    weapontype: string;
    substat: string;
    lvl: string;
    cons: number;
    c1: number;
    c2: number;
    c3: number;
    portraitImg: string;
  };
  weapon?: {
    name: string;
    slug: string;
    lvl: string;
    refine: number;
    rarity: number;
    mainStat: string;
    substat: string;
    weapontype: string;
    effect?: string;
    effectName?: string;
    baseStats: DataWeapon['baseStats'];
  };
  artifacts: (Artifact | null)[];
  stats: Stats;
}

export const useSimulator = () => {
  const lang = 'en';
  const entries = useState<(SimulatorEntry | null)[]>(
    'simulatorEntries',
    () => [null, null, null, null],
  );
  const selectedEntryIndex = useState<number | null>(
    'simulatorSelectedEntryIndex',
    () => null,
  );
  const selectedEntry = computed<SimulatorEntry | null>({
    get() {
      return (
        (selectedEntryIndex.value != null &&
          entries.value[selectedEntryIndex.value]) ||
        null
      );
    },
    set(value) {
      if (
        selectedEntryIndex.value != null &&
        entries.value[selectedEntryIndex.value]
      ) {
        entries.value[selectedEntryIndex.value] = value;
      }
    },
  });

  const selectCharacterModalState = useState<CharactersModal>(
    'simulatorSelectCharacterModal',
    () => ({ open: false }),
  );

  const selectWeaponModalState = useState<WeaponsModal>(
    'simulatorSelectWeaponModal',
    () => ({ open: false }),
  );

  const selectArtifactModalState = useState<ArtifactsModal>(
    'simulatorSelectArtifactModal',
    () => ({ open: false }),
  );

  const setCharacter = async (slug: string, index: number) => {
    // new character data
    const {
      data: { value: characterData },
    } = await useFetch(`/api/data/characters/${slug}`);

    if (!characterData) {
      throw createError("Couldn't find character on db");
    }

    // old character data
    const currentState = entries.value[index];

    entries.value[index] = {
      ui: {
        selectedArtifact: null,
      },
      character: {
        name: characterData.name[lang],
        slug,
        simName: characterData.simName,
        substat: characterData.substat[lang],
        weapontype: characterData.weapontype[lang],
        rarity: characterData.rarity,
        lvl: '90/90',
        cons: characterData.rarity === 4 ? 6 : 0,
        c1: currentState?.character.c1 || 9,
        c2: currentState?.character.c2 || 9,
        c3: currentState?.character.c3 || 9,
        portraitImg: characterData.images.portrait.src,
      },
      weapon: currentState?.weapon?.weapontype === characterData.weapontype[lang] ? currentState.weapon : undefined,
      artifacts: [null, null, null, null, null],
      stats: {
        hp: characterData.baseStats.hp[characterData.baseStats.hp.length - 1],
        atk: characterData.baseStats.atk[
          characterData.baseStats.atk.length - 1
        ],
        def: characterData.baseStats.def[
          characterData.baseStats.def.length - 1
        ],
        critRate:
          characterData.baseStats.critRate[
          characterData.baseStats.critRate.length - 1
          ],
        critDmg:
          characterData.baseStats.critDmg[
          characterData.baseStats.critDmg.length - 1
          ],
        substat:
          characterData.baseStats.substat[
          characterData.baseStats.substat.length - 1
          ],
      },
    };
  };

  const setWeapon = async (slug: string, index: number) => {
    // old weapon data
    const currentState = entries.value[index];

    if (!currentState) {
      throw createError('No character selected');
    }

    // new weapon data
    const {
      data: { value: weaponData },
    } = await useFetch<DataWeapon>(`/api/data/weapons/${slug}`);
    if (!weaponData) {
      throw createError("Couldn't find weapon on db");
    }

    entries.value[index] = {
      ...currentState,
      weapon: {
        name: weaponData.name[lang],
        slug: weaponData.slug,
        lvl: currentState?.weapon?.lvl ?? '90/90',
        refine: currentState?.weapon?.refine ?? 1,
        rarity: weaponData.rarity,
        weapontype: weaponData.weapontype[lang],
        mainStat: 'atk',
        substat: 'er',
        effect: weaponData.effect?.[lang],
        effectName: weaponData.effectName?.[lang],
        baseStats: weaponData.baseStats,
      },
    };
  };

  const setArtifact = async (slug: string, characterEntryIndex: number, artifactEntryIndex: number) => {
    // old weapon data
    const selectedEntry = entries.value[characterEntryIndex];

    if (!selectedEntry) {
      throw createError('No character selected');
    }

    // new weapon data
    const {
      data: { value: artifactData },
    } = await useFetch<DataArtifact>(`/api/data/artifacts/${slug}`);
    if (!artifactData) {
      throw createError("Couldn't find weapon on db");
    }

    const currentArtifacts = selectedEntry.artifacts;
    currentArtifacts[artifactEntryIndex] = {
      name: artifactData.name[lang],
      slug: artifactData.slug,
      lvl: 20,
      rarity: artifactData.set.rarity,
      set: {
        slug: artifactData.set.slug,
      },
    };

    entries.value[characterEntryIndex] = {
      ...selectedEntry,
      artifacts: currentArtifacts,
    };
  };

  const openSelectCharacterModal = (id: number) => {
    selectCharacterModalState.value = {
      open: true,
      entryId: id,
    };
  };

  const openSelectWeaponModal = (id: number) => {
    const entry = entries.value[id];
    if (entry != null) {
      selectWeaponModalState.value = {
        open: true,
        entryId: id,
        fixedWeapontype: entry.character.weapontype,
      };
    }
  };

  const openSelectArtifactModal = (id: number) => {
    const entry = entries.value[id];
    if (entry != null) {
      selectArtifactModalState.value = {
        open: true,
        entryId: id,
        fixedArtifactType: entry.character.weapontype,
      };
    }
  };

  const handleOnClickArtifactEntry = (id: number, index: number) => {
    const entry = entries.value[id];
    if (entry == null) return;
    entry.ui.selectedArtifact = index;
    if (entry.artifacts[index] == null) {
      openSelectArtifactModal(id);
    }
  };


  return {
    handleOnClickArtifactEntry,
    entries,
    setCharacter,
    setWeapon,
    setArtifact,
    openSelectCharacterModal,
    openSelectWeaponModal,
    openSelectArtifactModal,
    selectCharacterModalState,
    selectWeaponModalState,
    selectArtifactModalState,
    selectedEntry,
    selectedEntryIndex,
  };
};

// const generateConfig = (state: (SimulatorEntry | null)[]) => {
//   const entry = state[0] as SimulatorEntry;

//   const artifacts = () => {
//     return entry.artifacts.map(artifact =>
//       artifact ? `${artifact.mainStat}=${artifact.mainStatValue} ` : '');
//   };

//   const sets = () => {
//     return entry.artifactsSets.map(set => (
//       `${entry.character.name} add set="${set.name}" count=${set.count};`
//     ));
//   };

//   const substats = () => {
//     return 'def%=0.124 def=39.36 hp=507.88 hp%=0.0992 atk=33.08 atk%=0.1984 er=0.1102 em=39.64 cr=0.3972 cd=0.662';
//   };

//   const template = `
// ${entry.character.name} char lvl=${entry.character.lvl} cons=${entry.character.cons} talent=${entry.character.c1},${entry.character.c2},${entry.character.c3};
// ${entry.character.name} add weapon="${entry.weapon.name}" refine=${entry.weapon.refine} lvl=${entry.weapon.lvl};
// ${sets().join('\n')}
// ${entry.character.name} add stats ${artifacts().join(' ')};
// ${entry.character.name} add stats ${substats()};
// `;

//   return template;
// };
