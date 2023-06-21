interface UserSession {
  id: string;
  username: string;
  avatar: string;
}

export const useAuth = () => {
  const session = useCookie<UserSession | null>('user-session', { default: () => null });
  const redirectTo = useCookie('redirect-to', { default: () => '/' });

  const loggedIn = computed(() => {
    return !!session.value;
  });

  const login = async (code: string) => {
    console.log('AUTH LOGIN');
    const data = await $fetch<UserSession>('/api/auth/login',
      {
        params: { code },
        method: 'POST',
      });
    session.value = data;
  };

  const refreshSession = async () => {
    const data = await $fetch<UserSession>('/api/auth/session');
    session.value = data;
  };

  const logout = async () => {
    await $fetch('/api/auth/logout', {
      method: 'POST',
    });
    session.value = null;
  };

  return {
    session,
    redirectTo,
    refreshSession,
    loggedIn,
    login,
    logout,
  };
};
