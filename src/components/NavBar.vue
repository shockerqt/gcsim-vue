<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="flex px-10 py-5 w-full justify-between">
    <RouterLink to="/" class="text-white font-bold">GCSIM</RouterLink>
    <ul class="flex gap-6 text-gray-200 font-bold text-sm">
      <li class="hover:text-g3">
        <RouterLink to="/simulator" active-class="text-g2">Simulator</RouterLink>
      </li>
      <li class="hover:text-g3">
        <RouterLink to="/characters" active-class="text-g2">Character</RouterLink>
      </li>
      <li class="hover:text-g3">
        <RouterLink to="/help" active-class="text-g2">Help</RouterLink>
      </li>
      <li class="hover:text-g3">
        <a><i class="fas fa-user"></i></a>
      </li>
    </ul>
  </nav>
</template>
