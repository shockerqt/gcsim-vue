<script setup>
import NavBar from './NavBar.vue'
</script>

<template>
  <div class="grid h-full grid-rows-[auto,_1fr]">
    <NavBar />
    <slot></slot>
  </div>

  <!-- <Footer /> -->
</template>
