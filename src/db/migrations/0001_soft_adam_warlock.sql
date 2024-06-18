ALTER TABLE "clients" DROP CONSTRAINT "clients_listing_id_listings_id_fk";
--> statement-breakpoint
ALTER TABLE "commercials" DROP CONSTRAINT "commercials_listing_id_listings_id_fk";
--> statement-breakpoint
ALTER TABLE "industrials" DROP CONSTRAINT "industrials_listing_id_listings_id_fk";
--> statement-breakpoint
ALTER TABLE "lands" DROP CONSTRAINT "lands_listing_id_listings_id_fk";
--> statement-breakpoint
ALTER TABLE "property_addresses" DROP CONSTRAINT "property_addresses_listing_id_listings_id_fk";
--> statement-breakpoint
ALTER TABLE "residentials" DROP CONSTRAINT "residentials_listing_id_listings_id_fk";
--> statement-breakpoint
ALTER TABLE "listings" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "clients" ADD CONSTRAINT "clients_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "commercials" ADD CONSTRAINT "commercials_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "industrials" ADD CONSTRAINT "industrials_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lands" ADD CONSTRAINT "lands_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "property_addresses" ADD CONSTRAINT "property_addresses_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "residentials" ADD CONSTRAINT "residentials_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
