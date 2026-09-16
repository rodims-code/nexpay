import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});

export function phoneLoginEmail(phone: string) {
  return `${phone.replace(/\D/g, "")}@phone.nexpay.invalid`;
}
