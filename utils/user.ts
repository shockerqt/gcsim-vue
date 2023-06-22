import { UserSession } from '~/server/utils/session';

export const getUser = async () => {
  return await $fetch<UserSession>('/api/auth/user');
};
