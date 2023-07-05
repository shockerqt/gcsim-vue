<template>
  <div class="text-primary-500 font-bold flex gap-10 flex-wrap rounded max-xs:bg-black-500 max-xs:p-4">
    <!--personaje-->
    <div v-for="i of [1,2,3]" class="flex gap-3 grow justify-center">
      <div class="h-full aspect-square base-background-gradient flex-wrap" />
      <div class="grow flex flex-col gap-2">
        <SimulatorSelect class="bg-black-600 px-2 py-1 capitalize font-medium rounded text-xs" />
        <SimulatorSelect class="bg-black-600 px-2 py-1 capitalize font-medium rounded text-xs" />
        <SimulatorSelect class="bg-black-600 px-2 py-1 capitalize font-medium rounded text-xs" />
        <SimulatorSelect class="bg-black-600 px-2 py-1 capitalize font-medium rounded text-xs" />
      </div>
    </div>
  </div>
</template>
