// PROD
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';

const init = () => {
  const client = createClient({
    url: 'DATABASE_URL',
    authToken: 'DATABASE_AUTH_TOKEN',
  });
  return drizzle(client);
};

export const db = init();

migrate(db as ReturnType<typeof init>, { migrationsFolder: './drizzle' });
