<script setup>
import characters from '@/assets/characters.json'
</script>

<template>
  <header class="max-w-5xl w-full p-8 m-auto">
    <div>
      <h1 class="text-teal-500 font-bold">FILTRA TUS PERSONAJES FAVORITOS</h1>
      <p class="text-gray-200">
        Utiliza nuestro sistema de filtrado para encontrar rápidamente tus personajes favoritos de
        Genshin Impact por elementos, rareza, arma y más. Personaliza tu búsqueda para obtener
        mejores resultados en segundos.
      </p>
    </div>
    <div>
      <input type="text" placeholder="Busca el personaje" />
    </div>
    <div>
      <!-- filtros -->
      <div class="flex">
        <button class="p-2" type="button"><i class="fas fa-asterisk"></i></button>
        <button class="p-2" type="button">4<i class="fas fa-star"></i></button>
        <button class="p-2" type="button">5<i class="fas fa-star"></i></button>
      </div>
      <div class="flex border w-fit rounded overflow-hidden">
        <button class="p-2 hover:bg-gray-700/30 border-r" type="button">
          <object class="w-5 fill-white text-white" data="/src/assets/Elements/Element_Anemo.svg" />
        </button>
        <button class="p-2 hover:bg-gray-700/30 border-r text-white" type="button">
          <object class="w-5 fill-white" data="/src/assets/Elements/Element_Cryo.svg" />
        </button>
        <button class="p-2 hover:bg-gray-700/30 border-r" type="button">
          <object class="w-5 fill-white" data="/src/assets/Elements/Element_Dendro.svg" />
        </button>
        <button class="p-2 hover:bg-gray-700/30 border-r" type="button">
          <object class="w-5 fill-white" data="/src/assets/Elements/Element_Electro.svg" />
        </button>
        <button class="p-2 hover:bg-gray-700/30 border-r" type="button">
          <object class="w-5 fill-white" data="/src/assets/Elements/Element_Geo.svg" />
        </button>
        <button class="p-2 hover:bg-gray-700/30 border-r" type="button">
          <object class="w-5 fill-white" data="/src/assets/Elements/Element_Hydro.svg" />
        </button>
        <button class="p-2 hover:bg-gray-700/30" type="button">
          <object class="w-5 fill-white" data="/src/assets/Elements/Element_Pyro.svg" />
        </button>
      </div>
      <div class="flex">
        <button class="w-8 px-1" type="button">
          <img src="@/assets/Weapon/Icon_Bow.webp" />
        </button>
        <button class="w-8 px-1" type="button">
          <img src="@/assets/Weapon/Icon_Catalyst.webp" />
        </button>
        <button class="w-8 px-1" type="button">
          <img src="@/assets/Weapon/Icon_Claymore.webp" />
        </button>
        <button class="w-8 px-1" type="button">
          <img src="@/assets/Weapon/Icon_Polearm.webp" />
        </button>
        <button class="w-8 px-1" type="button">
          <img src="@/assets/Weapon/Icon_Sword.webp" />
        </button>
      </div>
      <div>
        <button class="text-gray-200" type="button">LIMPIAR</button>
      </div>
    </div>
  </header>
  <main class="max-w-5xl w-full p-8 m-auto">
    <div class="grid grid-cols-[repeat(auto-fill,_minmax(8rem,_1fr))] gap-5">
      <div
        v-for="(character, key) of characters"
        :key="key"
        class="aspect-square bg-zinc-800 rounded-xl overflow-hidden"
      >
        <img :src="character.src" :alt="character.name" />
      </div>
    </div>
  </main>
</template>
