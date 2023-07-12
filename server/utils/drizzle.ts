// PROD
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
// DEV
import Database from 'better-sqlite3';
import { drizzle as drizzleDev } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

const init = () => {
  try {
    const runtimeConfig = useRuntimeConfig();
    // DEV: BETTER-SQLITE3
    if (runtimeConfig.dev) {
      const sqlite = new Database('sqlite.db');
      const db = drizzleDev(sqlite);
      migrate(db, { migrationsFolder: './migrations/dev' });
      return db;
    }
    // PROD: TURSO-DB
    else {
      const client = createClient({
        url: runtimeConfig.db.TURSO_DB_URL,
        authToken: runtimeConfig.db.TURSO_AUTH_TOKEN,
      });
      return drizzle(client);
    }
  } catch (error) {
    console.error(error);
  }
};

export const db = init();
