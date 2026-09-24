import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { and, desc, eq } from "drizzle-orm";
import { db } from "#/db";
import { paymentMethod } from "#/db/schema";
import { auth } from "./auth";

async function getAuthenticatedUser() {
  const session = await auth.api.getSession({ headers: getRequestHeaders() });
  if (!session?.user) {
    throw new Error("Utilisateur non authentifié");
  }
  return session.user;
}

export const getPaymentMethods = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = await getAuthenticatedUser();
    const methods = await db
      .select()
      .from(paymentMethod)
      .where(eq(paymentMethod.userId, user.id))
      .orderBy(desc(paymentMethod.isDefault), desc(paymentMethod.createdAt));

    return methods;
  },
);

export const createPaymentMethod = createServerFn({ method: "POST" })
  .validator(
    (data: {
      type: string;
      provider: string;
      name: string;
      accountNumber: string;
      isDefault?: boolean;
    }) => data,
  )
  .handler(async ({ data }) => {
    const user = await getAuthenticatedUser();

    if (!data.name?.trim() || !data.accountNumber?.trim()) {
      throw new Error("Nom et numéro de compte obligatoires");
    }

    // Check existing count to decide if this must be default
    const existing = await db
      .select({ id: paymentMethod.id })
      .from(paymentMethod)
      .where(eq(paymentMethod.userId, user.id));

    const shouldBeDefault = existing.length === 0 || Boolean(data.isDefault);

    if (shouldBeDefault && existing.length > 0) {
      await db
        .update(paymentMethod)
        .set({ isDefault: false })
        .where(eq(paymentMethod.userId, user.id));
    }

    const [created] = await db
      .insert(paymentMethod)
      .values({
        id: crypto.randomUUID(),
        userId: user.id,
        type: data.type || "mobile_money",
        provider: data.provider || "mtn",
        name: data.name.trim(),
        accountNumber: data.accountNumber.trim(),
        isDefault: shouldBeDefault,
      })
      .returning();

    return created;
  });

export const updatePaymentMethod = createServerFn({ method: "POST" })
  .validator(
    (data: {
      id: string;
      name: string;
      accountNumber: string;
      provider: string;
      type: string;
      isDefault?: boolean;
    }) => data,
  )
  .handler(async ({ data }) => {
    const user = await getAuthenticatedUser();

    if (data.isDefault) {
      await db
        .update(paymentMethod)
        .set({ isDefault: false })
        .where(eq(paymentMethod.userId, user.id));
    }

    const [updated] = await db
      .update(paymentMethod)
      .set({
        name: data.name.trim(),
        accountNumber: data.accountNumber.trim(),
        provider: data.provider,
        type: data.type,
        ...(data.isDefault !== undefined ? { isDefault: Boolean(data.isDefault) } : {}),
        updatedAt: new Date(),
      })
      .where(
        and(eq(paymentMethod.id, data.id), eq(paymentMethod.userId, user.id)),
      )
      .returning();

    return updated;
  });

export const deletePaymentMethod = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const user = await getAuthenticatedUser();

    // Check if the one to be deleted is default
    const [target] = await db
      .select()
      .from(paymentMethod)
      .where(
        and(eq(paymentMethod.id, data.id), eq(paymentMethod.userId, user.id)),
      );

    if (!target) {
      throw new Error("Moyen de paiement introuvable");
    }

    await db
      .delete(paymentMethod)
      .where(
        and(eq(paymentMethod.id, data.id), eq(paymentMethod.userId, user.id)),
      );

    // If it was default, set another remaining method as default
    if (target.isDefault) {
      const [next] = await db
        .select()
        .from(paymentMethod)
        .where(eq(paymentMethod.userId, user.id))
        .orderBy(desc(paymentMethod.createdAt))
        .limit(1);

      if (next) {
        await db
          .update(paymentMethod)
          .set({ isDefault: true })
          .where(eq(paymentMethod.id, next.id));
      }
    }

    return { success: true };
  });

export const setDefaultPaymentMethod = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const user = await getAuthenticatedUser();

    await db
      .update(paymentMethod)
      .set({ isDefault: false })
      .where(eq(paymentMethod.userId, user.id));

    const [updated] = await db
      .update(paymentMethod)
      .set({ isDefault: true, updatedAt: new Date() })
      .where(
        and(eq(paymentMethod.id, data.id), eq(paymentMethod.userId, user.id)),
      )
      .returning();

    return updated;
  });
