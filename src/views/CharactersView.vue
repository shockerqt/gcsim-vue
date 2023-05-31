<script setup>
import { reactive } from 'vue'

import characters from '@/assets/characters.json'

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

const weapons = [
  {
    name: 'bow',
    imgSrc: '/src/assets/Weapon/Icon_Bow.webp'
  },
  {
    name: 'catalyst',
    imgSrc: '/src/assets/Weapon/Icon_Catalyst.webp'
  },
  {
    name: 'claymore',
    imgSrc: '/src/assets/Weapon/Icon_Claymore.webp'
  },
  {
    name: 'polearm',
    imgSrc: '/src/assets/Weapon/Icon_Polearm.webp'
  },
  {
    name: 'sword',
    imgSrc: '/src/assets/Weapon/Icon_Sword.webp'
  }
]

const rarity = [4, 5]

const onClickFilterAllButton = (state) => {
  if (state.all === false) {
    // reset all elements values if all is clicked
    for (const key of Object.keys(state)) state[key] = false
    state.all = true
  }
}

const onClickFilterButton = (stateObject, name) => {
  console.log(stateObject, name)
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
      for (const characterElement of character.element) {
        if (
          active.includes(characterElement.toLowerCase()) &&
          !filteredCharacters.includes(character)
        )
          filteredCharacters.push(character)
      }
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
        active.includes(character.weapon.toLowerCase()) &&
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

    console.log(active, characters)
    for (const character of characters) {
      if (active.includes(`${character.rarity}`) && !filteredCharacters.includes(character))
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

  return filterCharacters
}
</script>

<template>
  <header class="max-w-5xl w-full p-8 m-auto">
    <!-- TODOS LOS FILTROS -->
    <div class="grid grid-cols-[3fr,_2fr] gap-x-6 gap-y-2">
      <!-- TITLE -->
      <div class="row-span-2">
        <h1 class="text-teal-500 font-bold">FILTRA TUS PERSONAJES FAVORITOS</h1>

        <!-- DESCRIPTION -->
        <p class="text-gray-200 font-light text-xs">
          Utiliza nuestro sistema de filtrado para encontrar rápidamente tus personajes favoritos de
          Genshin Impact por elementos, rareza, arma y más. Personaliza tu búsqueda para obtener
          mejores resultados en segundos.
        </p>
      </div>

      <div class="row-span-3 grid grid-cols-[repeat(8,_1fr)] grid-rows-3 gap-2">
        <!-- RARITY FILTERS -->
        <div class="grid grid-cols-3 border rounded overflow-hidden col-span-3">
          <button
            :class="`p-2 text-white hover:bg-gray-600 border-r transition-all ${
              rarityFilterState.all ? 'bg-anemo/75' : ''
            }`"
            type="button"
            @click="() => onClickFilterAllButton(rarityFilterState)"
          >
            <i class="fas fa-asterisk"></i>
          </button>
          <button
            v-for="(value, i) of rarity"
            v-bind:key="value"
            :class="`p-2 hover:text-purple-500 text-gray-200 ${
              i === rarity.length - 1 ? '' : 'border-r'
            } ${rarityFilterState[value] ? 'bg-anemo/75' : ''}`"
            @click="() => onClickFilterButton(rarityFilterState, value)"
            type="button"
          >
            {{ value }}<i class="fas fa-star"></i>
          </button>
        </div>

        <!-- CLEAN BUTTON -->
        <div class="col-span-2 col-start-7 grid grid-cols-6 border rounded overflow-hidden">
          <button
            class="p-2 text-white hover:bg-gray-600 transition-all"
            type="button"
            @click="cleanFilters"
          >
            LIMPIAR
          </button>
        </div>

        <!-- WEAPONS FILTERS -->
        <div
          class="col-span-6 col-start-3 grid grid-cols-[repeat(6,_1fr)] border rounded overflow-hidden"
        >
          <!-- WEAPONS BUTTON ALL -->
          <button
            :class="`grid place-items-center p-2 text-gray-200 hover:bg-gray-600 border-r transition-all ${
              weaponsFilterState.all ? 'bg-teal-500' : ''
            }`"
            type="button"
            @click="() => onClickFilterAllButton(weaponsFilterState)"
          >
            <i class="fas fa-asterisk"></i>
          </button>

          <!-- WEAPONS BUTTONS -->
          <button
            v-for="({ name, imgSrc }, i) of weapons"
            v-bind:key="name"
            :class="`grid place-items-center p-2 hover:bg-gray-600 ${
              i === weapons.length - 1 ? '' : 'border-r'
            } ${weaponsFilterState[name] === true ? 'bg-teal-500' : ''}`"
            @click="() => onClickFilterButton(weaponsFilterState, name)"
            type="button"
          >
            <img class="w-5" :src="imgSrc" />
          </button>
        </div>

        <!-- ELEMENTS FILTERS -->
        <div class="col-span-8 grid grid-cols-[repeat(8,_1fr)] border rounded overflow-hidden">
          <button
            :class="`p-2 text-white hover:bg-gray-600 border-r transition-all ${
              elementsFilterState.all ? 'bg-anemo/75' : ''
            }`"
            type="button"
            @click="() => onClickFilterAllButton(elementsFilterState)"
          >
            <i class="fas fa-asterisk text-gray-200"></i>
          </button>
          <button
            v-for="({ name, imgSrc }, i) of elements"
            v-bind:key="name"
            :class="`grid place-items-center p-2 hover:bg-${name} ${
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
      </div>

      <!-- SEARCH INPUT -->
      <div>
        <input class="w-full" type="text" placeholder="Busca el personaje" />
      </div>
    </div>
  </header>
  <main class="max-w-5xl w-full p-8 m-auto">
    <div class="grid grid-cols-[repeat(auto-fill,_minmax(8rem,_1fr))] gap-5">
      <div
        v-for="(character, key) of getFilteredCharacters()"
        :key="key"
        class="aspect-square bg-zinc-800 rounded-xl overflow-hidden"
      >
        <img :src="character.src" :alt="character.name" />
      </div>
    </div>
  </main>
</template>
