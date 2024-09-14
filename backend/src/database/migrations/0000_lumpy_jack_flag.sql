CREATE TABLE IF NOT EXISTS "devices" (
	"id" serial PRIMARY KEY NOT NULL,
	"device_name" text NOT NULL,
	"device_type" varchar(256) NOT NULL,
	"owner_name" text NOT NULL,
	"battery_status" integer NOT NULL
);
