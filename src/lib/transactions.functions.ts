import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { and, desc, eq } from "drizzle-orm";
import { db } from "#/db";
import { contact, transaction } from "#/db/schema";
import { auth } from "./auth";

async function getAuthenticatedUser() {
  const session = await auth.api.getSession({ headers: getRequestHeaders() });
  if (!session?.user) {
    throw new Error("Utilisateur non authentifié");
  }
  return session.user;
}

export const getTransactions = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = await getAuthenticatedUser();
    const list = await db
      .select()
      .from(transaction)
      .where(eq(transaction.userId, user.id))
      .orderBy(desc(transaction.createdAt));

    return list;
  },
);

export const getRecentRecipients = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = await getAuthenticatedUser();

    // Fetch the user's latest transactions
    const txs = await db
      .select({
        name: transaction.recipientName,
        phone: transaction.recipientPhone,
        createdAt: transaction.createdAt,
      })
      .from(transaction)
      .where(eq(transaction.userId, user.id))
      .orderBy(desc(transaction.createdAt))
      .limit(20);

    // Extract unique recipients by phone
    const seen = new Set<string>();
    const recents: Array<{ name: string; phone: string }> = [];

    for (const tx of txs) {
      if (!seen.has(tx.phone)) {
        seen.add(tx.phone);
        recents.push({ name: tx.name, phone: tx.phone });
      }
      if (recents.length >= 6) break;
    }

    // If fewer than 4 recent recipients, complete with user's saved contacts
    if (recents.length < 4) {
      const userContacts = await db
        .select({
          name: contact.name,
          phone: contact.phone,
        })
        .from(contact)
        .where(eq(contact.userId, user.id))
        .orderBy(desc(contact.favorite), contact.name)
        .limit(6);

      for (const c of userContacts) {
        if (!seen.has(c.phone)) {
          seen.add(c.phone);
          recents.push({ name: c.name, phone: c.phone });
        }
        if (recents.length >= 6) break;
      }
    }

    return recents;
  },
);

export const createTransaction = createServerFn({ method: "POST" })
  .validator(
    (data: {
      recipientName: string;
      recipientPhone: string;
      amount: string;
      fee: string;
      total: string;
      currency?: string;
      paymentMethodName: string;
      paymentMethodBadge?: string;
      note?: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const user = await getAuthenticatedUser();

    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const reference = `NP-${randomSuffix}`;

    const [created] = await db
      .insert(transaction)
      .values({
        id: crypto.randomUUID(),
        reference,
        userId: user.id,
        recipientName: data.recipientName.trim(),
        recipientPhone: data.recipientPhone.trim(),
        amount: data.amount,
        fee: data.fee,
        total: data.total,
        currency: data.currency || "XAF",
        paymentMethodName: data.paymentMethodName,
        paymentMethodBadge: data.paymentMethodBadge || "MTN",
        status: "Terminée",
        note: data.note?.trim() || null,
      })
      .returning();

    return created;
  });

export const getDashboardOverviewData = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = await getAuthenticatedUser();

    const txs = await db
      .select()
      .from(transaction)
      .where(eq(transaction.userId, user.id))
      .orderBy(desc(transaction.createdAt));

    // Calculate real monthly sent stats
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let totalSentMonth = 0;
    let totalCountMonth = 0;
    let successCount = 0;

    for (const tx of txs) {
      const txDate = new Date(tx.createdAt);
      if (
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear
      ) {
        totalSentMonth += parseInt(tx.amount || "0", 10);
        totalCountMonth += 1;
      }
      if (tx.status === "Terminée") {
        successCount += 1;
      }
    }

    const successRate =
      txs.length > 0
        ? Math.round((successCount / txs.length) * 1000) / 10
        : 100;

    return {
      recentTransactions: txs.slice(0, 5),
      totalTransactionsCount: txs.length,
      stats: {
        sentThisMonth: totalSentMonth,
        sentCountThisMonth: totalCountMonth,
        receivedThisMonth: 0, // Since NexPay doesn't store money and account is pass-through
        receivedCountThisMonth: 0,
        successRate: txs.length > 0 ? `${successRate}%` : "100%",
      },
    };
  },
);
