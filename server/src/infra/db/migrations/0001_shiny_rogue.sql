ALTER TABLE "links" ADD COLUMN "displayUrl" text NOT NULL;--> statement-breakpoint
ALTER TABLE "links" ADD CONSTRAINT "links_displayUrl_unique" UNIQUE("displayUrl");