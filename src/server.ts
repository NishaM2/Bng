import express from "express";
import { sql } from "drizzle-orm";
import { config } from "./config.js";
import { db } from "./db/index.js";

const app = express();
const PORT = config.PORT;

app.get("/health", (_req, res) => {
  res.send("ok");
});

// Asks Postgres for its current time. Proves the app can reach the database.
app.get("/db-check", async (_req, res) => {
  try {
    const result = await db.execute<{ now: string }>(sql`select now() as now`);
    res.json({ ok: true, databaseTime: result.rows[0]?.now });
  } catch (err) {
    // Drizzle wraps driver errors; the real reason (e.g. ECONNREFUSED) is in `cause`.
    const root = err instanceof Error && err.cause instanceof Error ? err.cause : err;
    const code = (root as { code?: string }).code;
    const message = code ?? (root instanceof Error ? root.message : String(root));
    console.error("DB check failed:", message);
    res.status(503).json({
      ok: false,
      error: "Cannot reach the database. Is Postgres running?",
      detail: message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
