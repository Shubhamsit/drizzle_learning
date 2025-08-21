CREATE TABLE "myuser" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"roll" integer NOT NULL,
	"age" integer NOT NULL,
	"x" integer NOT NULL,
	"email" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "user" CASCADE;