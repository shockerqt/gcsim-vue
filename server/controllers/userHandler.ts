import { eq } from 'drizzle-orm';
import { User, users } from '../schema/users';
import { db } from '../utils/drizzle';
import { AuthSession } from '../utils/session';

export interface UserInput {
  id: number;
  discordId: string;
  name: string;
  avatar: string;
  role: string;
}

export const userHandler = async (data: AuthSession): Promise<User> => {
  return await db.select().from(users).where(eq(users.id, data.id)).get();
};
