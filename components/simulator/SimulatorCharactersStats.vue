<script lang="ts" setup>
import { Table } from './SimulatorCharactersStatsTable.vue';
import { SimulatorEntry } from 'composables/useSimulator';

const { selectedEntry } = useSimulator();

const table1 = (characterStats: SimulatorEntry['stats']): Table => ({
  title: 'Atributos Básicos',
  rows: [
    ['Vida Máx', characterStats.hp],
    ['ATQ', characterStats.atk],
    ['DEF', characterStats.def],
    ['MAESTRÍA ELEMENTAL', 0],
  ],
});

const table2 = (characterStats: SimulatorEntry['stats']): Table => ({
  title: 'Atributos Avanzados',
  rows: [
    ['Prob.CRIT.', `${characterStats.critRate * 100}%`],
    ['Daño CRIT', `${characterStats.critDmg * 100}%`],
    ['Bono de Curación', 0],
    ['Recarga de Energía', '100%'],
    ['Disminución de Tde', 0],
    ['Protección de Escudo', 0],
  ],
});

const table3: Table = {
  title: 'Atributos Avanzados',
  rows: [
    ['Bono de Daño (Elemento).', '0%'],
    ['Res Elemento', '0%'],
  ],
};
</script>

<template>
  <div v-if="selectedEntry" class="flex gap-4 items-start flex-wrap max-w-3xl m-auto">
    <div class="flex grow flex-col gap-4">
      <SimulatorCharactersStatsTable :table="table1(selectedEntry.stats)" />
      <SimulatorCharactersStatsTable :table="table3" />
    </div>
    <div class="grow">
      <SimulatorCharactersStatsTable :table="table2(selectedEntry.stats)" />
    </div>
  </div>
</template>
