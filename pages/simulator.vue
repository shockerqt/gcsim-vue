<script lang="ts" setup>
import { TabButton } from '~/components/BaseTabs.vue';
import { generateInputValues2 } from '~/utils/artifacts';

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

const inputValues = generateInputValues2([4.08, 4.66, 5.25, 5.83], 6);
</script>

<template>
  <p>{{ inputValues.length }}</p>
  {{ inputValues }}
  <div class="p-4">
    <BaseTabs class="my-4" :buttons="buttons" />
    <SimulatorCharacters v-if="buttons[0].state === 'active'" />
    <SimulatorEnemies v-if="buttons[1].state === 'active'" />
    <SimulatorRotation v-if="buttons[2].state === 'active'" />
  </div>
</template>
