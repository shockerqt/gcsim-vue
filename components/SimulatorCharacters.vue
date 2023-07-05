<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { TabButton } from '~/components/BaseTabs.vue';

const breakpoints = useBreakpoints(breakpointsTailwind);

const greaterThanLg = breakpoints.greater('lg');

interface Artifact {
  slug: string;
  set: string;
  lvl: string;
  rarity: string;
}

interface CharacterState {
  slug: string;
  artifacts: (Artifact | null)[];
}

export type CharactersState = (CharacterState | null)[];

const charactersState = useState<CharactersState>('simulator-characters', () => ([
  {
    slug: 'aether',
    artifacts: [
      null,
      null,
      null,
      null,
      null,
    ],
  },
  null,
  null,
  null,
]));

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
  <SimulatorCharactersPreviewButton :characters-state="charactersState" />
  <hr class="border border-t-2 border-b-0 border-primary-500 w-full my-4">

  <div class="flex gap-x-8 flex-col lg:flex-row">
    <aside class="min-w-[8rem]">
      <BaseTabs class="mb-4" :buttons="tabButtons" :column="greaterThanLg" />
    </aside>
    <div class="grow">
      <SimulatorCharactersCharacter v-if="tabButtons[0].state ===`active`" class="grow" />
      <SimulatorCharactersArtifacts v-if="tabButtons[1].state ===`active`" class="grow" />
      <SimulatorCharactersStats v-if="tabButtons[2].state ===`active`" class="grow" />
    </div>
  </div>
</template>
