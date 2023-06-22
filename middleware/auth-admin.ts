export default defineNuxtRouteMiddleware(() => {
  const { loggedIn, user } = useUserSession();

  console.log('LOGGED IN NEW SESSION', loggedIn.value, user.value);
  if (!loggedIn.value) {
    if (user.value?.role !== 'admin') { return navigateTo('/'); }
  }
});
