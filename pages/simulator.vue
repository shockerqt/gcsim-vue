<script lang="ts" setup>
import { TabButton } from '~/components/BaseTabs.vue';

const buttons: Ref<TabButton[]> = ref([
  {
    title: 'PERSONAJES',
    state: 'active',
  },
  {
    title: 'ENEMIGOS',
    state: 'inactive',
  },
  {
    title: 'ROTACIÓN',
    state: 'inactive',
  },
]);

</script>

<template>
  <div class="p-4">
    Simulator

    <BaseTabs :buttons="buttons" />
    <SimulatorCharacters v-if="buttons[0].state === 'active'" />
    <SimulatorEnemies v-if="buttons[1].state === 'active'" />
    <SimulatorRotation v-if="buttons[2].state === 'active'" />
  </div>
</template>
