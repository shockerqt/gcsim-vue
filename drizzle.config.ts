import type { Config } from 'drizzle-kit';

export default {
  schema: './server/schema/users.ts',
  out: './drizzle',
} satisfies Config;
