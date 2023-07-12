export default defineNuxtPlugin({
  name: 'session-fetch-plugin',
  enforce: 'pre',
  async setup() {
    console.log('PRESERVER');
    await useUserSession().fetch();
  },
});
