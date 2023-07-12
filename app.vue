<script lang="ts" setup>
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
