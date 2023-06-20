<script lang="ts" setup>
const { loggedIn } = useAuth();

// https://discord.com/developers/docs/reference#image-formatting
const baseUrl = 'https://cdn.discordapp.com/';
const isOpen = ref(false);
console.log('Seesion', loggedIn.value);
</script>

<template>
  <NuxtLink v-if="!loggedIn" to="/login" class="text-black-700 bg-primary-500 hover:bg-primary-100 focus:ring-4 focus:outline-none focus:ring-primary-700 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">
    Login with Discord
  </NuxtLink>
  <button
    v-else
    class="w-12 h-12 rounded-full overflow-hidden cursor-pointer"
    @click="authLogout()"
  >
    Logout
  </button>
  <div v-if="loggedIn && isOpen" role="menu" class="top-16">
    <div />
    asdsad
  </div>
</template>
