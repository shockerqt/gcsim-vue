export default defineEventHandler(async (event) => {
  const session = await useAuthSession(event);
  if (session.data) {
    return {
      id: session.data.id,
      username: session.data.username,
      avatar: session.data.avatar,
    };
  }
  return null;
});
