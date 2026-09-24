import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { and, desc, eq } from "drizzle-orm";
import { db } from "#/db";
import { contact } from "#/db/schema";
import { auth } from "./auth";

async function getAuthenticatedUser() {
  const session = await auth.api.getSession({ headers: getRequestHeaders() });
  if (!session?.user) {
    throw new Error("Utilisateur non authentifié");
  }
  return session.user;
}

export const getContacts = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = await getAuthenticatedUser();
    const list = await db
      .select()
      .from(contact)
      .where(eq(contact.userId, user.id))
      .orderBy(desc(contact.favorite), contact.name);

    return list;
  },
);

export const createContact = createServerFn({ method: "POST" })
  .validator(
    (data: {
      name: string;
      phone: string;
      email?: string;
      favorite?: boolean;
    }) => data,
  )
  .handler(async ({ data }) => {
    const user = await getAuthenticatedUser();

    if (!data.name?.trim() || !data.phone?.trim()) {
      throw new Error("Nom et numéro de téléphone obligatoires");
    }

    const [created] = await db
      .insert(contact)
      .values({
        id: crypto.randomUUID(),
        userId: user.id,
        name: data.name.trim(),
        phone: data.phone.trim(),
        email: data.email?.trim() || null,
        favorite: Boolean(data.favorite),
      })
      .returning();

    return created;
  });

export const updateContact = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id: string;
      name: string;
      phone: string;
      email?: string;
      favorite?: boolean;
    }) => data,
  )
  .handler(async ({ data }) => {
    const user = await getAuthenticatedUser();

    if (!data.name?.trim() || !data.phone?.trim()) {
      throw new Error("Nom et numéro de téléphone obligatoires");
    }

    const [updated] = await db
      .update(contact)
      .set({
        name: data.name.trim(),
        phone: data.phone.trim(),
        email: data.email?.trim() || null,
        ...(data.favorite !== undefined ? { favorite: Boolean(data.favorite) } : {}),
        updatedAt: new Date(),
      })
      .where(and(eq(contact.id, data.id), eq(contact.userId, user.id)))
      .returning();

    return updated;
  });

export const toggleFavoriteContact = createServerFn({ method: "POST" })
  .validator((data: { id: string; favorite: boolean }) => data)
  .handler(async ({ data }) => {
    const user = await getAuthenticatedUser();

    const [updated] = await db
      .update(contact)
      .set({
        favorite: data.favorite,
        updatedAt: new Date(),
      })
      .where(and(eq(contact.id, data.id), eq(contact.userId, user.id)))
      .returning();

    return updated;
  });

export const deleteContact = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const user = await getAuthenticatedUser();

    await db
      .delete(contact)
      .where(and(eq(contact.id, data.id), eq(contact.userId, user.id)));

    return { success: true };
  });
