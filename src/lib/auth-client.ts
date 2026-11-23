import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL:
    typeof window !== 'undefined'
      ? window.location.origin
      : (process.env.APP_URL ?? 'http://localhost:3000'),
  plugins: [inferAdditionalFields<typeof auth>()],
})

export const { useSession, signIn, signOut, signUp } = authClient

export function phoneLoginEmail(phone: string) {
  return `${phone.replace(/\D/g, "")}@phone.nexpay.invalid`;
}
