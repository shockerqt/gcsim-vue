<script lang="ts" setup>

interface CharacterGridItem {
  name: string;
  rarity: string;
  weapontype: string;
  element: string;
  imgSrc: string;
  slug: string;
  pinned?: boolean;
}

const { data } = await useFetch<CharacterGridItem[]>('/api/characters');

const textFilter = ref('');

const elementsFilterState = reactive({
  anemo: false,
  cryo: false,
  dendro: false,
  electro: false,
  geo: false,
  hydro: false,
  pyro: false,
  all: true,
});

const weaponsFilterState = reactive({
  bow: false,
  catalyst: false,
  claymore: false,
  polearm: false,
  sword: false,
  all: true,
});

const rarityFilterState = reactive({
  4: false,
  5: false,
  all: true,
});

const pinnedCharacter = computed(() => {
  const pinnedCharacter = textFilter.value.length > 1 && data?.value?.find(
    character =>
      character.name.toLowerCase().includes(textFilter.value.toLowerCase()),
  );
  return pinnedCharacter;
});

const elements = [
  {
    name: 'anemo',
    imgSrc: '/src/assets/Elements/Element_Anemo.svg',
  },
  {
    name: 'cryo',
    imgSrc: '/src/assets/Elements/Element_Cryo.svg',
  },
  {
    name: 'dendro',
    imgSrc: '/src/assets/Elements/Element_Dendro.svg',
  },
  {
    name: 'electro',
    imgSrc: '/src/assets/Elements/Element_Electro.svg',
  },
  {
    name: 'geo',
    imgSrc: '/src/assets/Elements/Element_Geo.svg',
  },
  {
    name: 'hydro',
    imgSrc: '/src/assets/Elements/Element_Hydro.svg',
  },
  {
    name: 'pyro',
    imgSrc: '/src/assets/Elements/Element_Pyro.svg',
  },
];

const weapons = ['bow', 'catalyst', 'claymore', 'polearm', 'sword'];

const rarities: [4, 5] = [4, 5];

const onClickFilterAllButton = (state: { [s: string]: boolean }) => {
  if (state.all === false) {
    // reset all elements values if all is clicked
    for (const key of Object.keys(state)) { state[key] = false; }
    state.all = true;
  }
};

const onClickFilterButton = (state: { [s: string]: boolean }, name: string) => {
  if (state.all) { state.all = false; }
  state[name] = !state[name];

  if (!Object.values(state).includes(true)) { state.all = true; }
};

const filterByElements = (characters: CharacterGridItem[]) => {
  if (elementsFilterState.all) {
    return characters;
  } else {
    const filteredCharacters: CharacterGridItem[] = [];
    const active: string[] = [];
    for (const [key, value] of Object.entries(elementsFilterState)) {
      if (value) { active.push(key as string); }
    }

    for (const character of characters) {
      if (
        active.includes(character.element.toLowerCase()) &&
        !filteredCharacters.includes(character)
      ) { filteredCharacters.push(character); }
    }

    return filteredCharacters;
  }
};

const filterByWeapons = (characters: CharacterGridItem[]) => {
  if (weaponsFilterState.all) {
    return characters;
  } else {
    const filteredCharacters: any[] = [];
    const active = [];
    for (const [key, value] of Object.entries(weaponsFilterState)) {
      if (value) { active.push(key); }
    }

    for (const character of characters) {
      if (
        active.includes(character.weapontype.toLowerCase()) &&
        !filteredCharacters.includes(character)
      ) { filteredCharacters.push(character); }
    }

    return filteredCharacters;
  }
};

const filterByRarity = (characters: CharacterGridItem[]) => {
  if (rarityFilterState.all) {
    return characters;
  } else {
    const filteredCharacters: any[] = [];
    const active = [];
    for (const [key, value] of Object.entries(rarityFilterState)) {
      if (value) { active.push(key); }
    }

    for (const character of characters) {
      if (active.includes(character.rarity) && !filteredCharacters.includes(character)) { filteredCharacters.push(character); }
    }

    return filteredCharacters;
  }
};

const cleanFilters = () => {
  onClickFilterAllButton(rarityFilterState);
  onClickFilterAllButton(elementsFilterState);
  onClickFilterAllButton(weaponsFilterState);
};

const filteredCharacters = computed(() => {
  let filteredCharacters = data?.value || [];
  filteredCharacters = filterByElements(filteredCharacters);
  filteredCharacters = filterByWeapons(filteredCharacters);
  filteredCharacters = filterByRarity(filteredCharacters);

  if (pinnedCharacter.value) {
    filteredCharacters = filteredCharacters.filter(character => character.name !== pinnedCharacter?.value?.name);
    filteredCharacters.unshift(pinnedCharacter.value);
  }

  return filteredCharacters;
});
</script>

<template>
  <div>
    <header class="max-w-5xl w-full p-8 m-auto">
      <!-- TITLE & DESCRIPTION -->
      <div class="row-span-2 my-2">
        <a class="text-black-100 text-xl font-bold my-1 hover:text-primary-100 active:text-primary-500">
          PERSONAJES
        </a>

        <!-- DESCRIPTION -->
        <p class="text-black-100 text-normal font-sm ">
          Utiliza nuestro sistema de filtrado para encontrar rápidamente tus personajes favoritos de
          Genshin Impact por elementos, rareza, arma y más. Personaliza tu búsqueda para obtener
          mejores resultados en segundos.
        </p>

        <!-- SEARCH INPUT -->
        <div class="grid grid-cols-[repeat(17,_1fr)] gap-2">
          <input
            v-model="textFilter"
            class="col-span-11 bg-black-600 text-black-100 text-sm rounded-lg border-black-500 focus:border-black-600 focus:ring-4 focus:ring-black-500 block w-full p-2.5 placeholder:text-black-500 placeholder:italic placeholder:text-black"
            type="text"
            placeholder="Busca el personaje"
          >

          <!-- CLEAN BUTTON -->
          <div
            class=" col-span-2 col-start-[16]"
          >
            <ButtonSecondary
              @click="cleanFilters"
            >
              Clean
            </ButtonSecondary>
          </div>
        </div>
      </div>

      <!-- TODOS LOS FILTROS -->
      <div class="grid grid-cols-[repeat(17,_1fr)] gap-2">
        <!-- RARITY FILTERS -->
        <div class="grid col-span-3 grid-cols-3 border rounded overflow-hidden">
          <button
            :class="`p-2 text-black-100 hover:bg-primary-100 border-r transition-all ${
              rarityFilterState.all ? 'bg-primary-500' : ''
            }`"
            type="button"
            @click="() => onClickFilterAllButton(rarityFilterState)"
          >
            <i class="fas fa-asterisk" />
          </button>
          <button
            v-for="(value, i) of rarities"
            :key="value"
            :class="`p-2 hover:bg-black-600 text-b3 ${i === rarities.length - 1 ? '' : 'border-r'} ${
              rarityFilterState[value] ? 'bg-primary-500' : ''
            }`"
            type="button"
            @click="() => onClickFilterButton(rarityFilterState, value)"
          >
            {{ value }}<GenshinIcon icon="star" />
          </button>
        </div>
        <!-- ELEMENTS FILTERS -->
        <div class="col-span-8 grid grid-cols-[repeat(8,_1fr)] border rounded overflow-hidden">
          <button
            :class="`p-2 text-white hover:bg-primary-100 border-r transition-all ${
              elementsFilterState.all ? 'bg-primary-500' : ''
            }`"
            type="button"
            @click="() => onClickFilterAllButton(elementsFilterState)"
          >
            <i class="fas fa-asterisk text-b3" />
          </button>
          <button
            v-for="({ name, imgSrc }, i) of elements"
            :key="name"
            :class="`grid place-items-center p-2 hover:bg-black-600 ${
              i === elements.length - 1 ? '' : 'border-r'
            } transition-all ${
              elementsFilterState[name] ? `bg-${name}/75` : ''
            }  active:bg-pink-500 `"
            type="button"
            @click="() => onClickFilterButton(elementsFilterState, name)"
          >
            <img class="w-5" :src="imgSrc">
          </button>
        </div>

        <!-- WEAPONS FILTERS -->
        <div class="col-span-6 grid grid-cols-[repeat(6,_1fr)] border rounded overflow-hidden">
          <!-- WEAPONS BUTTON ALL -->
          <button
            :class="`grid place-items-center p-2 text-b3 hover:bg-primary-100 border-r transition-all ${
              weaponsFilterState.all ? 'bg-primary-500' : ''
            }`"
            type="button"
            @click="() => onClickFilterAllButton(weaponsFilterState)"
          >
            <i class="fas fa-asterisk" />
          </button>

          <!-- WEAPONS BUTTONS -->
          <button
            v-for="weapon, i of weapons"
            :key="weapon"
            :class="`grid place-items-center p-4 text-b3 hover:bg-black-600 ${
              i === weapons.length - 1 ? '' : 'border-r'
            } ${weaponsFilterState[weapon] === true ? 'bg-primary-500' : ''}`"
            type="button"
            @click="onClickFilterButton(weaponsFilterState, weapon)"
          >
            <GenshinIcon :icon="weapon" />
          </button>
        </div>
      </div>
    </header>
    <!-- CHARACTERS -->
    <main class="max-w-5xl w-full p-8 m-auto relative">
      <TransitionGroup class="grid grid-cols-[repeat(auto-fill,_minmax(8rem,_1fr))] gap-5" name="grid" tag="div">
        <div
          v-for="(character, i) in filteredCharacters"
          :key="character.name"
          class="character-grid-item base-background-gradient aspect-square rounded-xl overflow-hidden"
        >
          <RouterLink
            :to="`/characters/${character.slug}`"
          >
            <img
              :class="{ pinned: i === 0 && !!pinnedCharacter}"
              class="character-grid-item-img"
              :src="character.imgSrc"
              :alt="character.name"
            >
          </RouterLink>
        </div>
      </TransitionGroup>
    </main>
  </div>
</template>

<style>
  .character-grid-item {
    position: relative;
    transition: all 0.3s ease-in-out;

  }

  .character-grid-item::before {
    content: '';
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, transparent 40%, #ffffff90 50%, transparent 60%);
    animation: 3s linear 1s bright;
    right: -100%;
    bottom: -100%;
  }

  .character-grid-item:hover::before {
    animation-play-state: running;
  }

  .character-grid-item-img {

    position: relative;
    z-index: 1;
  }

  .character-grid-item:hover > .character-grid-item-img {
    transition: all 0.1s ease-in-out;
    transform: scale(1.5);
  }

  .grid-enter-active,
  .grid-leave-active {
    transition: all 0.5s ease;
  }
  .grid-enter-from,
  .grid-leave-to {
    opacity: 0;
    /* transform: translateX(30px); */
  }
  /* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
  .grid-leave-active {
    position: absolute;
    width: 8rem;
    aspect-ratio: 1;
  }

  .pinned {
    outline: 1px solid green;
  }

  @keyframes bright {
  from {
    transform: translate(0%, 0%);
  }
  to {
    transform: translate(200%, 200%);
  }
}
</style>
