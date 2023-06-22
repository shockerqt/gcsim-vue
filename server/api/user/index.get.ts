import { userHandler } from '../../controllers/userHandler';
import { useAuthSession } from '../../utils/session';

export default defineEventHandler(async (event) => {
  const session = await useAuthSession(event);

  try {
    const dbResponse = await userHandler(session.data);

    if (dbResponse === null) {
      session.clear();
      return null;
    }
    await session.update({
      id: dbResponse.id,
      discordId: dbResponse.discordId,
      name: dbResponse.name,
      avatar: dbResponse.avatar,
    });

    return {
      role: dbResponse.role,
      discordId: dbResponse.discordId,
      name: dbResponse.name,
      avatar: dbResponse.avatar,
    };
  } catch (error) {
    console.error(error);
  }
  return null;
});
