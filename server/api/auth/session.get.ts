export default defineEventHandler(async (event) => {
  const { data } = await useAuthSession(event);
  if (!data.id) {
    return null;
  } else {
    return {
      id: data.id,
      username: data.username,
      avatar: data.avatar,
    };
  }
});
