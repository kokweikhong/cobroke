import { listings, users } from "./schema";
import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  generateMockListings,
  randomDecimalNumberString,
  randomIntegerString,
  randomValueFromArray,
} from "./utils";
// import { neon } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/neon-http";

const queryClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle(queryClient);

async function main() {
  await db.delete(listings);
  await db.delete(users);
  const user = await db
    .insert(users)
    .values({
      firstName: "Cobroke",
      lastName: "Admin",
      email: "admin@cobroke.com",
      password: "admin",
    })
    .returning({ id: users.id });

  const mockListings = generateMockListings(user[0].id, 1000);

  await db
    .insert(listings)
    .values(mockListings as any)
    .returning({ id: listings.id });
}

main().catch(console.error);
