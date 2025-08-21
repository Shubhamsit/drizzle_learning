CREATE TYPE "public"."userRole" AS ENUM('ADMIN', 'BASIC');--> statement-breakpoint
CREATE TABLE "post" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(245) NOT NULL,
	"averageRating" real DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"authorId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userPrefrences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"emailUpdates" boolean DEFAULT false NOT NULL,
	"userId" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "userRole" "userRole" DEFAULT 'BASIC' NOT NULL;--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_authorId_users_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userPrefrences" ADD CONSTRAINT "userPrefrences_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "emailIndex" ON "users" USING btree ("email");--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "roll";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "uniqueNameAndAge" UNIQUE("name","age");