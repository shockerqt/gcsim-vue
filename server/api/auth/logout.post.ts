export default defineEventHandler(async (event) => {
  const session = await useAuthSession(event);
  await session.clear();
  console.log('LOGOUT', session.id);
  return {
    message: 'Successfully logged out!',
  };
});
