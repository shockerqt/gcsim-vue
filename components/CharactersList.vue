<script lang="ts" setup>
import { faAsterisk, faStar } from '@fortawesome/free-solid-svg-icons';
import BaseDropdown from './BaseDropdown.vue';
import elements from '~/assets/elements.json';

const { data } = await useFetch('/api/data/characters');

defineProps<{
  handler:(characterSlug: string) => void;
}>();

const textFilter = ref('');

const elementsFilterState = reactive<Record<string, boolean>>({
  anemo: false,
  cryo: false,
  dendro: false,
  electro: false,
  geo: false,
  hydro: false,
  pyro: false,
  all: true,
});

const weaponsFilterState = reactive<Record<string, boolean>>({
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
  const pinnedCharacter = (data?.value !== null && textFilter.value.length > 1 && Object.values(data?.value).find(
    character =>
      character.name.en.toLowerCase().includes(textFilter.value.toLowerCase()),
  )) || null;
  return pinnedCharacter;
});

const weapons = [
  'bow',
  'catalyst',
  'claymore',
  'polearm',
  'sword',
];

const rarities: [4, 5] = [4, 5];

const onClickFilterAllButton = (state: { [s: string]: boolean }) => {
  if (state.all === false) {
    // reset all elements values if all is clicked
    for (const key of Object.keys(state)) { state[key] = false; }
    state.all = true;
  }
};

const onClickFilterButton = (state: { [s: string]: boolean }, name: string | number) => {
  if (state.all) { state.all = false; }
  state[name] = !state[name];

  if (!Object.values(state).includes(true)) { state.all = true; }
};

const filterByElements = (characters: DataCharacter[]) => {
  if (elementsFilterState.all) {
    return characters;
  } else {
    const filteredCharacters: DataCharacter[] = [];
    const active: string[] = [];
    for (const [key, value] of Object.entries(elementsFilterState)) {
      if (value) { active.push(key as string); }
    }

    for (const character of characters) {
      if (
        active.includes(character.element.en.toLowerCase()) &&
        !filteredCharacters.includes(character)
      ) { filteredCharacters.push(character); }
    }

    return filteredCharacters;
  }
};

const filterByWeapons = (characters: DataCharacter[]) => {
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
        active.includes(character.weapontype.en.toLowerCase()) &&
        !filteredCharacters.includes(character)
      ) { filteredCharacters.push(character); }
    }

    return filteredCharacters;
  }
};

const filterByRarity = (characters: DataCharacter[]) => {
  if (rarityFilterState.all) {
    return characters;
  } else {
    const filteredCharacters: any[] = [];
    const active = [];
    for (const [key, value] of Object.entries(rarityFilterState)) {
      if (value) { active.push(key); }
    }

    for (const character of characters) {
      if (active.includes(character.rarity.toString()) && !filteredCharacters.includes(character)) { filteredCharacters.push(character); }
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
  let filteredCharacters = (data?.value && Object.values(data.value)) || [];
  filteredCharacters = filterByElements(filteredCharacters);
  filteredCharacters = filterByWeapons(filteredCharacters);
  filteredCharacters = filterByRarity(filteredCharacters);

  if (pinnedCharacter.value) {
    filteredCharacters = filteredCharacters.filter(character => character.name.en !== pinnedCharacter?.value?.name.en);
    filteredCharacters.unshift(pinnedCharacter.value);
  }

  return filteredCharacters;
});
</script>

<template>
  <header class="py-4 flex flex-col gap-4 sticky top-0 bg-black-700 z-10">
    <!-- SEARCH INPUT  + CLEAN BUTTON -->
    <div class="grid grid-cols-[1fr_auto] lg:grid-cols-[repeat(17,_1fr)] gap-4">
      <!-- SEARCH INPUT -->
      <input
        v-model="textFilter"
        class="lg:col-span-11 bg-black-600 text-black-100 text-sm rounded-lg border-black-500 focus:border-black-600 focus:ring-4 focus:ring-black-500 block w-full p-2.5 placeholder:text-black-500 placeholder:italic placeholder:text-black"
        type="text"
        placeholder="Busca el personaje"
      >

      <!-- CLEAN BUTTON -->
      <div class="flex lg:col-span-2 lg:col-start-[16] justify-end">
        <ButtonSecondary @click="cleanFilters">
          Clean
        </ButtonSecondary>
      </div>

      <!-- DROPDOWNS -->
      <div class="flex lg:hidden items-center gap-4 col-span-2 w-full relative">
        <BaseDropdown
          :class="{
            'bg-primary-500 text-black-700': !rarityFilterState.all
          }"
          label="Rareza"
        >
          <!-- RARITY ALL BUTTON -->
          <button
            class="block w-full text-black-100 transition-all p-1"
            :class="{
              // pressed
              'bg-primary-500 text-black-700': rarityFilterState.all,
              // not pressed
              'active:bg-black-500 hover:bg-black-400': !rarityFilterState.all,
            }"
            type="button"
            @click="() => onClickFilterAllButton(rarityFilterState)"
          >
            <div class="flex items-center justify-start w-full px-4 gap-4">
              <FaIcon class="w-6" :icon="faAsterisk" />
              <label class="text-base">Todos</label>
            </div>
          </button>
          <!-- RARITY BUTTONS -->
          <button
            v-for="value of rarities"
            :key="`dropdown-${value}`"
            class="block w-full p-1 border-t border-black-500 text-black-100"
            :class="{
              // pressed
              'bg-primary-500 text-black-700': rarityFilterState[value],
              // not pressed
              'active:bg-black-500 hover:bg-black-400': !rarityFilterState[value],
            }"
            type="button"
            @click="() => onClickFilterButton(rarityFilterState, value)"
          >
            <div class="flex items-center justify-start w-full px-4 gap-4">
              <FaIcon class="w-6" :icon="faStar" />
              <label class="text-base">{{ value }} estrellas</label>
            </div>
          </button>
        </BaseDropdown>
        <BaseDropdown
          :class="{
            'bg-primary-500 text-black-700': !elementsFilterState.all
          }"
          label="Elemento"
        >
          <button
            class="block w-full text-black-100 transition-all py-1"
            :class="{
              // pressed
              'bg-primary-500 text-black-700': elementsFilterState.all,
              // not pressed
              'active:bg-black-500 hover:bg-black-400': !elementsFilterState.all,
            }"
            type="button"
            @click="() => onClickFilterAllButton(elementsFilterState)"
          >
            <div class="flex items-center justify-start w-full px-4 gap-4">
              <FaIcon class="w-6" :icon="faAsterisk" />
              <label class="text-base">Todos</label>
            </div>
          </button>
          <button
            v-for="{ name, slug } of elements"
            :key="name"
            class="w-full grid place-items-center transition-all text-black-100 py-1"
            :class="{
              'active:bg-black-500 hover:bg-black-400': !elementsFilterState[slug],
              [`bg-${slug}-500 text-black-700`]: elementsFilterState[slug],
            }"
            type="button"
            @click="() => onClickFilterButton(elementsFilterState, slug)"
          >
            <div class="flex items-center justify-start w-full px-4 gap-4">
              <GenshinIcon class="w-6" :icon="slug" />
              <label class="text-base">{{ slug.charAt(0).toUpperCase() + slug.slice(1) }}</label>
            </div>
          </button>
        </BaseDropdown>

        <!-- WEAPONS -->
        <BaseDropdown
          :class="{
            'bg-primary-500 text-black-700': !weaponsFilterState.all
          }"
          label="Arma"
        >
          <!-- WEAPONS BUTTON ALL -->
          <button
            class="block w-full text-black-100 border-black-500 transition-all p-1"
            :class="{
              // pressed
              'bg-primary-500 text-black-700': weaponsFilterState.all,
              // not pressed
              'active:bg-black-500 hover:bg-black-400': !weaponsFilterState.all,
            }"
            type="button"
            @click="() => onClickFilterAllButton(weaponsFilterState)"
          >
            <div class="flex items-center justify-start w-full px-4 gap-4">
              <FaIcon class="w-6" :icon="faAsterisk" />
              <label class="text-base">Todos</label>
            </div>
          </button>

          <!-- WEAPONS BUTTONS -->
          <button
            v-for="weapon, i of weapons"
            :key="weapon"
            class="w-full text-black-100 grid place-items-center p-1"
            :class="{
              'border-r border-black-500': i !== weapons.length - 1,
              'bg-primary-500 text-black-700': weaponsFilterState[weapon],
              'active:bg-black-500 hover:bg-black-400': !weaponsFilterState[weapon],
            }"
            type="button"
            @click="onClickFilterButton(weaponsFilterState, weapon)"
          >
            <div class="flex items-center justify-start w-full px-4 gap-4">
              <GenshinIcon
                class="w-6"
                :color-classes="weaponsFilterState[weapon] === true ? ['fill-black-700', 'fill-error-500'] : ['fill-black-100', 'fill-black-500']"
                :icon="weapon"
              />
              <label class="text-base">{{ weapon.charAt(0).toUpperCase() + weapon.slice(1) }}</label>
            </div>
          </button>
        </BaseDropdown>
      </div>
    </div>

    <!-- TODOS LOS FILTROS -->
    <div class="grid grid-cols-[repeat(17,_1fr)] gap-2 text-3xl">
      <!-- RARITY FILTERS -->
      <div class="hidden lg:grid col-span-3 h-16 grid-cols-3 border rounded border-black-500 overflow-hidden">
        <!-- RARITY ALL BUTTON -->
        <button
          class="text-black-100 border-r border-black-500 transition-all"
          :class="{
            // pressed
            'bg-primary-500 text-black-700': rarityFilterState.all,
            // not pressed
            'active:bg-black-400 hover:bg-black-600': !rarityFilterState.all,
          }"
          type="button"
          @click="() => onClickFilterAllButton(rarityFilterState)"
        >
          <FaIcon :icon="faAsterisk" />
        </button>
        <!-- RARITY BUTTONS -->
        <button
          v-for="(value, i) of rarities"
          :key="`bar-${value}`"
          :class="{
            'border-r border-black-500': i !== rarities.length - 1,
            // pressed
            'bg-primary-500 text-black-700': rarityFilterState[value],
            // not pressed
            'active:bg-black-400 hover:bg-black-600': !rarityFilterState[value],
          }"
          type="button"
          @click="() => onClickFilterButton(rarityFilterState, value)"
        >
          <div class="flex place-items-start justify-center">
            {{ value }}<FaIcon class="pt-1" height="0.7em" :icon="faStar" />
          </div>
        </button>
      </div>
      <!-- ELEMENTS FILTERS -->
      <div class="hidden lg:grid col-span-8 grid-cols-[repeat(8,_1fr)] border border-black-500 rounded overflow-hidden">
        <button
          class="text-black-100 border-r border-black-500 transition-all"
          :class="{
            // pressed
            'bg-primary-500 text-black-700': elementsFilterState.all,
            // not pressed
            'active:bg-black-400 hover:bg-black-600': !elementsFilterState.all,
          }"
          type="button"
          @click="() => onClickFilterAllButton(elementsFilterState)"
        >
          <FaIcon :icon="faAsterisk" />
        </button>
        <button
          v-for="({ name, slug }, i) of elements"
          :key="name"
          class="grid place-items-center transition-all text-black-100"
          :class="{
            'active:bg-black-400 hover:bg-black-600': !elementsFilterState[slug],
            [`bg-${slug}-500 text-black-700`]: elementsFilterState[slug],
            'border-r border-black-500': i !== elements.length - 1,
          }"
          type="button"
          @click="() => onClickFilterButton(elementsFilterState, slug)"
        >
          <GenshinIcon
            :icon="slug"
          />
        </button>
      </div>

      <!-- WEAPONS FILTERS -->
      <div class="hidden lg:grid col-span-6 grid-cols-[repeat(6,_1fr)] border border-black-500 rounded overflow-hidden">
        <!-- WEAPONS BUTTON ALL -->
        <button
          class="text-black-100 border-r border-black-500 transition-all"
          :class="{
            // pressed
            'bg-primary-500 text-black-700': weaponsFilterState.all,
            // not pressed
            'active:bg-black-400 hover:bg-black-600': !weaponsFilterState.all,
          }"
          type="button"
          @click="() => onClickFilterAllButton(weaponsFilterState)"
        >
          <FaIcon :icon="faAsterisk" />
        </button>

        <!-- WEAPONS BUTTONS -->
        <button
          v-for="weapon, i of weapons"
          :key="weapon"
          class="grid place-items-center"
          :class="{
            'border-r border-black-500': i !== weapons.length - 1,
            'bg-primary-500 text-black-700': weaponsFilterState[weapon],
            'hover:bg-black-600 active:bg-black-400': !weaponsFilterState[weapon],
          }"
          type="button"
          @click="onClickFilterButton(weaponsFilterState, weapon)"
        >
          <GenshinIcon
            :color-classes="weaponsFilterState[weapon] === true ? ['fill-black-700', 'fill-error-500'] : ['fill-black-100', 'fill-black-500']"
            :icon="weapon"
          />
        </button>
      </div>
    </div>
  </header>
  <!-- CHARACTERS -->
  <main class="w-full m-auto relative">
    <TransitionGroup class="grid grid-cols-[repeat(auto-fill,_minmax(8rem,_1fr))] gap-5" name="grid" tag="div">
      <button
        v-for="(character, i) in filteredCharacters"
        :key="character.name.en"
        @click="handler(character.slug)"
      >
        <div
          class="character-grid-item base-background-gradient aspect-square rounded-xl overflow-hidden"
        >
          <img
            :class="{ pinned: i === 0 && !!pinnedCharacter}"
            class="character-grid-item-img"
            :src="character.images.portrait.src"
            :alt="character.name.en"
          >
        </div>
      </button>
    </TransitionGroup>
  </main>
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
