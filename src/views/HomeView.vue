<script setup>
const images = import.meta.glob('@/assets/Characters/*.webp')
console.log(Object.keys(images))
</script>

<template>
  <main class="grid place-items-center pb-20 w-full">
    <div class="max-w-xl w-full">
      <h1 class="text-3xl text-gray-200 mb-4">
        Crea el equipo <br />
        perfecto con GCSIM
      </h1>
      <input
        type="text"
        class="py-3 rounded-full px-5 w-full"
        placeholder="Ingresa el personaje que buscas o tu UID"
      />
    </div>
  </main>
</template>
