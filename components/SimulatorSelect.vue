<script setup>
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const data = [
  'foo',
  'bar',
  'baz',
];
</script>

<template>
  <div class="flex items-center">
    <input type="text" disabled value="Test Input">
    <FaIcon class="w-4" :icon="faCaretDown" />
  </div>
</template>

<style scoped>
  input {
    all: unset;
    width: 100%;
    min-width: 96px;
  }

</style>
