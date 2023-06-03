<script setup>
import icons from './icons.json'
const props = defineProps(['icon', 'color'])
</script>

<template>
  <svg
    :fill="color || 'currentColor'"
    :viewBox="`0 0 ${icons[props.icon].viewBox[0]} ${icons[props.icon].viewBox[1]}`"
  >
    <path v-for="(path, i) of icons[props.icon].paths" :key="i" :d="path" />
  </svg>
</template>
