<script lang="ts" setup>
import { faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
</script>

<template>
  <div class="flex gap-4">
    <!-- PREVIEW -->
    <button v-for="i in [1,2,3,4]" class="flex flex-col">
      <div class="preview-button-header base-background-gradient gap-1 px-3 gap-x-4 w-64">
        <div class="preview-button-header-img">
          <img class="w-24 h-24" src="https://drive.google.com/uc?id=1pjRW-ax7EKSQBInp75df_xh8cl0Rqak3" alt="">
        </div>
        <div class="preview-button-header-stars flex gap-1  text-primary-500 items-center justify-end">
          <!-- <font-awesome-icon class="text-base" icon="fas fa-star" /> -->
          <FaIcon :icon="faStar" />
          <FaIcon :icon="faStar" />
          <FaIcon :icon="faStar" />
          <FaIcon :icon="faStar" />
          <FaIcon :icon="faStar" />
        </div>
        <div class="preview-button-header-build flex justify-end items-center gap-2">
          <div class="h-8 w-8 border-2 border-primary-500 bg-error-500" />
          <div class="h-8 w-8 border-2 border-primary-500 bg-error-500">
            cd
          </div>
          <div class="h-8 w-8 border-2 border-primary-500 bg-error-500">
            d
          </div>
        </div>
      </div>
      <div class="text-sm px-3 font-medium bg-black-600 w-full flex gap-4 p-1 items-center justify-between">
        <div class="text-black-100">
          Sangonomiya Kokomi
        </div>
        <p class="text-primary-500">
          90
        </p>
      </div>
    </button>
    <!-- ADD -->
    <!-- <button class="base-background-gradient  w-80  text-black-100 hover:text-primary-100">
      <FaIcon class="text-6xl" :icon="faPlus" />
    </button>
    <button class="base-background-gradient  w-80  text-black-100 hover:text-primary-100">
      <FaIcon class="text-6xl" :icon="faPlus" />
    </button>
    <button class="base-background-gradient  w-80  text-black-100 hover:text-primary-100">
      <FaIcon class="text-6xl" :icon="faPlus" />
    </button> -->
  </div>
</template>

<style>
  .preview-button-header {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      "img stars"
      "img build";
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
