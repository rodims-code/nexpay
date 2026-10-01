import { createServerFn, getRequestHeaders } from "./ssr2.mjs";
import { auth, db, paymentMethod } from "./auth-CgLSap3w.mjs";
import { and, desc, eq } from "../_libs/drizzle-orm.mjs";
import { createServerRpc } from "./createServerRpc-NKXqGQmx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/payment-methods.functions-iJohNvX7.js
async function getAuthenticatedUser() {
	const session = await auth.api.getSession({ headers: getRequestHeaders() });
	if (!session?.user) throw new Error("Utilisateur non authentifié");
	return session.user;
}
var getPaymentMethods_createServerFn_handler = createServerRpc({
	id: "26e0ad3ba15d26c3b3b635e9ae69050cad62771506c0759c530e586fe4f370ac",
	name: "getPaymentMethods",
	filename: "src/lib/payment-methods.functions.ts"
}, (opts) => getPaymentMethods.__executeServer(opts));
var getPaymentMethods = createServerFn({ method: "GET" }).handler(getPaymentMethods_createServerFn_handler, async () => {
	const user = await getAuthenticatedUser();
	return await db.select().from(paymentMethod).where(eq(paymentMethod.userId, user.id)).orderBy(desc(paymentMethod.isDefault), desc(paymentMethod.createdAt));
});
var createPaymentMethod_createServerFn_handler = createServerRpc({
	id: "6cde012380237819c6e1a83c6f79fe57d0597615ff010dd411942f522f1b1ca1",
	name: "createPaymentMethod",
	filename: "src/lib/payment-methods.functions.ts"
}, (opts) => createPaymentMethod.__executeServer(opts));
var createPaymentMethod = createServerFn({ method: "POST" }).validator((data) => data).handler(createPaymentMethod_createServerFn_handler, async ({ data }) => {
	const user = await getAuthenticatedUser();
	if (!data.name?.trim() || !data.accountNumber?.trim()) throw new Error("Nom et numéro de compte obligatoires");
	const existing = await db.select({ id: paymentMethod.id }).from(paymentMethod).where(eq(paymentMethod.userId, user.id));
	const shouldBeDefault = existing.length === 0 || Boolean(data.isDefault);
	if (shouldBeDefault && existing.length > 0) await db.update(paymentMethod).set({ isDefault: false }).where(eq(paymentMethod.userId, user.id));
	const [created] = await db.insert(paymentMethod).values({
		id: crypto.randomUUID(),
		userId: user.id,
		type: data.type || "mobile_money",
		provider: data.provider || "mtn",
		name: data.name.trim(),
		accountNumber: data.accountNumber.trim(),
		isDefault: shouldBeDefault
	}).returning();
	return created;
});
var updatePaymentMethod_createServerFn_handler = createServerRpc({
	id: "0f01b10d06cd0d8d605a0a4a413fdb145217be40b891ef0a45488da35e4efdb8",
	name: "updatePaymentMethod",
	filename: "src/lib/payment-methods.functions.ts"
}, (opts) => updatePaymentMethod.__executeServer(opts));
var updatePaymentMethod = createServerFn({ method: "POST" }).validator((data) => data).handler(updatePaymentMethod_createServerFn_handler, async ({ data }) => {
	const user = await getAuthenticatedUser();
	if (data.isDefault) await db.update(paymentMethod).set({ isDefault: false }).where(eq(paymentMethod.userId, user.id));
	const [updated] = await db.update(paymentMethod).set({
		name: data.name.trim(),
		accountNumber: data.accountNumber.trim(),
		provider: data.provider,
		type: data.type,
		...data.isDefault !== void 0 ? { isDefault: Boolean(data.isDefault) } : {},
		updatedAt: /* @__PURE__ */ new Date()
	}).where(and(eq(paymentMethod.id, data.id), eq(paymentMethod.userId, user.id))).returning();
	return updated;
});
var deletePaymentMethod_createServerFn_handler = createServerRpc({
	id: "55fc0484b9941926147081b475de8d7569a7391edff13c9e7550b50cc47da0d3",
	name: "deletePaymentMethod",
	filename: "src/lib/payment-methods.functions.ts"
}, (opts) => deletePaymentMethod.__executeServer(opts));
var deletePaymentMethod = createServerFn({ method: "POST" }).validator((data) => data).handler(deletePaymentMethod_createServerFn_handler, async ({ data }) => {
	const user = await getAuthenticatedUser();
	const [target] = await db.select().from(paymentMethod).where(and(eq(paymentMethod.id, data.id), eq(paymentMethod.userId, user.id)));
	if (!target) throw new Error("Moyen de paiement introuvable");
	await db.delete(paymentMethod).where(and(eq(paymentMethod.id, data.id), eq(paymentMethod.userId, user.id)));
	if (target.isDefault) {
		const [next] = await db.select().from(paymentMethod).where(eq(paymentMethod.userId, user.id)).orderBy(desc(paymentMethod.createdAt)).limit(1);
		if (next) await db.update(paymentMethod).set({ isDefault: true }).where(eq(paymentMethod.id, next.id));
	}
	return { success: true };
});
var setDefaultPaymentMethod_createServerFn_handler = createServerRpc({
	id: "acf5cc2d5f5e9e0ae23b4e99a879145db74c7cf7d824c122bb5233c78bfd3f43",
	name: "setDefaultPaymentMethod",
	filename: "src/lib/payment-methods.functions.ts"
}, (opts) => setDefaultPaymentMethod.__executeServer(opts));
var setDefaultPaymentMethod = createServerFn({ method: "POST" }).validator((data) => data).handler(setDefaultPaymentMethod_createServerFn_handler, async ({ data }) => {
	const user = await getAuthenticatedUser();
	await db.update(paymentMethod).set({ isDefault: false }).where(eq(paymentMethod.userId, user.id));
	const [updated] = await db.update(paymentMethod).set({
		isDefault: true,
		updatedAt: /* @__PURE__ */ new Date()
	}).where(and(eq(paymentMethod.id, data.id), eq(paymentMethod.userId, user.id))).returning();
	return updated;
});
//#endregion
export { createPaymentMethod_createServerFn_handler, deletePaymentMethod_createServerFn_handler, getPaymentMethods_createServerFn_handler, setDefaultPaymentMethod_createServerFn_handler, updatePaymentMethod_createServerFn_handler };
