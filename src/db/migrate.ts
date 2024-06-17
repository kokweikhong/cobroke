import "dotenv/config";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const migrationClient = postgres(process.env.DATABASE_URL!, {
  max: 1,
});

async function main() {
  await migrate(drizzle(migrationClient), "src/db/migrations");

  await migrationClient.end();
}

main().catch(console.error);
