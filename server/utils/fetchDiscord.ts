import { DiscordToken } from '../api/auth/login.post';

const fetchDiscord = async (token: DiscordToken, endpoint: string) => {
  const response = await fetch(`${process.env.DISCORD_API_ENDPOINT}${endpoint}`, {
    headers: {
      authorization: `${token.token_type} ${token.access_token}`,
    },
  });

  return response;
};

export const fetchUser = async (token: DiscordToken) => await fetchDiscord(token, '/users/@me');
