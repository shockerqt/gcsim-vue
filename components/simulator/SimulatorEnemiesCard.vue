<template>
  <div class="w-full bg-error-500">
    asd
    <div class="flex items-start justify-center gap-10">
      <p>Listado</p>
      <ButtonPrimary />
      <ButtonPrimary />
    </div>
    <div class="base-background-gradient flex">
      <div class="flex flex-col justify-start">
        <p
          class="text-titulo-border text-sm font-bold capitalize text-black-100"
        >
          Shouki no Kami, the Prodigal
        </p>
        <p class="flex items-baseline gap-1">
          <span
            class="text-sub-titulo-border text-center text-sm text-primary-500"
          >
            LV.
          </span>
          <span class="text-border text-center font-bold text-black-100">
            90
          </span>
          <span class="text-border text-center font-bold text-primary-500">
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
