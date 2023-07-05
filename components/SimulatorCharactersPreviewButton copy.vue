<script lang="ts" setup>
import { faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { CharactersState } from './SimulatorCharacters.vue';

defineProps<{ charactersState: CharactersState }>();

</script>

<template>
  <div class="flex gap-3 xl:gap-4">
    <!-- PREVIEW -->
    <div v-for="(character, i) in charactersState" :key="i">
      <button v-if="character" class="">
        <div class="preview-button-header base-background-gradient gap-1 xl:px-3 gap-x-4 xl:w-64">
          <div class="preview-button-header-img w-24">
            <img class="w-24 h-24" src="https://drive.google.com/uc?id=1pjRW-ax7EKSQBInp75df_xh8cl0Rqak3" alt="">
          </div>
          <div class="hidden xl:flex preview-button-header-stars gap-1 text-primary-500 items-center justify-end">
            <!-- <font-awesome-icon class="text-base" icon="fas fa-star" /> -->
            <FaIcon :icon="faStar" />
            <FaIcon :icon="faStar" />
            <FaIcon :icon="faStar" />
            <FaIcon :icon="faStar" />
            <FaIcon :icon="faStar" />
          </div>
          <div class="hidden xl:flex preview-button-header-build justify-end items-center gap-2">
            <div class="h-8 w-8 border-2 border-primary-500 bg-error-500" />
            <div class="h-8 w-8 border-2 border-primary-500 bg-error-500">
              cd
            </div>
            <div class="h-8 w-8 border-2 border-primary-500 bg-error-500">
              d
            </div>
          </div>
        </div>
        <div class="text-xs xl:text-sm xl:px-3 font-medium bg-black-600 w-full flex gap-4 items-center justify-between">
          <p class="text-black-100 w-24 xl:w-full">
            Sangonomiya Kokomi
          </p>
          <p class="hidden xl:block text-primary-500">
            90
          </p>
        </div>
      </button>
      <!-- ADD -->
      <button v-else class="h-full">
        <div class="xl:px-3 text-black-100 h-full grid place-items-center base-background-gradient gap-1 gap-x-4">
          <div class="w-24 xl:w-64">
            <FaIcon class="text-6xl" :icon="faPlus" />
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<style>
  @media screen and (min-width: 1280px) {
    .preview-button-header {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-rows: 1fr 1fr;
      grid-template-areas:
        "img stars"
        "img build";
    }
  }

  .preview-button-header-img {
    grid-area: img;
  }

  .preview-button-header-stars {
    grid-area: stars;
  }

  .preview-button-header-build {
    grid-area: build;
  }
</style>
