<template>
  <div>
    <header class="w-full h-28 flex justify-center items-center gap-10 mb-4">
      <div class="h-20 w-20 base-background-gradient border border-4 border-primary-500" />
      <div class="h-20 w-20 base-background-gradient" />
      <div class="h-20 w-20 base-background-gradient" />
      <div class="h-20 w-20 base-background-gradient" />
      <div class="h-20 w-20 base-background-gradient" />
    </header>
    <!--buscar un select custom-->
    <main class="grid grid-cols-2 w-full grid-flow-col grid-rows-4 gap-3 text-black-100 font-bold">
      <div class="flex items-center">
        <label class="w-24" for="artifactsSet">SET</label>
        <select id="artifactsSet" class="grow" />
      </div>
      <div class="flex items-center ">
        <label class="w-24" for="artifactsLvl">LVL</label>
        <select id="artifactsLvl" class="grow" />
      </div>
      <div class="flex items-center">
        <label class="w-24" for="artifactsRarity">RARITY</label>
        <select id="artifactsRarity" class="grow" />
      </div>
      <div class="flex items-center">
        <label class="w-24" for="artifactsStat">STATS</label>
        <select id="artifactsStat" class="grow" />
      </div>
      <div class="flex items-center">
        <label class="w-24" for="artifactsSubStat1">substats 1</label>
        <select id="artifactsSubStat1" class="grow" />
      </div>
      <div class="flex items-center">
        <label class="w-24" for="artifactsSubStat2">substats 2</label>
        <select id="artifactsSubStat2" class="grow" />
      </div>
      <div class="flex items-center">
        <label class="w-24" for="artifactsSubStat3">substats 3</label>
        <select id="artifactsSubStat3" class="grow" />
      </div>
      <div class="flex items-center">
        <label class="w-24" for="artifactsSubStat4">substats 4</label>
        <select id="artifactsSubStat4" class="grow" />
      </div>
    </main>
  </div>
</template>
