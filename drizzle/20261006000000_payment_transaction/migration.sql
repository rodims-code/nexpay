CREATE TABLE "payment_transaction" ("id" text PRIMARY KEY NOT NULL, "transaction_id" text NOT NULL, "provider" text NOT NULL, "provider_reference" text UNIQUE, "amount" integer NOT NULL, "currency" text NOT NULL, "status" text DEFAULT 'pending' NOT NULL, "created_at" timestamp DEFAULT now() NOT NULL, "updated_at" timestamp DEFAULT now() NOT NULL);
--> statement-breakpoint
CREATE INDEX "payment_transaction_transaction_id_idx" ON "payment_transaction" ("transaction_id");
--> statement-breakpoint
ALTER TABLE "payment_transaction" ADD CONSTRAINT "payment_transaction_transaction_id_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("id") ON DELETE CASCADE;
