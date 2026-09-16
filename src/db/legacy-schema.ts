import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

// Used only by the standalone Drizzle example in src/index.ts.
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});
