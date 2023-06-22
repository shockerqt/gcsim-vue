import prisma from './prisma';

export interface LoginInput {
  id: string;
  username: string;
  avatar: string;
}

export const loginHandler = async ({ id, username, avatar }: LoginInput) => {
  return await prisma.user.upsert({
    where: { discordId: id },
    create: {
      discordId: id,
      name: username,
      role: 'user',
      avatar,
    },
    update: {
      name: username,
      avatar,
    },
  });
};
