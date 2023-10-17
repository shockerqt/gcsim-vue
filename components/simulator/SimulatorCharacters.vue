<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { TabButton } from '~/components/BaseTabs.vue';

const { selectedEntry } = useSimulator();

const breakpoints = useBreakpoints(breakpointsTailwind);
const greaterThanLg = breakpoints.greater('lg');

const tabButtons: Ref<TabButton[]> = ref([
  {
    title: 'CHARACTER',
    state: 'active',
  },
  {
    title: 'ARTIFACTS',
    state: 'inactive',
  },
  {
    title: 'STATS',
    state: 'inactive',
  },
]);
</script>
<template>
  <SimulatorCharactersCharacterModal />
  <SimulatorCharactersCharacterWeaponModal />
  <SimulatorCharactersArtifactModal />
  <SimulatorCharactersPreviewButton />
  <hr class="my-4 w-full border border-b-0 border-t-2 border-primary-500" />

  <div v-if="selectedEntry" class="flex flex-col gap-x-8 lg:flex-row">
    <aside class="min-w-[8rem]">
      <BaseTabs class="mb-4" :buttons="tabButtons" :column="greaterThanLg" />
    </aside>
    <div class="grow">
      <SimulatorCharactersCharacter
        v-if="tabButtons[0].state === `active`"
        class="grow"
      />
      <SimulatorCharactersArtifacts
        v-if="tabButtons[1].state === `active`"
        class="grow"
      />
      <SimulatorCharactersStats
        v-if="tabButtons[2].state === `active`"
        class="grow"
      />
    </div>
  </div>
</template>
