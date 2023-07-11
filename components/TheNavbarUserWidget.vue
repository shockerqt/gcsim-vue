<script lang="ts" setup>
const { loggedIn, user, logout } = useUserSession();

// https://discord.com/developers/docs/reference#image-formatting
const baseUrl = 'https://cdn.discordapp.com/';
</script>

<template>
  <a v-if="!loggedIn" href="/api/auth/discord" :external="true" class="text-black-700 bg-primary-500 hover:bg-primary-100 focus:ring-4 focus:outline-none focus:ring-primary-700 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">
    Login with Discord
  </a>
  <Menu v-else as="div" class="relative inline-block text-left">
    <MenuButton class="block w-12 h-12 rounded-full overflow-hidden cursor-pointer focus:ring-2 focus:ring-primary-100">
      <img :src="`${baseUrl}avatars/${user?.discordId}/${user?.avatar}.png`" alt="User Discord Avatar">
    </MenuButton>

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div class="px-1 py-1">
          <MenuItem>
            <NuxtLink
              to="/profile"
              class="block py-2 pl-3 pr-4 rounded text-black-100 hover:text-primary-100"
              aria-current-value="page"
            >
              Profile
            </NuxtLink>
          </MenuItem>
          <MenuItem>
            <button
              class="py-2 pl-3 pr-4 rounded bg-error-500 hover:bg-error-300 w-full mt-2 text-black-100 cursor-pointer"
              @click="logout()"
            >
              Logout
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Transition>
  </Menu>
</template>
