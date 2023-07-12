import { UserSession } from '~/server/utils/session';
const useUserSessionState = () =>
  useState<UserSession | null>('user-session', () => null);

export const useUserSession = () => {
  const sessionState = useUserSessionState();
  return {
    loggedIn: computed(() => Boolean(sessionState.value?.discordId)),
    user: computed(() => sessionState.value),
    data: sessionState,
    fetch,
    logout,
  };
};

const fetch = async () => {
  try {
    useUserSessionState().value = await useRequestFetch()<UserSession>(
      '/api/session'
    );
  } catch (error) {
    console.log(error);
  }
};

const logout = async () => {
  await $fetch('/api/session', { method: 'DELETE' });
  useUserSessionState().value = null;
};
