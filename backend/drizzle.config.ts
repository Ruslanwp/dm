import { defineConfig } from "drizzle-kit";
import { initEnvConfig } from "./src/utils/env-config";
import path from "path";

initEnvConfig();

export default defineConfig({
  schema: path.join(__dirname, "..", "shared", "schema.ts"),
  out: path.join(__dirname, "src", "database", "migrations"),
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env['DATABASE_URL'] || '',
  }
});