import { eq } from 'drizzle-orm';
import { User, users } from '../schema/users';
import { db } from '../utils/drizzle';
import { AuthSession } from '../utils/session';
// import prisma from './prisma';

export interface UserInput {
  id: number;
  discordId: string;
  name: string;
  avatar: string;
  role: string;
}

// export const userHandler = async (data: AuthSession) => {
//   return await prisma.user.findUnique({
//     where: { id: data.id },
//   });
// };

export const userHandler = async (data: AuthSession): Promise<User> => {
  return await db.select().from(users).where(eq(users.id, data.id)).get();
};
