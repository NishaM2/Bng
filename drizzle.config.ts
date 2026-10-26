import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  // PostGIS adds its own tables (e.g. spatial_ref_sys); don't treat them as ours.
  extensionsFilters: ["postgis"],
  schemaFilter: ["public"],
  strict: true,
  verbose: true,
});
