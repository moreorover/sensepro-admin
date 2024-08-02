ALTER TABLE "location_devices" RENAME COLUMN "mac_address" TO "mac";--> statement-breakpoint
ALTER TABLE "location_devices" DROP CONSTRAINT "location_devices_device_type_id_device_types_id_fk";
--> statement-breakpoint
ALTER TABLE "location_devices" ALTER COLUMN "name" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "location_devices" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "location_devices" ALTER COLUMN "mac" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "location_devices" ALTER COLUMN "mac" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "location_devices" ALTER COLUMN "ip" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "location_devices" ALTER COLUMN "ip" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "location_devices" ALTER COLUMN "device_type_id" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "location_devices" ALTER COLUMN "device_type_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "location_devices" ADD COLUMN "pin" integer DEFAULT 0;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "location_devices" ADD CONSTRAINT "location_devices_device_type_id_device_types_id_fk" FOREIGN KEY ("device_type_id") REFERENCES "public"."device_types"("id") ON DELETE set default ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
