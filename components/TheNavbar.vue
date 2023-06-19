<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core';

const isShowMenuOnMobile = ref(false);
const toggleMobileMenu = useToggle(isShowMenuOnMobile);
const breakpoints = useBreakpoints(breakpointsTailwind);

const isMobile = breakpoints.smaller('md');
const isShowMenu = computed(() => isMobile ? isShowMenuOnMobile.value : true);

</script>

<template>
  <nav>
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <NuxtLink to="/" class="flex items-center">
        <!-- <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo"> -->
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-primary-500">GCSim</span>
      </NuxtLink>

      <div class="flex md:order-2 relative">
        <TheNavbarUserWidget />
        <button
          type="button"
          class="inline-flex items-center p-2 ml-3 text-sm text-neutral-500 rounded-lg md:hidden hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:ring-neutral-600"
          aria-controls="navbar-default"
          :aria-expanded="isShowMenu"
          @click="toggleMobileMenu()"
        >
          <span class="sr-only">Open main menu</span>
          <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" /></svg>
        </button>
      </div>
      <div id="navbar-default" class="items-center justify-between w-full md:flex md:w-auto md:order-1" :class="{ hidden: !isShowMenu }">
        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-neutral-100 rounded-lg bg-neutral-50 md:flex-row md:space-x-8 md:mt-0 md:border-0">
          <TheNavbarLink to="/simulator">
            Simulator
          </TheNavbarLink>
          <TheNavbarLink to="/characters">
            Characters
          </TheNavbarLink>
        </ul>
      </div>
    </div>
  </nav>
</template>
