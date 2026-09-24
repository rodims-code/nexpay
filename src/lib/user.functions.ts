import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";
import { db } from "#/db";
import { user } from "#/db/schema";
import { auth } from "./auth";

async function getAuthenticatedUser() {
  const session = await auth.api.getSession({ headers: getRequestHeaders() });
  if (!session?.user) {
    throw new Error("Utilisateur non authentifié");
  }
  return session.user;
}

export const getUserProfile = createServerFn({ method: "GET" }).handler(
  async () => {
    const authUser = await getAuthenticatedUser();
    const [profile] = await db
      .select()
      .from(user)
      .where(eq(user.id, authUser.id));

    if (!profile) {
      throw new Error("Profil utilisateur introuvable");
    }

    return profile;
  },
);

export const updateUserProfile = createServerFn({ method: "POST" })
  .validator(
    (data: {
      firstName: string;
      lastName: string;
      phone: string;
      email?: string;
      birthDate: string;
      countryCode: string;
      currency: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const authUser = await getAuthenticatedUser();

    if (!data.firstName?.trim() || !data.lastName?.trim()) {
      throw new Error("Le prénom et le nom sont obligatoires");
    }
    if (!data.phone?.trim()) {
      throw new Error("Le numéro de téléphone est obligatoire");
    }

    const fullName = `${data.firstName.trim()} ${data.lastName.trim()}`.trim();

    // Check if phone is already taken by another user
    if (data.phone.trim() !== authUser.phone) {
      const existingPhone = await db
        .select({ id: user.id })
        .from(user)
        .where(eq(user.phone, data.phone.trim()));

      if (existingPhone.length > 0 && existingPhone[0].id !== authUser.id) {
        throw new Error("Ce numéro de téléphone est déjà associé à un autre compte");
      }
    }

    const [updated] = await db
      .update(user)
      .set({
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        name: fullName,
        phone: data.phone.trim(),
        birthDate: data.birthDate?.trim() || "",
        countryCode: data.countryCode?.trim() || "CG",
        currency: data.currency?.trim() || "XAF",
        ...(data.email?.trim() ? { email: data.email.trim() } : {}),
        updatedAt: new Date(),
      })
      .where(eq(user.id, authUser.id))
      .returning();

    return updated;
  });
