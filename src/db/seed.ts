import {
  clients,
  commercials,
  industrials,
  lands,
  listings,
  propertyAddresses,
  residentials,
  users,
} from "./schema";
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

  const listingData = await db
    .insert(listings)
    .values(mockListings as any)
    .returning({ id: listings.id, propertyType: listings.propertyType });

  console.log("Listings created: ", listingData.length);

  listingData.forEach(async (listing) => {
    console.log("Listing created: ", listing.id);
    await db.insert(propertyAddresses).values({
      listingId: listing.id,
      addressLine1: "123 Main St " + randomIntegerString(1, 1000),
      addressLine2: "Apt " + randomIntegerString(1, 1000),
      city: randomValueFromArray([
        "New York",
        "Los Angeles",
        "Chicago",
        "Houston",
        "Phoenix",
        "Philadelphia",
        "San Antonio",
        "San Diego",
        "Dallas",
        "San Jose",
      ]),
      state: randomValueFromArray([
        "NY",
        "CA",
        "IL",
        "TX",
        "AZ",
        "PA",
        "TX",
        "CA",
        "TX",
        "CA",
      ]),
      postalCode: randomIntegerString(10000, 99999),
    });

    await db.insert(clients).values({
      listingId: listing.id,
      name: "Client " + randomIntegerString(1, 1000),
      email: "client" + randomIntegerString(1, 1000) + "@cobroke.com",
      contactNumber: randomIntegerString(1000000000, 9999999999),
    });

    switch (listing.propertyType) {
      case "residential":
        await db.insert(residentials).values({
          listingId: listing.id,
          propertySubType: randomValueFromArray([
            "single_family",
            "multi_family",
            "townhouse",
            "condo",
            "apartment",
            "duplex",
            "triplex",
            "quadplex",
          ]),
          bedrooms: Number(randomIntegerString(1, 5)),
          bathrooms: Number(randomIntegerString(1, 5)),
          carParks: Number(randomIntegerString(1, 5)),
          furnishing: randomValueFromArray(["furnished", "unfurnished"]),
        });
        break;
      case "commercial":
        await db.insert(commercials).values({
          listingId: listing.id,
          propertySubType: randomValueFromArray([
            "office",
            "retail",
            "industrial",
            "land",
            "special_purpose",
          ]),
          furnishing: randomValueFromArray(["furnished", "unfurnished"]),
        });
        break;
      case "industrial":
        await db.insert(industrials).values({
          listingId: listing.id,
          propertySubType: randomValueFromArray([
            "warehouse",
            "factory",
            "workshop",
            "land",
            "special_purpose",
          ]),
          floorLoading: randomDecimalNumberString(1000, 10000, 2),
          eavesHeight: randomDecimalNumberString(10, 50, 2),
          powerSupply: randomIntegerString(100, 1000),
          isGasSupply: Math.random() < 0.5,
          usage: randomValueFromArray([
            "general",
            "heavy",
            "light",
            "chemical",
            "food",
            "pharmaceutical",
            "biomedical",
            "electronics",
            "manufacturing",
            "logistics",
            "storage",
            "special_purpose",
          ]),
        });
        break;
      case "land":
        await db.insert(lands).values({
          listingId: listing.id,
          propertySubType: randomValueFromArray([
            "residential",
            "commercial",
            "industrial",
            "agricultural",
            "special_purpose",
          ]),
          status: randomValueFromArray([
            "for_sale",
            "for_lease",
            "for_sale_and_lease",
          ]),
          reserve: randomValueFromArray(["Bumi", "Non-Bumi", "International"]),
        });
    }
  });
}

main().catch(console.error);
