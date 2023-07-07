<script setup lang="ts">
</script>

<template>
  <div class="p-4">
    <header class="w-full mx-auto my-8">
      <!-- TITLE & DESCRIPTION -->
      <div class="row-span-2 my-2">
        <a class="text-black-100 text-xl font-bold my-1 hover:text-primary-100 active:text-primary-500">
          PERSONAJES
        </a>

        <!-- DESCRIPTION -->
        <p class="text-black-100 text-normal font-sm max-w-2xl text-justify">
          Utiliza nuestro sistema de filtrado para encontrar rápidamente tus personajes favoritos de
          Genshin Impact por elementos, rareza, arma y más. Personaliza tu búsqueda para obtener
          mejores resultados en segundos.
        </p>
      </div>
    </header>
    <CharactersList :handler="(slug) => navigateTo(`/characters/${slug}`)" />
  </div>
</template>
