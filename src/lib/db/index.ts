import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

function createDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  const sql = neon(url);
  return drizzle(sql, { schema });
}

function createSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  return neon(url);
}

let _db: ReturnType<typeof createDb> | null = null;

export function getDb() {
  if (!_db) {
    _db = createDb();
  }
  return _db;
}

let _sql: ReturnType<typeof createSql> | null = null;

export function getSql() {
  if (!_sql) {
    _sql = createSql();
  }
  return _sql;
}

export const db = new Proxy(
  {},
  {
    get(_, prop) {
      return getDb()[prop as keyof ReturnType<typeof createDb>];
    },
  },
) as ReturnType<typeof createDb>;
