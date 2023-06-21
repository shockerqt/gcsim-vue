<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core';

const displayedMenu = useState('displayedNavMenu', () => 'none');
const toggleMobileMenu = () => {
  if (displayedMenu.value !== 'nav') { displayedMenu.value = 'nav'; } else { displayedMenu.value = 'none'; }
};
const isShowMenuOnMobile = computed(() => displayedMenu.value === 'nav');
const breakpoints = useBreakpoints(breakpointsTailwind);

const isMobile = breakpoints.smaller('md');
const isShowMenu = computed(() => {
  return isMobile.value ? isShowMenuOnMobile.value : true;
});
</script>

<template>
  <nav>
    <div class="relative max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 h-24">
      <NuxtLink to="/" class="flex items-center">
        <!-- <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo"> -->
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-primary-500">GCSim</span>
      </NuxtLink>

      <div class="flex md:order-2">
        <ClientOnly>
          <TheNavbarUserWidget />
        </ClientOnly>
        <button
          type="button"
          class="inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden hover:bg-black-600 focus:outline-none focus:ring-2 focus:ring-primary-100 text-black-100"
          aria-controls="navbar-default"
          :aria-expanded="isShowMenu"
          @click="toggleMobileMenu()"
        >
          <span class="sr-only">Open main menu</span>
          <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" /></svg>
        </button>
      </div>
      <menu
        v-show="isShowMenu"
        id="navbar-default"
        class="items-center justify-between w-full absolute top-[4.5rem] right-0 p-4 md:p-0 md:static md:flex md:w-auto md:order-1"
      >
        <ul class="font-medium flex flex-col p-4 md:p-0 border border-black-700 rounded-lg bg-black-600 md:bg-transparent md:flex-row md:space-x-8 md:border-0">
          <TheNavbarLink to="/simulator">
            Simulator
          </TheNavbarLink>
          <TheNavbarLink to="/characters">
            Characters
          </TheNavbarLink>
        </ul>
      </menu>
    </div>
  </nav>
</template>
