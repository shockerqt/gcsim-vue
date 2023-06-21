import prisma from '../../controllers/prisma';
import { useAuthSession } from '../../utils/session';

const {
  discordClientId,
  discordClientSecret,
  discordRedirectUri,
} = useRuntimeConfig().discord || {};

export interface DiscordToken {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

const exchangeCode = async (code: string): Promise<DiscordToken | null> => {
  if (!discordClientId || !discordClientSecret || !discordRedirectUri) {
    console.error('Discord env undefined');
    return null;
  }

  const params = new URLSearchParams();
  params.append('client_id', discordClientId);
  params.append('client_secret', discordClientSecret);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', discordRedirectUri);

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
  } else {
    console.error('RESPONSE ERROR', await response.json());
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
    await session.update({
      id: data.id,
      discordToken: JSON.stringify(token),
      username: data.username,
      avatar: data.avatar,
    });
    prisma.user.upsert({
      where: { discordId: data.id },
      create: {
        discordId: data.id,
        name: data.username,
        role: 'user',
        avatar: data.avatar,
      },
      update: {
        name: data.username,
        avatar: data.avatar,
      },
    });
    return {
      id: data.id,
      username: data.username,
      avatar: data.avatar,
    };
  } else {
    return null;
  }
});
