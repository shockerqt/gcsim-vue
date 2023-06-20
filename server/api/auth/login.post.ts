import prisma from '../../controllers/prisma';
import { useAuthSession } from '../../utils/session';

export interface DiscordToken {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

const exchangeCode = async (code: string): Promise<DiscordToken | null> => {
  const {
    DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET,
    DISCORD_REDIRECT_URI,
  } = process.env;
  if (!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET || !DISCORD_REDIRECT_URI) { return null; }

  const params = new URLSearchParams();
  params.append('client_id', DISCORD_CLIENT_ID);
  params.append('client_secret', DISCORD_CLIENT_SECRET);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', DISCORD_REDIRECT_URI);

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const response = await fetch(`${process.env.DISCORD_API_ENDPOINT}/oauth2/token`, {
    method: 'POST',
    headers,
    body: params,
  });

  if (response.ok) {
    return await response.json();
  }

  return null;
};

export default defineEventHandler(async (event) => {
  const { code } = getQuery(event);
  const session = await useAuthSession(event);
  const token = await exchangeCode(code as string);
  if (token) {
    const response = await fetchUser(token);
    const data = await response.json();
    session.update({
      id: data.id,
      discordToken: JSON.stringify(token),
      username: data.username,
      avatar: data.avatar,
    });
    await prisma.user.upsert({
      where: { discordId: data.id },
      create: {
        discordId: data.id,
        name: data.username,
        role: 'user',
        avatar: data.avatar,
      },
      update: {
        name: data.username,
        role: 'user',
        avatar: data.avatar,
      },
    });
    return { user: data.username, avatar: data.avatar };
  } else {
    return null;
  }
});
