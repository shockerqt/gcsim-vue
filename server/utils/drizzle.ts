// PROD
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';

const init = () => {
  try {
    const client = createClient({
      url: 'DATABASE_URL',
      authToken: 'DATABASE_AUTH_TOKEN',
    });
    const db = drizzle(client);
    migrate(db, { migrationsFolder: './drizzle' });
    return db;
  } catch (error) {
    console.error(error);
  }
};

export const db = init();
