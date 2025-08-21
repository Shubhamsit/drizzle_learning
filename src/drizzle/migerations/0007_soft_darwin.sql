CREATE TABLE "category" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(245) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "postCategory" (
	"postId" uuid NOT NULL,
	"categoryId" uuid NOT NULL,
	CONSTRAINT "postCategory_categoryId_postId_pk" PRIMARY KEY("categoryId","postId")
);
--> statement-breakpoint
ALTER TABLE "postCategory" ADD CONSTRAINT "postCategory_postId_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."post"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "postCategory" ADD CONSTRAINT "postCategory_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;