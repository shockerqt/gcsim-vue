export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path === '/login' && process.client) {
    const { loggedIn, redirectTo, login } = useAuth();
    if (!loggedIn.value) {
      const { code, error } = to.query;

      // Not logged in and received the code from discord oauth2
      if (code || error) {
        if (code) { await login(code as string); }
        if (error) { console.error(error); }
        return await navigateTo(redirectTo.value || '/');

      // Not logged in and entered /login
      } else {
        redirectTo.value = from.path;
        const url = discordOauthUrl();
        await navigateTo(url, { external: true });
      }
    // Logged in and try to go to /login
    } else {
      return await navigateTo(redirectTo.value || '/');
    }
  }
});
