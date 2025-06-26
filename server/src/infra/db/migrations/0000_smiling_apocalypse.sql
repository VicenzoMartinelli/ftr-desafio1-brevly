CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"route" text NOT NULL,
	"url" text NOT NULL,
	"hits" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "links_route_unique" UNIQUE("route")
);
