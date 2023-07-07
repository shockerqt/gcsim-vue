<script lang="ts" setup>
import { SimulatorEntry } from 'composables/useSimulator';

const { state, active } = useSimulator();

const activeCharacterStats = state.value[active.value].stats as SimulatorEntry['stats'];

const table1 = {
  title: 'Atributos Básicos',
  rows: [
    ['Vida Máx', activeCharacterStats.hp],
    ['ATQ', activeCharacterStats.atk],
    ['DEF', activeCharacterStats.def],
    ['MAESTRÍA ELEMENTAL', 0],
  ],
};

const table2 = {
  title: 'Atributos Avanzados',
  rows: [
    ['Prob.CRIT.', `${activeCharacterStats.critRate * 100}%`],
    ['Daño CRIT', `${activeCharacterStats.critDmg * 100}%`],
    ['Bono de Curación', 0],
    ['Recarga de Energía', '100%'],
    ['Disminución de Tde', 0],
    ['Protección de Escudo', 0],
  ],
};

const table3 = {
  title: 'Atributos Avanzados',
  rows: [
    ['Bono de Daño (Elemento).', '0%'],
    ['Res Elemento', '0%'],
  ],
};
</script>

<template>
  <div class="flex gap-4 items-start flex-wrap max-w-3xl m-auto">
    <div class="flex grow flex-col gap-4">
      <SimulatorCharactersStatsTable :table="table1" />
      <SimulatorCharactersStatsTable :table="table3" />
    </div>
    <div class="grow">
      <SimulatorCharactersStatsTable :table="table2" />
    </div>
  </div>
</template>
