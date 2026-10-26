import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { config } from "../config.js";
import * as schema from "./schema.js";

// One shared pool for the whole app. Each query borrows a connection and returns it.
export const pool = new Pool({
  connectionString: config.DATABASE_URL,
  max: 10,
  connectionTimeoutMillis: 5_000,
});

// If Postgres goes away, idle connections emit an error. Without this listener
// Node treats it as unhandled and the whole server crashes.
pool.on("error", (err) => {
  console.error("Postgres pool error:", err.message);
});

export const db = drizzle({ client: pool, schema });
