export default defineNuxtRouteMiddleware(async (to, _from) => {
  // console.log('MIDDLEWARE /');
  if (to.path === '/') {
    const { code, error } = to.query;
    if (code || error) {
      if (code) {
        await $fetch('/api/auth/login', { params: { code: to.query.code } });
      }
      if (error) {
        console.error(error);
      }
      return await navigateTo('/');
    }
  }
});
