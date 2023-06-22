<script setup>
const { loggedIn } = useUserSession();

watch(loggedIn, () => {
  if (!loggedIn.value) {
    navigateTo('/');
  }
});
</script>

<template>
  <NuxtLayout name="default">
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
  .page-enter-active,
  .page-leave-active,
  .layout-enter-active,
  .layout-leave-active {
    @apply transition-opacity;
  }
  .page-enter-from,
  .layout-enter-from {
    opacity: 0;
  }
  .page-leave-to,
  .layout-leave-to {
    opacity: 0;
  }
</style>
