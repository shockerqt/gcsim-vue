<script lang="ts" setup>
import { TabButton } from '~/components/BaseTabs.vue';

const buttons: Ref<TabButton[]> = ref([
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
  Characters
  <SimulatorCharactersPreviewButton />
  <hr class="border border-1 border-primary-500 w-full my-4">

  <div class="flex gap-8">
    <aside>
      <BaseTabs :buttons="buttons" :column="true" />
    </aside>
    <div class="grow">
      <SimulatorCharactersCharacter v-if="buttons[0].state ===`active`" class="grow" />
      <SimulatorCharactersArtifacts v-if="buttons[1].state ===`active`" class="grow" />
      <SimulatorCharactersStats v-if="buttons[2].state ===`active`" class="grow" />
    </div>
  </div>
</template>
