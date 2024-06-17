DO $$ BEGIN
 CREATE TYPE "public"."listing_category_enum" AS ENUM('private', 'public');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."listing_type_enum" AS ENUM('wts', 'wtb', 'wtl', 'wtr');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."property_type_enum" AS ENUM('residential', 'commercial', 'industrial', 'land');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."role_enum" AS ENUM('admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "clients" (
	"id" serial PRIMARY KEY NOT NULL,
	"listing_id" uuid,
	"name" varchar DEFAULT '' NOT NULL,
	"contact_number" varchar DEFAULT '' NOT NULL,
	"email" varchar DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "commercials" (
	"id" serial PRIMARY KEY NOT NULL,
	"listing_id" uuid,
	"property_sub_type" varchar DEFAULT '' NOT NULL,
	"furnishing" varchar DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "industrials" (
	"id" serial PRIMARY KEY NOT NULL,
	"listing_id" uuid,
	"property_sub_type" varchar DEFAULT '' NOT NULL,
	"floor_loading" numeric DEFAULT '0.00' NOT NULL,
	"eaves_height" numeric DEFAULT '0.00' NOT NULL,
	"power_supply" numeric DEFAULT '0.00' NOT NULL,
	"usage" varchar DEFAULT '' NOT NULL,
	"is_gas_supply" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lands" (
	"id" serial PRIMARY KEY NOT NULL,
	"listing_id" uuid,
	"property_sub_type" varchar DEFAULT '' NOT NULL,
	"status" varchar DEFAULT '' NOT NULL,
	"reserve" varchar DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "listings" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"project_name" varchar DEFAULT '' NOT NULL,
	"listing_type" "listing_type_enum" DEFAULT 'wts' NOT NULL,
	"listing_category" "listing_category_enum" DEFAULT 'public' NOT NULL,
	"property_type" "property_type_enum" DEFAULT 'residential' NOT NULL,
	"tenure" varchar DEFAULT '' NOT NULL,
	"property_status" varchar DEFAULT '' NOT NULL,
	"land_area" numeric DEFAULT '0.00' NOT NULL,
	"built_up_area" numeric DEFAULT '0.00' NOT NULL,
	"price" numeric DEFAULT '0.00' NOT NULL,
	"current_rental" numeric DEFAULT '0.00' NOT NULL,
	"description" varchar DEFAULT '' NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"is_available" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "property_addresses" (
	"id" serial PRIMARY KEY NOT NULL,
	"listing_id" uuid,
	"address_line1" varchar DEFAULT '' NOT NULL,
	"address_line2" varchar DEFAULT '' NOT NULL,
	"city" varchar DEFAULT '' NOT NULL,
	"state" varchar DEFAULT '' NOT NULL,
	"postal_code" varchar DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "residentials" (
	"id" serial PRIMARY KEY NOT NULL,
	"listing_id" uuid,
	"property_sub_type" varchar DEFAULT '' NOT NULL,
	"bedrooms" integer DEFAULT 0 NOT NULL,
	"bathrooms" integer DEFAULT 0 NOT NULL,
	"car_parks" integer DEFAULT 0 NOT NULL,
	"furnishing" varchar DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"role" "role_enum" DEFAULT 'user' NOT NULL,
	"contact_number" varchar DEFAULT '' NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"is_approved" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "clients" ADD CONSTRAINT "clients_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "commercials" ADD CONSTRAINT "commercials_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "industrials" ADD CONSTRAINT "industrials_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lands" ADD CONSTRAINT "lands_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "listings" ADD CONSTRAINT "listings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "property_addresses" ADD CONSTRAINT "property_addresses_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "residentials" ADD CONSTRAINT "residentials_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
