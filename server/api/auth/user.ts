// export const fetchDiscord = async ({ tokenType, accessToken }, endpoint) => {
//   const cacheKey = `${accessToken}${endpoint}`;

//   try {
//     const cacheResults = await redis.get(cacheKey);

//     if (cacheResults) {
//       return {
//         cached: true,
//         data: JSON.parse(cacheResults),
//         status: 304,
//         ok: true,
//       };
//     }

//     const response = await fetch(`${process.env.DISCORD_API_ENDPOINT}${endpoint}`, {
//       headers: {
//         authorization: `${tokenType} ${accessToken}`,
//       },
//     });

//     if (response.ok) {
//       const data = await response.json();
//       const { status, ok } = response;
//       redis.set(cacheKey, JSON.stringify(data), {
//         EX: process.env.REDIS_DISCORD_DATA_LIFE,
//         NX: true,
//       });
//       return {
//         cached: false,
//         data,
//         status,
//         ok,
//       };
//     } else {
//       const data = await response.json();
//       const { status, ok } = response;
//       return {
//         data,
//         status,
//         ok,
//       };
//     }
//   } catch (error) {
//     const data = error.response.json();
//     return {
//       data,
//       status: error.response.status,
//     };
//   }
// };

// export const fetchUser = async token => await fetchDiscord(token, '/users/@me');
// export const fetchUserGuilds = async token => await fetchDiscord(token, '/users/@me/guilds');
