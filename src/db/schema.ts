import { is, relations } from "drizzle-orm";
import {
  boolean,
  decimal,
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { list } from "postcss";
import { use } from "react";

export const roleEnum = pgEnum("role_enum", ["admin", "user"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  email: varchar("email").notNull().unique(),
  password: varchar("password").notNull(),
  role: roleEnum("role").notNull().default("user"),
  contactNumber: varchar("contact_number").notNull().default(""),
  isActive: boolean("is_active").notNull().default(false),
  isVerified: boolean("is_verified").notNull().default(false),
  isApproved: boolean("is_approved").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const listingTypeEnum = pgEnum("listing_type_enum", [
  "wts",
  "wtb",
  "wtl",
  "wtr",
]);
export const listingCategoryEnum = pgEnum("listing_category_enum", [
  "private",
  "public",
]);
export const propertyTypeEnum = pgEnum("property_type_enum", [
  "residential",
  "commercial",
  "industrial",
  "land",
]);

export const listings = pgTable("listings", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  projectName: varchar("project_name").notNull().default(""),
  listingType: listingTypeEnum("listing_type").notNull().default("wts"),
  listingCategory: listingCategoryEnum("listing_category")
    .notNull()
    .default("public"),
  propertyType: propertyTypeEnum("property_type")
    .notNull()
    .default("residential"),
  tenure: varchar("tenure").notNull().default(""),
  propertyStatus: varchar("property_status").notNull().default(""),
  landArea: decimal("land_area").notNull().default("0.00"),
  builtUpArea: decimal("built_up_area").notNull().default("0.00"),
  price: decimal("price").notNull().default("0.00"),
  currentRental: decimal("current_rental").notNull().default("0.00"),
  description: varchar("description").notNull().default(""),
  isActive: boolean("is_active").notNull().default(false),
  isAvailable: boolean("is_available").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const propertyAddresses = pgTable("property_addresses", {
  id: serial("id").primaryKey(),
  listingId: uuid("listing_id").references(() => listings.id),
  addressLine1: varchar("address_line1").notNull().default(""),
  addressLine2: varchar("address_line2").notNull().default(""),
  city: varchar("city").notNull().default(""),
  state: varchar("state").notNull().default(""),
  postalCode: varchar("postal_code").notNull().default(""),
});

export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  listingId: uuid("listing_id").references(() => listings.id),
  name: varchar("name").notNull().default(""),
  contactNumber: varchar("contact_number").notNull().default(""),
  email: varchar("email").notNull().default(""),
});

export const residentials = pgTable("residentials", {
  id: serial("id").primaryKey(),
  listingId: uuid("listing_id").references(() => listings.id),
  propertySubType: varchar("property_sub_type").notNull().default(""),
  bedrooms: integer("bedrooms").notNull().default(0),
  bathrooms: integer("bathrooms").notNull().default(0),
  carParks: integer("car_parks").notNull().default(0),
  furnishing: varchar("furnishing").notNull().default(""),
});

export const commercials = pgTable("commercials", {
  id: serial("id").primaryKey(),
  listingId: uuid("listing_id").references(() => listings.id),
  propertySubType: varchar("property_sub_type").notNull().default(""),
  furnishing: varchar("furnishing").notNull().default(""),
});

export const industrials = pgTable("industrials", {
  id: serial("id").primaryKey(),
  listingId: uuid("listing_id").references(() => listings.id),
  propertySubType: varchar("property_sub_type").notNull().default(""),
  floorLoading: decimal("floor_loading").notNull().default("0.00"),
  eavesHeight: decimal("eaves_height").notNull().default("0.00"),
  powerSupply: decimal("power_supply").notNull().default("0.00"),
  usage: varchar("usage").notNull().default(""),
  isGasSupply: boolean("is_gas_supply").notNull().default(false),
});

export const lands = pgTable("lands", {
  id: serial("id").primaryKey(),
  listingId: uuid("listing_id").references(() => listings.id),
  propertySubType: varchar("property_sub_type").notNull().default(""),
  status: varchar("status").notNull().default(""),
  reserve: varchar("reserve").notNull().default(""),
});

// Relationships
export const usersRelations = relations(users, ({ many }) => ({
  listings: many(listings),
}));

export const listingsRelations = relations(listings, ({ one }) => ({
  user: one(users, {
    fields: [listings.userId],
    references: [users.id],
  }),
  propertyAddresses: one(propertyAddresses),
  clients: one(clients),
  residentials: one(residentials),
  commercials: one(commercials),
  industrials: one(industrials),
  lands: one(lands),
}));

export const propertyAddressesRelations = relations(
  propertyAddresses,
  ({ one }) => ({
    listings: one(listings),
  })
);

export const clientsRelations = relations(clients, ({ one }) => ({
  listings: one(listings),
}));

export const residentialsRelations = relations(residentials, ({ one }) => ({
  listings: one(listings),
}));

export const commercialsRelations = relations(commercials, ({ one }) => ({
  listings: one(listings),
}));

export const industrialsRelations = relations(industrials, ({ one }) => ({
  listings: one(listings),
}));

export const landsRelations = relations(lands, ({ one }) => ({
  listings: one(listings),
}));
