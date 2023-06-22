import type { H3Event, SessionConfig } from 'h3';

const sessionConfig: SessionConfig = useRuntimeConfig().auth || {};

export type AuthSession = {
  id: string;
  discordToken: string;
  discordId: string;
  name: string;
  avatar: string;
  role: string;
};

export type UserSession = {
  discordId: string;
  name: string;
  avatar: string;
  role: string;
}

export const useAuthSession = async (event: H3Event) => {
  return await useSession<AuthSession>(event, sessionConfig);
};

export const getUserSession = async (event: H3Event) => {
  const session = await useAuthSession(event);
  if (!session.data) { return null; }
  return {
    discordId: session.data.discordId,
    name: session.data.name,
    avatar: session.data.avatar,
    role: session.data.role,
  };
};

export const requireAuthSession = async (event: H3Event) => {
  const session = await useAuthSession(event);
  if (!session.data.id) {
    throw createError({
      message: 'Not Authorized',
      statusCode: 401,
    });
  }
  return session;
};
