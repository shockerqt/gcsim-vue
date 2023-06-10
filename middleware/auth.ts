export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.params.id === '1') {
    return abortNavigation();
  }
  if (to.path === '/login') {
    const code = to.query.code;
    if (code) {
      const { data: token } = await useFetch('/api/auth/login', { params: { code } });
      useState('token', () => token?.value);
      return await navigateTo('/');
    }
    const { data: authUrl } = await useFetch('/api/auth/url');
    return await navigateTo(authUrl.value, { external: true });
  }
});
