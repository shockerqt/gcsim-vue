import * as dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';
dotenv.config();

export default {
  schema: './server/schema/users.ts',
  out: './migrations/prod',
  driver: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DB_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
} satisfies Config;
