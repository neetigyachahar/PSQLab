import { describe } from 'psql-describe';

import { PGliteInterface } from '@electric-sql/pglite';

import { Response, Results } from './types';

const ddlCommands = [
    "INSERT",
    "UPDATE",
    "DELETE",
    "TRUNCATE",
    "CREATE",
    "ALTER",
    "DROP",
    "TRUNCATE",
    "COMMENT",
    "RENAME",
    "GRANT",
    "REVOKE",
    "SET",
    "RESET",
    "ANALYZE",
    "VACUUM",
    "CLUSTER",
    "REINDEX",
    "DISCARD",
    "REFRESH MATERIALIZED VIEW",
    "SECURITY LABEL",
    "CREATE TABLE",
    "ALTER TABLE",
    "DROP TABLE",
    "CREATE SCHEMA",
    "ALTER SCHEMA",
    "DROP SCHEMA",
    "CREATE INDEX",
    "DROP INDEX",
    "CREATE VIEW",
    "DROP VIEW",
    "CREATE SEQUENCE",
    "ALTER SEQUENCE",
    "DROP SEQUENCE",
    "CREATE FUNCTION",
    "ALTER FUNCTION",
    "DROP FUNCTION",
    "CREATE TRIGGER",
    "ALTER TRIGGER",
    "DROP TRIGGER",
    "CREATE TYPE",
    "ALTER TYPE",
    "DROP TYPE",
    "CREATE DOMAIN",
    "ALTER DOMAIN",
    "DROP DOMAIN",
    "CREATE AGGREGATE",
    "ALTER AGGREGATE",
    "DROP AGGREGATE",
    "CREATE OPERATOR",
    "ALTER OPERATOR",
    "DROP OPERATOR",
    "CREATE RULE",
    "ALTER RULE",
    "DROP RULE"
];

// Can be used to block non read queries from being executed in the editor.
export const validateQueryForDDLSyntax = (query: string) =>
    !ddlCommands.some(command => query.toUpperCase().includes(command))

export async function runQuery(
    query: string,
    pg: PGliteInterface,
): Promise<Response> {
    // if (!validateQueryForDDLSyntax(query)) {
    //     throw new Error("Access denied. Only read operations are allowed.")
    // }
    if (query.trim().toLowerCase().startsWith('\\')) {
        return runDescribe(query, pg)
    }
    const start = performance.now()
    const result = await pg.exec(query, {
        rowMode: 'array',
    })
    const elapsed = performance.now() - start
    return {
        results: result as Results[],
        time: elapsed,
    }
}

export async function runDescribe(
    query: string,
    pg: PGliteInterface,
): Promise<Response> {
    const start = performance.now()
    let out: string | Record<string, unknown> | undefined
    let ret: Results
    const { promise } = describe(
        query,
        'postgres',
        async (sql) => {
            ret = (await pg.exec(sql, { rowMode: 'array' }))[0] as Results
            return {
                rows: ret.rows,
                fields: ret.fields,
                rowCount: ret.rows.length,
            }
        },
        (output) => {
            out = output
        },
    )
    await promise
    const elapsed = performance.now() - start

    if (!out) {
        return {
            error: 'No output',
            time: elapsed,
        }
    } else if (typeof out === 'string') {
        if (out.startsWith('ERROR:')) {
            return {
                error: out,
                time: elapsed,
            }
        } else {
            return {
                text: out,
                time: elapsed,
            }
        }
    } else {
        return {
            text: out.title as string,
            results: [ret!],
            time: elapsed,
        }
    }
}

export async function getSchema(
    pg: PGliteInterface,
): Promise<Record<string, string[]>> {
    const ret = await pg.query<{
        schema: string
        table: string
        columns: string
    }>(`
    SELECT 
      table_schema AS schema,
      table_name AS table,
      array_agg(column_name) AS columns
    FROM 
      information_schema.columns
    GROUP BY 
      table_schema, table_name
    ORDER BY 
      table_schema, table_name;
  `)
    const schema: Record<string, string[]> = {}
    for (const row of ret.rows) {
        schema[`${row.schema}.${row.table}`] = Array.isArray(row.columns)
            ? row.columns
            : row.columns.slice(1, -1).split(',')
    }
    return schema
}

export const generateRandomString = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
