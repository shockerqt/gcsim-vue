export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log('LOGIN MIDDLEWARE');
  if (to.path === '/login') {
    console.log('TO LOGIN');
    const { loggedIn, redirectTo } = useAuth();
    redirectTo.value = '/characters';
    console.log('loggedin', loggedIn.value);
    if (!loggedIn.value) {
      const { code, error } = to.query;

      // Not logged in and received the code from discord oauth2
      if (code || error) {
        console.log('Not logged in and received the code from discord oauth2');
        if (code) { await authLogin(code as string); }
        if (error) { console.error(error); }
        return await navigateTo(redirectTo.value);

      // Not logged in and entered /login
      } else {
        console.log('Not logged in and entered /login');
        redirectTo.value = from.path;
        const url = discordOauthUrl();
        console.log('discord URL', url);
        await navigateTo(url, { external: true });
      }
    // Logged in and try to go to /login
    } else {
      console.log('Logged in and try to go to /login');
      return await navigateTo(redirectTo.value || '/');
    }
  }
});
