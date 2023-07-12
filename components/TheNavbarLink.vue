<script lang="ts" setup>
defineProps<{
  to: string;
}>();
</script>

<template>
  <NuxtLink
    :to="to"
    class="block hover:text-primary-100"
    aria-current-value="page"
    active-class="text-primary-500 hover:text-black-700 hover:text-primary-100"
  >
    <slot />
  </NuxtLink>
</template>
