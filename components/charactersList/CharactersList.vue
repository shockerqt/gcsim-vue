<script lang="ts" setup>
import { faAsterisk, faStar } from '@fortawesome/free-solid-svg-icons';
import elements from 'assets/elements.json';
// import weapons from 'assets/weapons.json';

const weapons = ['bow', 'catalyst', 'claymore', 'polearm', 'sword'];

const rarities: [4, 5] = [4, 5];

const { data } = await useFetch('/api/data/characters');

defineProps<{
  handler: (characterSlug: string) => void;
}>();

const textFilter = ref('');

type Filters = {
  element: Array<string>;
  weapontype: Array<string>;
  rarity: Array<number>;
};

const selectedFilters = reactive<Filters>({
  element: [],
  weapontype: [],
  rarity: [],
});

const pinnedCharacter = computed(() => {
  const pinnedCharacter =
    (data?.value !== null &&
      textFilter.value.length > 1 &&
      Object.values(data?.value).find((character) =>
        character.name.en.toLowerCase().includes(textFilter.value.toLowerCase())
      )) ||
    null;
  return pinnedCharacter;
});

const resetFilters = (filterKey?: keyof Filters) => {
  if (!filterKey) {
    for (const key of Object.keys(selectedFilters) as Array<keyof Filters>) {
      selectedFilters[key] = [];
    }
  } else {
    selectedFilters[filterKey] = [];
  }
};

const onClickFilterButton = (
  filterKey: keyof Filters,
  slug: string | number
) => {
  const index = (selectedFilters[filterKey] as Array<string | number>).indexOf(
    slug
  );

  if (index > -1) {
    (selectedFilters[filterKey] as Array<string | number>).splice(index, 1);
  } else {
    (selectedFilters[filterKey] as Array<string | number>).push(slug);
  }
};

const filteredCharacters = computed(() => {
  let filteredCharacters = (data?.value && Object.values(data.value)) || [];

  for (const key in selectedFilters) {
    if (selectedFilters[key as keyof Filters].length === 0) {
      continue;
    }
    if (key === 'rarity') {
      filteredCharacters = filteredCharacters.filter((character) =>
        selectedFilters[key].includes(character[key])
      );
    } else if (key === 'element' || key === 'weapontype') {
      filteredCharacters = filteredCharacters.filter((character) =>
        selectedFilters[key].includes(character[key].en.toLowerCase())
      );
    }
  }

  if (pinnedCharacter.value) {
    filteredCharacters = filteredCharacters.filter(
      (character) => character.name.en !== pinnedCharacter?.value?.name.en
    );
    filteredCharacters.unshift(pinnedCharacter.value);
  }

  return filteredCharacters;
});
</script>

<template>
  <header class="sticky top-0 z-10 flex flex-col gap-4 bg-black-700 py-4">
    <!-- SEARCH INPUT  + CLEAN BUTTON -->
    <div class="grid grid-cols-[1fr_auto] gap-4 lg:grid-cols-[repeat(17,_1fr)]">
      <!-- SEARCH INPUT -->
      <input
        v-model="textFilter"
        class="placeholder:text-black block w-full rounded-lg border-black-500 bg-black-600 p-2.5 text-sm text-black-100 placeholder:italic placeholder:text-black-500 focus:border-black-600 focus:ring-4 focus:ring-black-500 lg:col-span-11"
        type="text"
        placeholder="Busca el personaje"
      />

      <!-- CLEAN BUTTON -->
      <div class="flex justify-end lg:col-span-2 lg:col-start-[16]">
        <ButtonSecondary @click="resetFilters()"> Clean </ButtonSecondary>
      </div>

      <!-- DROPDOWNS -->
      <div class="relative col-span-2 flex w-full items-center gap-4 lg:hidden">
        <BaseDropdownOld
          :class="{
            'bg-primary-500 text-black-700': !selectedFilters.rarity.length,
          }"
          label="Rareza"
        >
          <!-- RARITY ALL BUTTON -->
          <button
            class="block w-full p-1 text-black-100 transition-all"
            :class="[
              selectedFilters.rarity.length
                ? 'bg-primary-500 text-black-700'
                : 'hover:bg-black-400 active:bg-black-500',
            ]"
            type="button"
            @click="() => resetFilters('rarity')"
          >
            <div class="flex w-full items-center justify-start gap-4 px-4">
              <FaIcon class="w-6" :icon="faAsterisk" />
              <label class="text-base">Todos</label>
            </div>
          </button>
          <!-- RARITY BUTTONS -->
          <button
            v-for="value of rarities"
            :key="`dropdown-${value}`"
            class="block w-full border-t border-black-500 p-1 text-black-100"
            :class="[
              selectedFilters.rarity.includes(value)
                ? 'bg-primary-500 text-black-700'
                : 'hover:bg-black-400 active:bg-black-500',
            ]"
            type="button"
            @click="() => onClickFilterButton('rarity', value)"
          >
            <div class="flex w-full items-center justify-start gap-4 px-4">
              <FaIcon class="w-6" :icon="faStar" />
              <label class="text-base">{{ value }} estrellas</label>
            </div>
          </button>
        </BaseDropdownOld>
        <BaseDropdownOld
          :class="{
            'bg-primary-500 text-black-700': !selectedFilters.element.length,
          }"
          label="Elemento"
        >
          <button
            class="block w-full py-1 text-black-100 transition-all"
            :class="{
              // pressed
              'bg-primary-500 text-black-700': selectedFilters.element.length,
              // not pressed
              'hover:bg-black-400 active:bg-black-500':
                !selectedFilters.element.length,
            }"
            type="button"
            @click="() => resetFilters('element')"
          >
            <div class="flex w-full items-center justify-start gap-4 px-4">
              <FaIcon class="w-6" :icon="faAsterisk" />
              <label class="text-base">Todos</label>
            </div>
          </button>
          <button
            v-for="{ name, slug } of elements"
            :key="name"
            :class="[
              'grid w-full place-items-center py-1 text-black-100 transition-all',
              selectedFilters.element.includes(slug)
                ? `bg-${slug}-500 text-black-700`
                : 'hover:bg-black-400 active:bg-black-500',
            ]"
            type="button"
            @click="() => onClickFilterButton('element', slug)"
          >
            <div class="flex w-full items-center justify-start gap-4 px-4">
              <GenshinIcon class="w-6" :icon="slug" />
              <label class="text-base">{{
                slug.charAt(0).toUpperCase() + slug.slice(1)
              }}</label>
            </div>
          </button>
        </BaseDropdownOld>
      </div>
    </div>

    <!-- TODOS LOS FILTROS -->
    <div class="grid grid-cols-[repeat(17,_1fr)] gap-2 text-2xl [&>div]:h-12">
      <!-- RARITY FILTERS -->
      <div
        class="col-span-3 hidden grid-cols-3 divide-x divide-black-500 overflow-hidden rounded border border-black-500 lg:grid"
      >
        <!-- RARITY ALL BUTTON -->
        <button
          :class="[
            selectedFilters.rarity.length
              ? 'hover:bg-black-600 active:bg-black-400'
              : 'bg-primary-500 text-black-700',
          ]"
          type="button"
          @click="() => resetFilters('rarity')"
        >
          <FaIcon height="0.9em" :icon="faAsterisk" />
        </button>
        <!-- RARITY BUTTONS -->
        <button
          v-for="value of rarities"
          :key="`bar-${value}`"
          :class="[
            selectedFilters.rarity.includes(value)
              ? 'bg-primary-500 text-black-700'
              : 'hover:bg-black-600 active:bg-black-400',
          ]"
          type="button"
          @click="() => onClickFilterButton('rarity', value)"
        >
          <div class="flex place-items-start justify-center text-[0.85em]">
            {{ value }}<FaIcon class="pt-1" height="0.7em" :icon="faStar" />
          </div>
        </button>
      </div>
      <!-- ELEMENTS FILTERS -->
      <div
        class="col-span-8 hidden grid-cols-[repeat(8,_1fr)] divide-x divide-black-500 overflow-hidden rounded border border-black-500 lg:grid"
      >
        <button
          :class="[
            selectedFilters.element.length
              ? 'hover:bg-black-600 active:bg-black-400'
              : 'bg-primary-500 text-black-700',
          ]"
          type="button"
          @click="() => resetFilters('element')"
        >
          <FaIcon height="0.9em" :icon="faAsterisk" />
        </button>
        <button
          v-for="{ slug } of elements"
          :key="slug"
          :class="[
            'grid place-items-center',
            selectedFilters.element.includes(slug)
              ? `bg-${slug}-500 text-black-700`
              : 'hover:bg-black-600 active:bg-black-400',
          ]"
          type="button"
          @click="() => onClickFilterButton('element', slug)"
        >
          <GenshinIcon :icon="slug" />
        </button>
      </div>

      <!-- WEAPONS FILTERS -->
      <div
        class="col-span-6 hidden grid-cols-[repeat(6,_1fr)] divide-x divide-black-500 overflow-hidden rounded border border-black-500 lg:grid"
      >
        <!-- WEAPONS BUTTON ALL -->
        <button
          :class="[
            selectedFilters.weapontype.length
              ? 'hover:bg-black-600 active:bg-black-400'
              : 'bg-primary-500 text-black-700',
          ]"
          type="button"
          @click="() => resetFilters('weapontype')"
        >
          <FaIcon height="0.9em" :icon="faAsterisk" />
        </button>

        <!-- WEAPONS BUTTONS -->
        <button
          v-for="weapon of weapons"
          :key="weapon"
          class="grid place-items-center"
          :class="{
            'bg-primary-500 text-black-700':
              selectedFilters.weapontype.includes(weapon),
            'hover:bg-black-600 active:bg-black-400':
              !selectedFilters.weapontype.includes(weapon),
          }"
          type="button"
          @click="onClickFilterButton('weapontype', weapon)"
        >
          <GenshinIcon
            :color-classes="
              selectedFilters.weapontype.includes(weapon)
                ? ['fill-black-700', 'fill-error-500']
                : ['fill-black-100', 'fill-black-500']
            "
            :icon="weapon"
          />
        </button>
      </div>
    </div>
  </header>

  <!---------------->
  <!-- CHARACTERS -->
  <!---------------->
  <main class="relative m-auto w-full">
    <TransitionGroup
      class="grid grid-cols-[repeat(auto-fill,_minmax(8rem,_1fr))] gap-5"
      name="grid"
      tag="div"
    >
      <button
        v-for="(character, i) in filteredCharacters"
        :key="character.name.en"
        @click="handler(character.slug)"
      >
        <div
          class="character-grid-item base-background-gradient aspect-square overflow-hidden rounded-xl"
        >
          <img
            :class="{ pinned: i === 0 && !!pinnedCharacter }"
            class="character-grid-item-img"
            :src="character.images.portrait.src"
            :alt="character.name.en"
          />
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
  background: linear-gradient(
    135deg,
    transparent 40%,
    #ffffff90 50%,
    transparent 60%
  );
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
