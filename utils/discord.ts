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