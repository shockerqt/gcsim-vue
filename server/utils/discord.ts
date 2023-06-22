export interface DiscordToken {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export const exchangeCode = async (code: string): Promise<DiscordToken | null> => {
  const {
    discordClientId,
    discordClientSecret,
    discordRedirectUri,
  } = useRuntimeConfig().discord || {};

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

export const discordOauthUrl = () => {
  const runtimeConfig = useRuntimeConfig();
  const { discordClientId, discordRedirectUri } = runtimeConfig.public;
  if (!discordClientId || !discordRedirectUri) {
    console.error('Can\'t get discord URL');
    return '/';
  }
  const searchParams = new URLSearchParams({
    client_id: discordClientId,
    redirect_uri: discordRedirectUri,
    response_type: 'code',
    scope: 'identify',
  });

  return `https://discord.com/api/oauth2/authorize?${searchParams.toString()}`;
};

const fetchDiscord = async (token: DiscordToken, endpoint: string) => {
  const response = await fetch(`${process.env.DISCORD_API_ENDPOINT}${endpoint}`, {
    headers: {
      authorization: `${token.token_type} ${token.access_token}`,
    },
  });

  return response;
};

export const fetchUser = async (token: DiscordToken) => await fetchDiscord(token, '/users/@me');
