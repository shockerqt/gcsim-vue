<script setup>
const labels = [
  'Set',
  'Lvl',
  'Rarity',
  'Stats',
  'SubStats1',
  'SubStats2',
  'Substats3',
  'Substats4',
];
</script>

<template>
  <div>
    <header class="w-full h-28 flex justify-center items-center gap-10 mb-4">
      <div class="h-20 w-20 base-background-gradient border-4 border-primary-500" />
      <div class="h-20 w-20 base-background-gradient" />
      <div class="h-20 w-20 base-background-gradient" />
      <div class="h-20 w-20 base-background-gradient" />
      <div class="h-20 w-20 base-background-gradient" />
    </header>
    <!--buscar un select custom-->
    <main class="grid grid-cols-2 w-full grid-flow-col grid-rows-4 gap-3 text-primary-500 font-bold">
      <div v-for="label of labels" :key="label" class="flex items-center gap-10">
        <label class="font-bold capitalize text-sm w-16" for="artifactsSet">{{ label }}</label>
        <SimulatorSelect class="bg-black-600 px-2 py-1 capitalize font-medium rounded text-xs grow" />
      </div>
    </main>
  </div>
</template>
