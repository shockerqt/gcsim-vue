export const loginUrl = () => {
  if (process.env.DISCORD_CLIENT_ID && process.env.DISCORD_REDIRECT_URI) {
    const searchParams = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      redirect_uri: process.env.DISCORD_REDIRECT_URI,
      response_type: 'code',
      scope: 'identify',
    });

    console.log(`https://discord.com/api/oauth2/authorize?${searchParams.toString()}`);

    return `https://discord.com/api/oauth2/authorize?${searchParams.toString()}`;
  }
};
