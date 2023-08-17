<script setup lang="ts">
import { TabButton } from 'components/BaseTabs.vue';

const tabButtons: Ref<TabButton[]> = ref([
  {
    title: 'CHARACTERS',
    state: 'active',
  },
  {
    title: 'WEAPONS',
    state: 'inactive',
  },
]);
</script>

<template>
  <div class="p-4">
    <BaseTabs class="mb-4" :buttons="tabButtons" />
    <template v-if="tabButtons[0].state === `active`">
      <header class="mx-auto my-8 w-full">
        <!-- TITLE & DESCRIPTION -->
        <div class="row-span-2 my-2">
          <a class="my-1 text-xl font-bold text-black-100 hover:text-primary-100 active:text-primary-500">
            PERSONAJES
          </a>

          <!-- DESCRIPTION -->
          <p class="text-normal font-sm max-w-2xl text-justify text-black-100">
            Utiliza nuestro sistema de filtrado para encontrar rápidamente tus
            personajes favoritos de Genshin Impact por elementos, rareza, arma y
            más. Personaliza tu búsqueda para obtener mejores resultados en
            segundos.
          </p>
        </div>
      </header>
      <CharactersList :handler="(slug) => navigateTo(`/characters/${slug}`)" />
    </template>
    <template v-if="tabButtons[1].state === `active`">
      <header class="mx-auto my-8 w-full">
        <!-- TITLE & DESCRIPTION -->
        <div class="row-span-2 my-2">
          <a class="my-1 text-xl font-bold text-black-100 hover:text-primary-100 active:text-primary-500">
            ARMAS
          </a>

          <!-- DESCRIPTION -->
          <p class="text-normal font-sm max-w-2xl text-justify text-black-100">
            Utiliza nuestro sistema de filtrado para encontrar rápidamente tus
            armas favoritas de Genshin Impact por rareza, tipo, substat y más.
            Personaliza tu búsqueda para obtener mejores resultados en segundos.
          </p>
        </div>
      </header>
      <WeaponsList :handler="(slug) => navigateTo(`/weapons/${slug}`)" />
    </template>
  </div>
</template>
