<script lang="ts" setup>
const user = useCookie('token');

const baseUrl = 'https://cdn.discordapp.com/';
const isOpen = ref(false);
// console.log('USER', user);
</script>

<template>
  <!-- <RouterLink v-if="!user" to="/login" class="text-black-700 bg-primary-500 hover:bg-primary-100 focus:ring-4 focus:outline-none focus:ring-primary-700 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">
    Login with Discord
  </RouterLink> -->
  <a v-if="!user" :href="loginUrl() || '/'" class="text-black-700 bg-primary-500 hover:bg-primary-100 focus:ring-4 focus:outline-none focus:ring-primary-700 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">
    Login with Discord
  </a>
  <button
    v-else
    class="w-12 h-12 rounded-full overflow-hidden cursor-pointer"
    @click="user = null"
  >
    Logout
  </button>
  <div v-if="user && isOpen" role="menu" class="top-16">
    <div />
    asdsad
  </div>
</template>
