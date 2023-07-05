<script lang="ts" setup>

const table1 = {
  title: 'Atributos Básicos',
  rows: [
    ['Vida Máx', '99999999'],
    ['ATQ', '99999999'],
    ['DEF', '99999999'],
    ['MAESTRÍA ELEMENTAL', '99999999'],
  ],
};

const table2 = {
  title: 'Atributos Avanzados',
  rows: [
    ['Prob.CRIT.', '50%'],
    ['Daño CRIT', '250%'],
    ['Bono de Curación', '99999999'],
    ['Recarga de Energía', '99999999'],
    ['Disminución de Tde', '99999999'],
    ['Protección de Escudddddddddddo', '99999999'],
    ['Prob.CRIT.', '50%'],
    ['Daño CRIT', '250%'],
    ['Bono de Curación', '99999999'],
    ['Recarga de Energía', '99999999'],
    ['Disminución de Tde', '99999999'],
    ['Protección de Escudo', '99999999'],
  ],
};

const table3 = {
  title: 'Atributos Avanzados',
  rows: [
    ['Bono de Daño (Elemento).', '99999999'],
    ['Res Elemento', '99999999'],
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
