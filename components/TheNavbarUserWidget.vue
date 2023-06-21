<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core';
const { loggedIn, logout, session } = useAuth();
const breakpoints = useBreakpoints(breakpointsTailwind);

const isMobile = breakpoints.smaller('md');
const menuElement = ref(null);
const buttonElement = ref(null);

onClickOutside(menuElement,
  () => { if (!isMobile.value) { displayedMenu.value = 'none'; } },
  { ignore: [buttonElement] });

const displayedMenu = useState('displayedNavMenu', () => 'none');
const toggleMenu = () => {
  if (displayedMenu.value !== 'user') { displayedMenu.value = 'user'; } else { displayedMenu.value = 'none'; }
};
const isShowMenu = computed(() => displayedMenu.value === 'user');

// https://discord.com/developers/docs/reference#image-formatting
const baseUrl = 'https://cdn.discordapp.com/';
</script>

<template>
  <NuxtLink v-show="!loggedIn" to="/login" class="text-black-700 bg-primary-500 hover:bg-primary-100 focus:ring-4 focus:outline-none focus:ring-primary-700 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">
    Login with Discord
  </NuxtLink>
  <button
    v-show="loggedIn"
    ref="buttonElement"
    class="w-12 h-12 rounded-full overflow-hidden cursor-pointer focus:ring-2 focus:ring-primary-100"
    @click="toggleMenu()"
  >
    <img :src="`${baseUrl}avatars/${session?.id}/${session?.avatar}.png`" alt="User Discord Avatar">
  </button>
  <menu
    v-show="loggedIn && isShowMenu"
    id="navbar-default"
    ref="menuElement"
    class="items-center justify-between w-full md:w-64 absolute top-[4.5rem] right-0 p-4"
  >
    <ul class="font-medium flex flex-col p-4 border border-black-700 rounded-lg bg-black-600">
      <li>
        <NuxtLink
          to="/profile"
          class="block py-2 pl-3 pr-4 rounded text-black-100 hover:text-primary-100"
          aria-current-value="page"
        >
          Profile
        </NuxtLink>
      </li>
      <li>
        <button
          v-show="loggedIn"
          class="py-2 pl-3 pr-4 rounded bg-error-500 hover:bg-error-300 w-full mt-2 text-black-100 cursor-pointer"
          @click="logout()"
        >
          Logout
        </button>
      </li>
    </ul>
  </menu>
</template>
