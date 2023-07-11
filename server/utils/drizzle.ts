// PROD
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
// DEV
// @ts-ignore
import Database from 'better-sqlite3';
import { drizzle as drizzleDev } from 'drizzle-orm/better-sqlite3';
import { migrate as migrateDev } from 'drizzle-orm/better-sqlite3/migrator';

const initDev = () => {
  const sqlite = new Database('sqlite.db');
  return drizzleDev(sqlite);
};

const init = () => {
  const client = createClient({ url: 'DATABASE_URL', authToken: 'DATABASE_AUTH_TOKEN' });
  return drizzle(client);
};

export const db = useRuntimeConfig().dev ? initDev() : init();

if (useRuntimeConfig().dev) {
  console.info('RUNNING MIGRATIONS');
  migrateDev(db as ReturnType<typeof initDev>, { migrationsFolder: './drizzle' });
} else {
  migrate(db as ReturnType<typeof init>, { migrationsFolder: './drizzle' });
}
