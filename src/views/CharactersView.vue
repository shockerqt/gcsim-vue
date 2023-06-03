<script setup>
import { reactive, ref, computed } from 'vue'

import characters from '@/assets/characters.json'
import Icon from '../components/IconCollection.vue'

const textFilter = ref('')

const filteredCharacterByInput = computed(() => {
  return characters.find(
    (character) =>
      textFilter.value.length > 1 &&
      character.name.toLowerCase().includes(textFilter.value.toLowerCase())
  )
})

const elementsFilterState = reactive({
  anemo: false,
  cryo: false,
  dendro: false,
  electro: false,
  geo: false,
  hydro: false,
  pyro: false,
  all: true
})

const weaponsFilterState = reactive({
  bow: false,
  catalyst: false,
  claymore: false,
  polearm: false,
  sword: false,
  all: true
})

const rarityFilterState = reactive({
  4: false,
  5: false,
  all: true
})

const elements = [
  {
    name: 'anemo',
    imgSrc: '/src/assets/Elements/Element_Anemo.svg'
  },
  {
    name: 'cryo',
    imgSrc: '/src/assets/Elements/Element_Cryo.svg'
  },
  {
    name: 'dendro',
    imgSrc: '/src/assets/Elements/Element_Dendro.svg'
  },
  {
    name: 'electro',
    imgSrc: '/src/assets/Elements/Element_Electro.svg'
  },
  {
    name: 'geo',
    imgSrc: '/src/assets/Elements/Element_Geo.svg'
  },
  {
    name: 'hydro',
    imgSrc: '/src/assets/Elements/Element_Hydro.svg'
  },
  {
    name: 'pyro',
    imgSrc: '/src/assets/Elements/Element_Pyro.svg'
  }
]

const weapons = ['bow', 'catalyst', 'claymore', 'polearm', 'sword']

const rarity = [4, 5]

const onClickFilterAllButton = (state) => {
  if (state.all === false) {
    // reset all elements values if all is clicked
    for (const key of Object.keys(state)) state[key] = false
    state.all = true
  }
}

const onClickFilterButton = (stateObject, name) => {
  if (stateObject.all) stateObject.all = false
  stateObject[name] = !stateObject[name]

  if (!Object.values(stateObject).includes(true)) stateObject.all = true
}

const filterByElements = (characters) => {
  if (elementsFilterState.all) {
    return characters
  } else {
    const filteredCharacters = []
    const active = []
    for (const [key, value] of Object.entries(elementsFilterState)) {
      if (value) active.push(key)
    }

    for (const character of characters) {
      if (
        active.includes(character.element.toLowerCase()) &&
        !filteredCharacters.includes(character)
      )
        filteredCharacters.push(character)
    }

    return filteredCharacters
  }
}

const filterByWeapons = (characters) => {
  if (weaponsFilterState.all) {
    return characters
  } else {
    const filteredCharacters = []
    const active = []
    for (const [key, value] of Object.entries(weaponsFilterState)) {
      if (value) active.push(key)
    }

    for (const character of characters) {
      if (
        active.includes(character.weapontype.toLowerCase()) &&
        !filteredCharacters.includes(character)
      )
        filteredCharacters.push(character)
    }

    return filteredCharacters
  }
}

const filterByRarity = (characters) => {
  if (rarityFilterState.all) {
    return characters
  } else {
    const filteredCharacters = []
    const active = []
    for (const [key, value] of Object.entries(rarityFilterState)) {
      if (value) active.push(key)
    }

    for (const character of characters) {
      if (active.includes(character.rarity) && !filteredCharacters.includes(character))
        filteredCharacters.push(character)
    }

    return filteredCharacters
  }
}

const cleanFilters = () => {
  onClickFilterAllButton(rarityFilterState)
  onClickFilterAllButton(elementsFilterState)
  onClickFilterAllButton(weaponsFilterState)
}

const getFilteredCharacters = () => {
  let filterCharacters = filterByElements(characters)
  filterCharacters = filterByWeapons(filterCharacters)
  filterCharacters = filterByRarity(filterCharacters)
  if (filteredCharacterByInput?.value)
    return filterCharacters.filter(
      (character) => character.name !== filteredCharacterByInput.value.name
    )

  return filterCharacters
}
</script>

<template>
  <header class="max-w-5xl w-full p-8 m-auto">
    <!-- TITLE & DESCRIPTION -->
    <div class="row-span-2 my-2">
      <h1 class="text-g2 font-bold my-1">FILTRA TUS PERSONAJES FAVORITOS</h1>

      <!-- DESCRIPTION -->
      <p class="text-b3 font-light text-xs mb-2">
        Utiliza nuestro sistema de filtrado para encontrar rápidamente tus personajes favoritos de
        Genshin Impact por elementos, rareza, arma y más. Personaliza tu búsqueda para obtener
        mejores resultados en segundos.
      </p>

      <!-- SEARCH INPUT -->
      <div class="grid grid-cols-[repeat(17,_1fr)] gap-2">
        <input
          v-model="textFilter"
          class="col-span-11 rounded bg-transparent text-white"
          type="text"
          placeholder="Busca el personaje"
        />

        <!-- CLEAN BUTTON -->
        <div
          class="border rounded overflow-hidden hover:bg-b2 active:bg-pink-500 col-span-2 col-start-[16]"
        >
          <button
            class="p-2 w-full text-white text-center transition-all"
            type="button"
            @click="cleanFilters"
          >
            LIMPIAR
          </button>
        </div>
      </div>
    </div>

    <!-- TODOS LOS FILTROS -->
    <div class="grid grid-cols-[repeat(17,_1fr)] gap-2">
      <!-- RARITY FILTERS -->
      <div class="grid col-span-3 grid-cols-3 border rounded overflow-hidden">
        <button
          :class="`p-2 text-white hover:bg-neutral-800 border-r transition-all ${
            rarityFilterState.all ? 'bg-g1' : ''
          }`"
          type="button"
          @click="() => onClickFilterAllButton(rarityFilterState)"
        >
          <i class="fas fa-asterisk"></i>
        </button>
        <button
          v-for="(value, i) of rarity"
          v-bind:key="value"
          :class="`p-2 hover:bg-neutral-800 text-b3 ${i === rarity.length - 1 ? '' : 'border-r'} ${
            rarityFilterState[value] ? 'bg-g1' : ''
          }`"
          @click="() => onClickFilterButton(rarityFilterState, value)"
          type="button"
        >
          {{ value }}<i class="fas fa-star"></i>
        </button>
      </div>
      <!-- ELEMENTS FILTERS -->
      <div class="col-span-8 grid grid-cols-[repeat(8,_1fr)] border rounded overflow-hidden">
        <button
          :class="`p-2 text-white hover:bg-neutral-800 border-r transition-all ${
            elementsFilterState.all ? 'bg-g1' : ''
          }`"
          type="button"
          @click="() => onClickFilterAllButton(elementsFilterState)"
        >
          <i class="fas fa-asterisk text-b3"></i>
        </button>
        <button
          v-for="({ name, imgSrc }, i) of elements"
          v-bind:key="name"
          :class="`grid place-items-center p-2 hover:bg-neutral-800 ${
            i === elements.length - 1 ? '' : 'border-r'
          } transition-all ${
            elementsFilterState[name] ? `bg-${name}/75` : ''
          }  active:bg-pink-500 `"
          type="button"
          @click="() => onClickFilterButton(elementsFilterState, name)"
        >
          <img class="w-5" :src="imgSrc" />
        </button>
      </div>

      <!-- WEAPONS FILTERS -->
      <div class="col-span-6 grid grid-cols-[repeat(6,_1fr)] border rounded overflow-hidden">
        <!-- WEAPONS BUTTON ALL -->
        <button
          :class="`grid place-items-center p-2 text-b3 hover:bg-neutral-800 border-r transition-all ${
            weaponsFilterState.all ? 'bg-g1' : ''
          }`"
          type="button"
          @click="() => onClickFilterAllButton(weaponsFilterState)"
        >
          <i class="fas fa-asterisk"></i>
        </button>

        <!-- WEAPONS BUTTONS -->
        <button
          v-for="(weapon, i) of weapons"
          :key="weapon"
          :class="`grid place-items-center p-4 text-b3 hover:bg-neutral-800 ${
            i === weapons.length - 1 ? '' : 'border-r'
          } ${weaponsFilterState[weapon] === true ? 'bg-g1' : ''}`"
          @click="() => onClickFilterButton(weaponsFilterState, weapon)"
          type="button"
        >
          <Icon :icon="weapon" />
        </button>
      </div>
    </div>
  </header>
  <!-- CHARACTERS -->
  <main class="max-w-5xl w-full p-8 m-auto">
    <div class="grid grid-cols-[repeat(auto-fill,_minmax(8rem,_1fr))] gap-5">
      <RouterLink
        v-if="filteredCharacterByInput"
        :key="key"
        class="aspect-square bg-zinc-800 rounded-xl overflow-hidden outline outline-4 outline-yellow-500"
        :to="`/characters/${filteredCharacterByInput?.slug}`"
      >
        <img :src="filteredCharacterByInput?.imgSrc" :alt="filteredCharacterByInput?.name" />
      </RouterLink>
      <RouterLink
        v-for="(character, key) of getFilteredCharacters()"
        :key="key"
        class="aspect-square bg-zinc-800 rounded-xl overflow-hidden"
        :to="`/characters/${character.slug}`"
      >
        <img
          :src="character.imgSrc"
          :alt="character.name"
          @error="
            (event) => {
              event.target.src = `https://res.cloudinary.com/genshin/image/upload/sprites/${character.imgSrc
                .split('/')
                .slice(-1)}`
            }
          "
        />
      </RouterLink>
    </div>
  </main>
</template>
