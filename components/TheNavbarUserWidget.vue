<script lang="ts" setup>
const { loggedIn, user, logout } = useUserSession();

// https://discord.com/developers/docs/reference#image-formatting
const baseUrl = 'https://cdn.discordapp.com/';
</script>

<template>
  <a
    v-if="!loggedIn"
    href="/api/auth/discord"
    :external="true"
    class="mr-3 rounded-lg bg-primary-500 px-4 py-2 text-center text-sm font-medium text-black-700 hover:bg-primary-100 focus:outline-none focus:ring-4 focus:ring-primary-700 md:mr-0"
  >
    Login with Discord
  </a>
  <Menu v-else as="div" class="relative inline-block text-left">
    <MenuButton
      class="block h-12 w-12 cursor-pointer overflow-hidden rounded-full focus:ring-2 focus:ring-primary-100"
    >
      <img
        :src="`${baseUrl}avatars/${user?.discordId}/${user?.avatar}.png`"
        alt="User Discord Avatar"
      />
    </MenuButton>

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="divide-gray-100 bg-white ring-black absolute right-0 mt-2 w-56 origin-top-right divide-y rounded-md shadow-lg ring-1 ring-opacity-5 focus:outline-none"
      >
        <div class="px-1 py-1">
          <MenuItem>
            <NuxtLink
              to="/profile"
              class="block rounded py-2 pl-3 pr-4 text-black-100 hover:text-primary-100"
              aria-current-value="page"
            >
              Profile
            </NuxtLink>
          </MenuItem>
          <MenuItem>
            <button
              class="hover:bg-error-300 mt-2 w-full cursor-pointer rounded bg-error-500 py-2 pl-3 pr-4 text-black-100"
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
