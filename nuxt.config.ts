// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in', // default
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in', // default
    },
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
  ],
  css: [
    '@/assets/css/main.css',
  ],
  nitro: {
    storage: {
      // db: {
      //   driver: 'redis',
      //   base: 'unstorage',
      //   host: 'HOSTNAME',
      //   tls: true as any,
      //   port: 6380,
      //   password: 'REDIS_PASSWORD',
      // },
      db: {
        driver: 'fs',
        base: './data/db',
      },
    },
    // Development
    devStorage: {
      db: {
        driver: 'fs',
        base: './data/db',
      },
    },
  },
  runtimeConfig: {
    auth: {
      name: 'nuxt-session',
      password: process.env.SECRET || '',
    },
    public: {
      dicordClientId: process.env.DISCORD_CLIENT_ID,
      discordRedirectUri: process.env.DISCORD_REDIRECT_URI,
    },
  },
});
