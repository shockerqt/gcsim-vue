<template>
  <!-- Enemies portrait -->
  <div class="flex flex-col items-stretch gap-2 py-20 lg:flex-row">
    <div class="flex w-full flex-col gap-2 sm:flex-row">
      <!-- button add -->
      <div
        class="base-background-gradient flex h-28 grow items-center justify-center border-2 border-primary-500 sm:h-96 lg:h-full"
      >
        <div class="">a</div>
      </div>
      <div
        class="base-background-gradient flex h-28 grow items-center justify-center border-2 border-primary-500 sm:h-96 lg:h-full"
      >
        <div class="">b</div>
      </div>
      <div
        class="base-background-gradient flex h-28 grow items-center justify-center border-2 border-primary-500 sm:h-96 lg:h-full"
      >
        <div class="">a</div>
      </div>
      <div
        class="base-background-gradient flex h-28 grow items-center justify-center border-2 border-primary-500 sm:h-96 lg:h-full"
      >
        <div class="">a</div>
      </div>
    </div>

    <div
      class="hidden flex-col gap-3 border-4 border-primary-500 bg-black-500 p-2 lg:flex"
    >
      <!-- Enemies select -->
      <div class="flex items-center justify-between">
        <div class="text-center text-xl font-bold uppercase text-primary-500">
          Enemigos
        </div>
        <div
          class="flex items-center justify-start gap-10 bg-primary-500 px-5 py-2"
        >
          <BaseSelect />
        </div>
      </div>

      <!-- Portrait -->
      <div
        class="flex flex-row items-stretch justify-between gap-2 lg:flex-col"
      >
        <div class="grid grid-cols-3 justify-start gap-2">
          <div
            class="base-background-gradient aspect-square w-28 lg:w-auto"
          ></div>
          <div
            class="base-background-gradient aspect-square w-28 lg:w-auto"
          ></div>
          <div
            class="base-background-gradient aspect-square w-28 lg:w-auto"
          ></div>
          <div
            class="base-background-gradient aspect-square w-28 lg:w-auto"
          ></div>
          <div
            class="base-background-gradient aspect-square w-28 lg:w-auto"
          ></div>
          <div
            class="base-background-gradient aspect-square w-28 lg:w-auto"
          ></div>
        </div>
        <!-- Map -->
        <div class="hidden min-h-[152px] shrink-0 md:flex">
          <div class="base-background-gradient w-56 lg:w-full"></div>
        </div>
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
