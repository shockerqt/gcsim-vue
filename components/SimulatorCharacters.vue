<script lang="ts" setup>
import { TabButton } from '~/components/BaseTabs.vue';

const buttons: Ref<TabButton[]> = ref([
  {
    title: 'STATS',
    state: 'active',
  },
  {
    title: 'ARTIFACTS',
    state: 'inactive',
  },
  {
    title: 'CHARACTER',
    state: 'inactive',
  },
]);

</script>
<template>
  Characters
  <SimulatorCharactersPreviewButton />
  <hr class="border border-1 border-primary-500 w-full my-4">

  <div class="flex">
    <aside>
      <BaseTabs :buttons="buttons" :column="true" />
    </aside>
    <SimulatorCharactersStats v-if="buttons[0].state ===`active`" class="grow" />
    <SimulatorCharactersArtifacts v-if="buttons[1].state ===`active`" class="grow" />
    <SimulatorCharactersCharacter v-if="buttons[2].state ===`active`" class="grow" />
  </div>
</template>
