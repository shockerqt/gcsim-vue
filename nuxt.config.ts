// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/image',
    'nuxt-headlessui',
  ],
  css: ['@/assets/css/main.css'],
  headlessui: {
    prefix: '',
  },
  nitro: {
    future: {
      nativeSWR: true,
    },
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },
  runtimeConfig: {
    dev: process.env.NODE_ENV === 'development',
    auth: {
      name: 'server-session',
      password: process.env.SECRET || 'asd',
    },
    db: {
      TURSO_DB_URL: process.env.TURSO_DB_URL,
      TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
    },
    discord: {
      discordClientId: process.env.DISCORD_CLIENT_ID,
      discordClientSecret: process.env.DISCORD_CLIENT_SECRET,
      discordRedirectUri: process.env.DISCORD_REDIRECT_URI,
    },
    public: {
      discordClientId: process.env.DISCORD_CLIENT_ID,
      discordRedirectUri: process.env.DISCORD_REDIRECT_URI,
    },
  },
  // vite: {
  //   vue: {
  //     script: {
  //       defineModel: true,
  //       propsDestructure: true,
  //     },
  //   },
  // },
});
