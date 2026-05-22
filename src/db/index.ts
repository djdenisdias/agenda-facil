import "dotenv/config";

import { drizzle } from "drizzle-orm/neon-http";

const dbURL = process.env.DATABASE_URL;

if (!dbURL) {
  throw new Error(
    "❌ DATABASE_URL não foi encontrada nas variáveis de ambiente!",
  );
}

export const db = drizzle(dbURL);
