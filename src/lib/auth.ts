import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "../db";
import * as schema from "../db/schema";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3002",
    "http://127.0.0.1:3002",
  ],
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  user: {
    additionalFields: {
      phone: { type: "string", required: true, unique: true, input: true },
      countryCode: { type: "string", required: true, input: true },
      currency: { type: "string", required: true, input: true },
      firstName: { type: "string", required: true, input: true },
      lastName: { type: "string", required: true, input: true },
      birthDate: { type: "string", required: true, input: true },
    },
  },
  plugins: [tanstackStartCookies()],
});
