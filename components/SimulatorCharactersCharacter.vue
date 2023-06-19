<template>
  <div class="text-primary-500 font-bold grid grid-cols-3 gap-10">
    <!--personaje-->
    <div class="flex gap-3">
      <div class="w-24 h-24 base-background-gradient " />
      <div class="grow grid ">
        <select id="characterName" />

        <select id="characterLvl" />

        <select id="characterConstelation" />

        <div class="w-5 h-5 bg-error-500" />
      </div>
    </div>
    <!--arma-->
    <div class="flex gap-3">
      <div class="w-24 h-24 base-background-gradient " />
      <div class="grow grid">
        <select id="weaponName" />

        <select id="weaponLvl" />

        <select id="weaponRefinamiento" />

        <div class="w-5 h-5 bg-error-500" />
      </div>
    </div>
    <!--skill-->
    <div class="grid grid-cols-2">
      <label for="characterSkill1">Basic</label>
      <select id="characterSkill1" />

      <label for="characterSkill2">Elemental</label>
      <select id="characterSkill2" />

      <label for="characterSkill3">Burst</label>
      <select id="characterSkill3" />
      <div class="h-5" />
    </div>
  </div>
</template>
