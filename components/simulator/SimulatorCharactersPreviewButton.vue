<script lang="ts" setup>
import { faPlus, faStar } from '@fortawesome/free-solid-svg-icons';

const { entries, selectedEntryIndex, openSelectCharacterModal } =
  useSimulator();

const clickHandler = (index: number) => {
  selectedEntryIndex.value = index;
  if (!entries.value[index]) {
    openSelectCharacterModal(index);
  }
};
</script>

<template>
  <div class="grid grid-cols-4 gap-2 sm:gap-4">
    <div v-for="(character, i) in entries" :key="i" class="grow">
      <!-- PREVIEW -->
      <button
        class="base-background-gradient relative grid h-full w-full place-items-center items-center"
        :class="{
          'outline outline-2 outline-primary-500': selectedEntryIndex === i,
        }"
        @click="clickHandler(i)"
      >
        <template v-if="character">
          <!-- CHARACTER IMAGE + DETAILS -->
          <div
            class="base-background-gradient flex w-full justify-center lg:justify-between lg:px-3"
          >
            <!-- IMAGE -->
            <img
              class="aspect-square w-full xs:w-24"
              :src="entries[i]?.character.portraitImg"
              alt=""
            />
            <div class="grid justify-around">
              <!-- STARS -->
              <div
                class="hidden items-center justify-end gap-1 text-primary-500 lg:flex"
              >
                <FaIcon
                  v-for="k of Array(entries[i]?.character.rarity).fill(0)"
                  :key="k"
                  :icon="faStar"
                />
              </div>
              <!-- SET + WEAPONS -->
              <div class="hidden items-center justify-end gap-2 lg:flex">
                <div
                  v-for="k of Array(3)"
                  :key="k"
                  class="h-8 w-8 border-2 border-primary-500 bg-error-500"
                >
                  {{ k }}
                </div>
              </div>
            </div>
          </div>
          <!-- CHARACTER NAME -->
          <div
            class="flex w-full items-center justify-center gap-4 bg-black-600 py-1 text-xs font-medium lg:justify-between lg:px-3 lg:text-sm"
          >
            <p class="text-black-100">
              {{ entries[i]?.character.name }}
            </p>
            <p class="hidden text-primary-500 lg:block">
              {{ entries[i]?.character.lvl }}
            </p>
          </div>
        </template>
        <!-- ADD -->
        <template v-else>
          <div class="grid w-full place-items-center py-3">
            <div
              class="grid aspect-square w-full place-items-center text-black-100 xs:w-24"
            >
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
      'img stars'
      'img build';
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
