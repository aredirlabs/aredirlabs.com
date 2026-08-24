import type { EngineeringWorkSqlExecutor } from "../src/lib/workspace/engineering-work-history-persistence";

type NeonQueryClient = {
  query(queryWithPlaceholders: string, params?: unknown[]): Promise<unknown>;
};

export type { NeonQueryClient };

export function asSqlExecutor(client: NeonQueryClient): EngineeringWorkSqlExecutor {
  return {
    query: async (query, params) => {
      const rows = await client.query(query, params);
      return rows as Array<Record<string, unknown>>;
    },
  };
}

export async function queryOne(
  sql: EngineeringWorkSqlExecutor,
  query: string,
  params?: unknown[],
): Promise<Record<string, unknown>> {
  const rows = await sql.query(query, params);
  const row = rows[0];
  if (!row) {
    throw new Error("Expected query to return at least one row.");
  }
  return row;
}
