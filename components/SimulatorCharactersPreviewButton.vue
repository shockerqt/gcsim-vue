<script lang="ts" setup>
import { faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { CharactersState } from './SimulatorCharacters.vue';

const charactersState = useState<CharactersState>('simulator-characters');

const selectedCharacter = useState<number>('simulator-selected-character');

</script>

<template>
  <div class="grid grid-cols-4 gap-2 sm:gap-4">
    <div v-for="(character, i) in charactersState" :key="i" class="grow">
      <!-- PREVIEW -->
      <button
        class="relative grid place-items-center items-center h-full w-full base-background-gradient"
        :class="{ 'outline outline-2 outline-primary-500': selectedCharacter === i }"
        @click="() => selectedCharacter = i"
      >
        <template v-if="character">
          <!-- CHARACTER IMAGE + DETAILS -->
          <div class="flex justify-center lg:justify-between base-background-gradient w-full lg:px-3">
            <!-- IMAGE -->
            <div>
              <img class="w-20 xs:w-24 aspect-square" src="https://drive.google.com/uc?id=1pjRW-ax7EKSQBInp75df_xh8cl0Rqak3" alt="">
            </div>
            <div class="grid justify-around">
              <!-- STARS -->
              <div class="hidden lg:flex gap-1 text-primary-500 items-center justify-end">
                <FaIcon v-for="i of [1,2,3,4,5]" :key="i" :icon="faStar" />
              </div>
              <!-- SET + WEAPONS -->
              <div class="hidden lg:flex justify-end items-center gap-2">
                <div v-for="i of [1,2,3]" :key="i" class="h-8 w-8 border-2 border-primary-500 bg-error-500">
                  {{ i }}
                </div>
              </div>
            </div>
          </div>
          <!-- CHARACTER NAME -->
          <div class="font-medium py-1 bg-black-600 text-xs lg:text-sm lg:px-3 w-full flex gap-4 items-center justify-center lg:justify-between">
            <p class="text-black-100">
              Sangonomiya Kokomi
            </p>
            <p class="hidden lg:block text-primary-500">
              90
            </p>
          </div>
        </template>
        <!-- ADD -->
        <template v-else>
          <div class="text-black-100">
            <FaIcon class="text-5xl xs:text-6xl w-20 xs:w-24 aspect-square" :icon="faPlus" />
          </div>
        </template>
      </button>
      <!-- <div>
        <FaIcon v-if="selectedCharacter === i" class="text-center w-full text-primary-500 text-4xl" :icon="faCaretDown" />
      </div> -->
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
