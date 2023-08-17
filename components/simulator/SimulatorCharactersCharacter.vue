<script lang="ts" setup>
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const { selectedEntry, selectedEntryIndex, openSelectCharacterModal, openSelectWeaponModal } =
  useSimulator();

const characterLvlsOptions = [
  { label: '1/20', value: '1/20' },
  { label: '20', value: '20' },
  { label: '20/40', value: '20/40' },
  { label: '40', value: '40' },
  { label: '40/50', value: '40/50' },
  { label: '50', value: '50' },
  { label: '50/60', value: '50/60' },
  { label: '60', value: '60' },
  { label: '60/70', value: '60/70' },
  { label: '70', value: '70' },
  { label: '70/80', value: '70/80' },
  { label: '80', value: '80' },
  { label: '80/90', value: '80/90' },
  { label: '90/90', value: '90/90' },
];

const weaponLvlsOptions = [
  { label: '1/20', value: '1/20' },
  { label: '20', value: '20' },
  { label: '20/40', value: '20/40' },
  { label: '40', value: '40' },
  { label: '40/50', value: '40/50' },
  { label: '50', value: '50' },
  { label: '50/60', value: '50/60' },
  { label: '60', value: '60' },
  { label: '60/70', value: '60/70' },
  { label: '70', value: '70' },
  { label: '70/80', value: '70/80' },
  { label: '80', value: '80' },
  { label: '80/90', value: '80/90' },
  { label: '90/90', value: '90/90' },
];

const constellations = [
  { label: 'C0', value: 0 },
  { label: 'C1', value: 1 },
  { label: 'C2', value: 2 },
  { label: 'C3', value: 3 },
  { label: 'C4', value: 4 },
  { label: 'C5', value: 5 },
  { label: 'C6', value: 6 },
];

const refinements = [
  { label: 'R1', value: 1 },
  { label: 'R2', value: 2 },
  { label: 'R3', value: 3 },
  { label: 'R4', value: 4 },
  { label: 'R5', value: 5 },
];
</script>

<template>
  <div v-if="selectedEntry && selectedEntryIndex != null"
    class="grid gap-10 rounded text-primary-500 max-xs:bg-black-500 max-xs:p-4 md:grid-cols-2 xl:grid-cols-3">
    <!-- CHARACTER COLUMN -->
    <div class="flex grow items-center justify-center gap-3">
      <div class="base-background-gradient aspect-square cursor-pointer flex-wrap">
        <img alt="Select character" width="128" height="128" :src="selectedEntry.character.portraitImg"
          @click="openSelectCharacterModal(selectedEntryIndex)" />
      </div>
      <div class="flex grow flex-col gap-2">
        <!-- SELECT CHARACTER -->
        <button class="text-xs font-medium" @click="openSelectCharacterModal(selectedEntryIndex)">
          {{ selectedEntry.character.name }}
        </button>
        <!-- SELECT LVL -->
        <BaseSelect v-model="selectedEntry.character.lvl" :options="characterLvlsOptions" class="text-xs font-medium" />
        <!-- SELECT CONSTELLATIONS -->
        <BaseSelect v-model="selectedEntry.character.cons" :options="constellations" class="text-xs font-medium" />
        <p class="my-1 flex items-center gap-2 text-xs font-medium">
          <FaIcon class="text-black-100" height="1.5em" :icon="faPaperPlane" />
          {{ selectedEntry.character.substat }}
        </p>
      </div>
    </div>
    <!-- WEAPON COLUMN -->
    <div class="flex grow justify-center gap-3">
      <div class="base-background-gradient aspect-square h-full flex-wrap" />
      <div class="flex grow flex-col gap-2">
        <button class="text-xs font-medium" @click="openSelectWeaponModal(selectedEntryIndex)">
          {{ selectedEntry.weapon.name }}
        </button>
        <!-- SELECT LVL -->
        <BaseSelect v-model="selectedEntry.weapon.lvl" :options="weaponLvlsOptions" class="text-xs font-medium" />
        <BaseSelect v-model="selectedEntry.weapon.refine" :options="refinements" class="text-xs font-medium" />
        <div class="grid grid-cols-3 place-items-center justify-items-center">
          <p class="my-1 flex items-center gap-2 text-xs font-medium">
            <FaIcon class="text-black-100" height="1.5em" :icon="faPaperPlane" />
            {{ selectedEntry.weapon.mainStat }}
          </p>
          <hr class="h-3/4 border-r border-r-primary-500" />
          <p class="my-1 flex items-center gap-2 text-xs font-medium">
            <FaIcon class="text-black-100" height="1.5em" :icon="faPaperPlane" />
            {{ selectedEntry.weapon.substat }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
