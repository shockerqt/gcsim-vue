export const useAuth = () => useNuxtApp().$auth;

export const authLogin = async (code: string) => {
  await $fetch('/api/auth/login',
    {
      params: { code },
      method: 'POST',
    });
  await useAuth().updateSession();
};

export const authLogout = async () => {
  console.log('AUTHLOGOUT');
  await $fetch('/api/auth/logout', {
    method: 'POST',
  });
  await useAuth().updateSession();
};
