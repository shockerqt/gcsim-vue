<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// You might choose this based on an API call or logged-in status
const layout = 'default';
</script>

<style>
  .page-enter-active,
  .page-leave-active,
  .layout-enter-active,
  .layout-leave-active {
    @apply transition-all;
  }
  .page-enter-from,
  .layout-enter-from {
    transform: scale(0.95);
    opacity: 0;
  }
  .page-leave-to,
  .layout-leave-to {
    transform: scale(0.95);
    opacity: 0;
  }
</style>
