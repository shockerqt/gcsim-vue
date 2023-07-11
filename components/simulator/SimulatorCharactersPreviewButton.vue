<script lang="ts" setup>
import { faPlus, faStar } from '@fortawesome/free-solid-svg-icons';

const { entries, selectedEntryIndex, openSelectCharacterModal } = useSimulator();

const clickHandler = (index: number) => {
  selectedEntryIndex.value = index;
  if (!entries.value[index]) { openSelectCharacterModal(index); }
};

</script>

<template>
  <div class="grid grid-cols-4 gap-2 sm:gap-4">
    <div v-for="(character, i) in entries" :key="i" class="grow">
      <!-- PREVIEW -->
      <button
        class="relative grid place-items-center items-center h-full w-full base-background-gradient"
        :class="{ 'outline outline-2 outline-primary-500': selectedEntryIndex === i }"
        @click="clickHandler(i)"
      >
        <template v-if="character">
          <!-- CHARACTER IMAGE + DETAILS -->
          <div class="flex justify-center lg:justify-between base-background-gradient w-full lg:px-3">
            <!-- IMAGE -->
            <img class="w-full xs:w-24 aspect-square" :src="entries[i]?.character.portraitImg" alt="">
            <div class="grid justify-around">
              <!-- STARS -->
              <div class="hidden lg:flex gap-1 text-primary-500 items-center justify-end">
                <FaIcon v-for="k of Array(entries[i]?.character.rarity).fill(0)" :key="k" :icon="faStar" />
              </div>
              <!-- SET + WEAPONS -->
              <div class="hidden lg:flex justify-end items-center gap-2">
                <div v-for="k of Array(3)" :key="k" class="h-8 w-8 border-2 border-primary-500 bg-error-500">
                  {{ k }}
                </div>
              </div>
            </div>
          </div>
          <!-- CHARACTER NAME -->
          <div class="font-medium py-1 bg-black-600 text-xs lg:text-sm lg:px-3 w-full flex gap-4 items-center justify-center lg:justify-between">
            <p class="text-black-100">
              {{ entries[i]?.character.name }}
            </p>
            <p class="hidden lg:block text-primary-500">
              {{ entries[i]?.character.lvl }}
            </p>
          </div>
        </template>
        <!-- ADD -->
        <template v-else>
          <div class="py-3 w-full grid place-items-center">
            <div class="text-black-100 w-full aspect-square xs:w-24 grid place-items-center">
              <FaIcon class="text-4xl xs:text-6xl" :icon="faPlus" />
            </div>
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
