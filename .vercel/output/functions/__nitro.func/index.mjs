			CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric
			)
		`;t.run(a);const l=t.values(sql`SELECT id, hash, created_at FROM "__drizzle_migrations" ORDER BY created_at DESC LIMIT 1`)[0]??void 0;t.run(sql`BEGIN`);try{for(const a of n)if(!l||Number(l[2])<a.folderMillis){for(const n of a.sql)t.run(sql.raw(n));t.run(sql`INSERT INTO "__drizzle_migrations" ("hash", "created_at") VALUES(${a.hash}, ${a.folderMillis})`)}t.run(sql`COMMIT`)}catch(n){throw t.run(sql`ROLLBACK`),n}}}class SQLiteAsyncDialect extends SQLiteDialect{static[bt]="SQLiteAsyncDialect";async migrate(n,t){const a=sql`
			CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric
			)
//# sourceMappingURL=index.mjs.map