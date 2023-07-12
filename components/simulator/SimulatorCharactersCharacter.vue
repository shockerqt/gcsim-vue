<script lang="ts" setup>
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const { selectedEntry, selectedEntryIndex, openSelectCharacterModal } =
  useSimulator();

const lvlsOptions = [
  '1/20',
  '20',
  '20/40',
  '40',
  '40/50',
  '50',
  '50/60',
  '60',
  '60/70',
  '70',
  '70/80',
  '80',
  '80/90',
  '90/90',
];
</script>

<template>
  <div
    v-if="selectedEntry && selectedEntryIndex"
    class="grid gap-10 rounded text-primary-500 max-xs:bg-black-500 max-xs:p-4 md:grid-cols-2 xl:grid-cols-3"
  >
    <!-- CHARACTER COLUMN -->
    <div class="flex grow items-center justify-center gap-3">
      <div
        class="base-background-gradient aspect-square cursor-pointer flex-wrap"
      >
        <img
          alt="Select character"
          width="128"
          height="128"
          :src="selectedEntry.character.portraitImg"
          @click="openSelectCharacterModal(selectedEntryIndex)"
        />
      </div>
      <div class="flex grow flex-col gap-2">
        <!-- SELECT CHARACTER -->
        <button
          class="text-xs font-medium"
          @click="openSelectCharacterModal(selectedEntryIndex)"
        >
          {{ selectedEntry!.character.name }}
        </button>
        <!-- SELECT LVL -->
        <BaseSelect
          :value="selectedEntry?.character.lvl"
          :options="lvlsOptions"
          :handler="(value: string) => { if (selectedEntry) selectedEntry.character.lvl = value }"
          class="text-xs font-medium"
        />
        <!-- SELECT .. -->
        <BaseSelect class="text-xs font-medium" />
        <p class="my-1 flex items-center gap-2 text-xs font-medium">
          <FaIcon class="text-black-100" height="1.5em" :icon="faPaperPlane" />
          {{ selectedEntry?.character.substat }}
        </p>
      </div>
    </div>
    <!-- WEAPON COLUMN -->
    <div class="flex grow justify-center gap-3">
      <div class="base-background-gradient aspect-square h-full flex-wrap" />
      <div class="flex grow flex-col gap-2">
        <BaseSelect class="text-xs font-medium" />
        <BaseSelect class="text-xs font-medium" />
        <BaseSelect class="text-xs font-medium" />
        <div class="grid grid-cols-3 place-items-center justify-items-center">
          <p class="my-1 flex items-center gap-2 text-xs font-medium">
            <FaIcon
              class="text-black-100"
              height="1.5em"
              :icon="faPaperPlane"
            />
            {{ 'xx' }}
          </p>
          <hr class="h-3/4 border-r border-r-primary-500" />
          <p class="my-1 flex items-center gap-2 text-xs font-medium">
            <FaIcon
              class="text-black-100"
              height="1.5em"
              :icon="faPaperPlane"
            />
            {{ 'yy' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
