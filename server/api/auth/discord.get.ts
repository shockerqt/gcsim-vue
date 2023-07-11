import { loginHandler } from '../../controllers/loginHandler';
import { useAuthSession } from '../../utils/session';

export default defineEventHandler(async (event) => {
  const { code, error } = getQuery(event);

  if (error) {
    return sendRedirect(event, '/');
  }

  if (!code) {
    return sendRedirect(event, discordOauthUrl());
  }

  const session = await useAuthSession(event);

  const token = await exchangeCode(code as string);
  if (token) {
    try {
      const discordResponse = await fetchUser(token);
      const data = await discordResponse.json();
      const dbResponse = await loginHandler(data);
      console.log(dbResponse);
      await session.update({
        id: dbResponse.id,
        discordId: dbResponse.discordId,
        discordToken: JSON.stringify(token),
        name: dbResponse.name,
        avatar: dbResponse.avatar,
        role: dbResponse.role,
      });
      // This will be stored on client cookie 'user-session'
    } catch (error) {
      console.error(error);
    }
  }
  return sendRedirect(event, '/');
});
