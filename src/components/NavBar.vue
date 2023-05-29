<script setup>
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()

console.log(route.name)
</script>

<template>
  <nav class="flex px-10 py-5 w-full justify-between">
    <RouterLink to="/" class="text-white font-bold">GCSIM</RouterLink>
    <ul class="flex gap-6 text-gray-500 font-bold text-sm">
      <li class="hover:text-teal-300">
        <RouterLink to="/simulator" active-class="text-teal-500">Simulator</RouterLink>
      </li>
      <li class="hover:text-teal-300">
        <RouterLink to="/characters" active-class="text-teal-500">Character</RouterLink>
      </li>
      <li class="hover:text-teal-300">
        <RouterLink to="/help" active-class="text-teal-500">Help</RouterLink>
      </li>
      <li class="hover:text-teal-300">
        <a><i class="fas fa-user"></i></a>
      </li>
    </ul>
  </nav>
</template>
