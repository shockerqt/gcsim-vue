import { InferModel } from 'drizzle-orm';
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';

export const users = sqliteTable(
  'users',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    discordId: text('discordId').notNull(),
    name: text('name').notNull(),
    avatar: text('avatar').notNull(),
    role: text('role').default('user').notNull(),
  },
  (users) => ({
    discordIdx: uniqueIndex('discordIdx').on(users.discordId),
  }),
);

export type User = InferModel<typeof users>; // return type when queried
export type InsertUser = InferModel<typeof users, 'insert'>; // insert type
