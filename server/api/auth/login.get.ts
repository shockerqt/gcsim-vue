interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

const exchangeCode = async (code: string): Promise<TokenResponse | null> => {
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

const handleToken = (token: TokenResponse) => {
  console.log(token);
};

export default defineEventHandler(async (event) => {
  const { code } = getQuery(event);

  const token = await exchangeCode(code as string);
  if (token) {
    handleToken(token);
    return { tokenType: token.token_type, accessToken: token.access_token };
  } else {
    return null;
  }
});
