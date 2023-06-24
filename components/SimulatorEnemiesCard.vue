<template>
  <div class="w-full bg-error-500">
    asd
    <div class="flex justify-center items-start gap-10">
      <p>Listado</p>
      <ButtonPrimary />
      <ButtonPrimary />
    </div>
    <div class="base-background-gradient flex ">
      <div class="flex flex-col justify-start">
        <p class="text-black-100 text-sm font-bold capitalize text-titulo-border ">
          Shouki no Kami, the Prodigal
        </p>
        <p class="flex items-baseline gap-1">
          <span class="text-primary-500 text-sm text-center text-sub-titulo-border ">
            LV.
          </span>
          <span class="text-black-100 font-bold text-center text-border">
            90
          </span>
          <span class="text-primary-500 font-bold text-center text-border">
            /90
          </span>
        </p>
      </div>
      <div class="flex items-end">
        <SimulatorEnemiesCardCounter />
      </div>
    </div>
  </div>
</template>

<style>
  .text-border {
    font-size: 24px;
    font-weight: 700;
    -webkit-text-stroke: 1px black;
  }

  .text-titulo-border {
    font-size: 20px;
    font-weight: 700;
    -webkit-text-stroke: 1px black;
  }
  .text-sub-titulo-border {
    font-size: 16px;
    font-weight: 700;
    -webkit-text-stroke: 1px black;
  }

</style>
