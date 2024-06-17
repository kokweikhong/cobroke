import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
// import { neon } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/neon-http";

const queryClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle(queryClient, { schema, logger: true });
