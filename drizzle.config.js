import "dotenv/config";

import { defineConfig } from "drizzle-kit";
const dbURL = process.env.DATABASE_URL;

if (!dbURL) {
  throw new Error(
    "❌ DATABASE_URL não foi encontrada nas variáveis de ambiente!",
  );
}

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: dbURL,
  },
});
