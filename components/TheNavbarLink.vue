<script lang="ts" setup>
defineProps<{
  to: string;
}>();

const anchorActiveClasses = 'md:bg-transparent bg-primary-500 text-black-700 md:text-primary-500 hover:text-black-700 hover:bg-primary-100';

</script>

<template>
  <li>
    <NuxtLink
      :to="to"
      class="block py-2 pl-3 pr-4 rounded md:p-0 text-black-100 hover:text-primary-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-100"
      aria-current-value="page"
      :active-class="anchorActiveClasses"
    >
      <slot />
    </NuxtLink>
  </li>
</template>
