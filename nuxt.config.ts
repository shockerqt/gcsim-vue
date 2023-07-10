// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/image',
  ],
  css: [
    '@/assets/css/main.css',
  ],
  image: {
    domains: [
      'drive.google.com',
    ],
    alias: {
      drive: 'https://drive.google.com/uc?id=',
    },
  },
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
      name: 'server-session',
      password: process.env.SECRET || 'asd',
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
});
