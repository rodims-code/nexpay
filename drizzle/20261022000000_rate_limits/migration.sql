CREATE TABLE "rateLimit" (
  "id" text PRIMARY KEY NOT NULL,
  "key" text NOT NULL UNIQUE,
  "count" integer NOT NULL,
  "last_request" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "waitlist_rate_limit" (
  "ip" text PRIMARY KEY NOT NULL,
  "count" integer NOT NULL,
  "window_started_at" timestamp DEFAULT now() NOT NULL
);
