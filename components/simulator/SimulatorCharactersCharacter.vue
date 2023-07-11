<script lang="ts" setup>
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const { selectedEntry, selectedEntryIndex, openSelectCharacterModal } = useSimulator();

const lvlsOptions = [
  '1/20', '20', '20/40', '40', '40/50', '50', '50/60', '60', '60/70', '70', '70/80', '80', '80/90', '90/90',
];

</script>

<template>
  <div v-if="selectedEntry && selectedEntryIndex" class="text-primary-500 grid md:grid-cols-2 xl:grid-cols-3 gap-10 rounded max-xs:bg-black-500 max-xs:p-4">
    <!-- CHARACTER COLUMN -->
    <div class="flex gap-3 grow justify-center items-center">
      <div class="aspect-square base-background-gradient flex-wrap cursor-pointer">
        <img
          alt="Select character"
          width="128"
          height="128"
          :src="selectedEntry.character.portraitImg"
          @click="openSelectCharacterModal(selectedEntryIndex)"
        >
      </div>
      <div class="grow flex flex-col gap-2">
        <!-- SELECT CHARACTER -->
        <button class="font-medium text-xs" @click="openSelectCharacterModal(selectedEntryIndex)">
          {{ selectedEntry!.character.name }}
        </button>
        <!-- SELECT LVL -->
        <BaseSelect
          :value="selectedEntry?.character.lvl"
          :options="lvlsOptions"
          :handler="(value: string) => { if (selectedEntry) selectedEntry.character.lvl = value }"
          class="font-medium text-xs"
        />
        <!-- SELECT .. -->
        <BaseSelect class="font-medium text-xs" />
        <p class="font-medium text-xs flex gap-2 items-center my-1">
          <FaIcon class="text-black-100" height="1.5em" :icon="faPaperPlane" /> {{ selectedEntry?.character.substat }}
        </p>
      </div>
    </div>
    <!-- WEAPON COLUMN -->
    <div class="flex gap-3 grow justify-center">
      <div class="h-full aspect-square base-background-gradient flex-wrap" />
      <div class="grow flex flex-col gap-2">
        <BaseSelect class="font-medium text-xs" />
        <BaseSelect class="font-medium text-xs" />
        <BaseSelect class="font-medium text-xs" />
        <div class="grid grid-cols-3 justify-items-center place-items-center">
          <p class="font-medium text-xs flex gap-2 items-center my-1">
            <FaIcon class="text-black-100" height="1.5em" :icon="faPaperPlane" /> {{ 'xx' }}
          </p>
          <hr class="border-r h-3/4 border-r-primary-500">
          <p class="font-medium text-xs flex gap-2 items-center my-1">
            <FaIcon class="text-black-100" height="1.5em" :icon="faPaperPlane" /> {{ 'yy' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
