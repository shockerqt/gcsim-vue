import { User, users } from '../schema/users';
import { db } from '../utils/drizzle';

export interface LoginInput {
  id: string;
  username: string;
  avatar: string;
}

export const loginHandler = async ({ id, username, avatar }: LoginInput): Promise<User> => {
  return await db.insert(users).values({
    discordId: id,
    name: username,
    role: 'user',
    avatar,
  }).onConflictDoUpdate({
    target: users.discordId,
    set: {
      name: username,
      avatar,
    },
  }).returning().get();
};
