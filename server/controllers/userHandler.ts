import { AuthSession } from '../utils/session';
import prisma from './prisma';

export interface UserInput {
  id: string;
  username: string;
  avatar: string;
}

export const userHandler = async (data: AuthSession) => {
  return await prisma.user.findUnique({
    where: { id: data.id },
  });
};
