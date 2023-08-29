<script lang="ts" setup>
import { faAsterisk, faStar } from '@fortawesome/free-solid-svg-icons';
import Fuse from 'fuse.js';

const props = defineProps<{
  handler: (weaponSlug: string) => void;
  fixedWeapontype?: string;
}>();

const { data } = await useFetch('/api/data/weapons');

// const fuse = new Fuse(data.value, {
//   keys: [
//     'slug',
//     'name.es',
//     'name.en',
//   ],
//   threshold: 0.3,
// });

const textFilter = ref('');

type Filters = {
  rarity: Array<number>;
  weapontype: Array<string>;
};

const selectedFilters = reactive<Filters>({
  rarity: [],
  weapontype: [],
});

const pinnedWeapons = computed(() => {
  if (data?.value == null || textFilter.value.length < 3) return [];
  const weapons = Object.values(data.value);
  const fuse = new Fuse(weapons, {
    keys: ['slug', 'name.es', 'name.en'],
    threshold: 0.3,
  });
  return fuse.search(textFilter.value);
});

const filteredWeapons = computed(() => {
  let filteredWeapons = (data?.value && Object.values(data.value)) ?? [];

  if (props.fixedWeapontype != null) {
    filteredWeapons = filteredWeapons.filter(
      (weapon) => weapon.weapontype.en === props.fixedWeapontype,
    );
  }

  for (const key in selectedFilters) {
    if (selectedFilters[key as keyof Filters].length === 0) {
      continue;
    }
    if (key === 'rarity') {
      filteredWeapons = filteredWeapons.filter((weapon) =>
        selectedFilters[key].includes(weapon.rarity),
      );
    }
    if (key === 'weapontype') {
      filteredWeapons = filteredWeapons.filter((weapon) =>
        selectedFilters[key].includes(weapon.weapontype.en.toLocaleLowerCase()),
      );
    }
  }

  if (pinnedWeapons.value.length > 0) {
    filteredWeapons = filteredWeapons.filter(
      (weapon) =>
        !pinnedWeapons.value.find(
          (pinnedWeapon) => pinnedWeapon.item.slug === weapon.slug,
        ),
    );
    filteredWeapons.unshift(
      ...pinnedWeapons.value.map((pinnedWeapon) => pinnedWeapon.item),
    );
  }

  return filteredWeapons;
});

const onClickFilterButton = (
  filterKey: keyof Filters,
  slug: string | number,
) => {
  const index = (selectedFilters[filterKey] as Array<string | number>).indexOf(
    slug,
  );

  if (index > -1) {
    (selectedFilters[filterKey] as Array<string | number>).splice(index, 1);
  } else {
    (selectedFilters[filterKey] as Array<string | number>).push(slug);
  }
};

const resetFilters = (filterKey?: keyof Filters) => {
  if (!filterKey) {
    for (const key of Object.keys(selectedFilters) as Array<keyof Filters>) {
      selectedFilters[key] = [];
    }
  } else {
    selectedFilters[filterKey] = [];
  }
};
</script>

<template>
  <header class="sticky top-0 z-10 flex flex-col gap-4 bg-black-900 py-4">
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
    </div>

    <div class="grid grid-cols-[repeat(17,_1fr)] gap-2 text-2xl [&>div]:h-12">
      <!-- RARITY FILTERS -->
      <div
        class="col-span-6 hidden grid-cols-6 divide-x divide-black-500 overflow-hidden rounded border border-black-500 lg:grid"
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
        <button
          v-for="rarity in [1, 2, 3, 4, 5]"
          :key="rarity"
          :class="[
            selectedFilters.rarity.includes(rarity)
              ? 'bg-primary-500 text-black-700'
              : 'hover:bg-black-600 active:bg-black-400',
          ]"
          @click="onClickFilterButton('rarity', rarity)"
        >
          <div class="test-[0.85em] flex place-items-start justify-center">
            {{ rarity }}
            <FaIcon class="pt-1" height="0.7em" :icon="faStar" />
          </div>
        </button>
      </div>
      <!-- WEAPONS FILTERS -->
      <div
        v-if="fixedWeapontype == null"
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
          v-for="weapon of ['bow', 'catalyst', 'claymore', 'polearm', 'sword']"
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

    <div>Filtros de rareza</div>
    <div v-if="fixedWeapontype != null">Filtros de tipo</div>
  </header>
  <main class="relative m-auto w-full">
    <TransitionGroup
      class="grid grid-cols-[repeat(auto-fill,_minmax(8rem,_1fr))] gap-5"
      name="grid"
      tag="div"
    >
      <button
        v-for="weapon in filteredWeapons"
        :key="weapon.slug"
        @click="handler(weapon.slug)"
      >
        <div
          class="base-background-gradient aspect-square overflow-hidden rounded-xl"
        >
          <!-- <img :class="{ pinned: i === 0 && !!pinnedCharacter }" class="character-grid-item-img"
            :src="character.images.portrait.src" :alt="character.name.en" /> -->
          <div>
            <p>{{ weapon.name.es }}</p>
          </div>
        </div>
      </button>
    </TransitionGroup>
  </main>
</template>
