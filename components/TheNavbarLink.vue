<script lang="ts" setup>
defineProps<{
  to: string;
}>();

const anchorActiveClasses = 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500';

</script>

<template>
  <li>
    <NuxtLink
      :to="to"
      class="block py-2 pl-3 pr-4 rounded md:p-0 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
      aria-current-value="page"
      :active-class="anchorActiveClasses"
    >
      <slot />
    </NuxtLink>
  </li>
</template>
