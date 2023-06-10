export const exchangeCode = async (code) => {
  const params = new URLSearchParams();
  params.append('client_id', process.env.DISCORD_CLIENT_ID);
  params.append('client_secret', process.env.DISCORD_CLIENT_SECRET);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', process.env.DISCORD_REDIRECT_URI);

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  try {
    const response = await fetch(`${process.env.DISCORD_API_ENDPOINT}/oauth2/token`, {
      method: 'POST',
      headers,
      body: params,
    });

    return response;
  } catch (error) {
    console.error('DISCORD API ERROR exchangeCode', error.response.data, error.response.status);
    return error.response;
  }
};

export default defineEventHandler(async (event) => {
  const code = event?.context?.params?.code;

  const response = await exchangeCode(code);
  console.log(response.ok, code);
  if (response.ok) {
    const tokenData = await response.json();
    console.log(tokenData);
    return { tokenType: tokenData.token_type, accessToken: tokenData.access_token };
  } else {
    return null;
  }
});
