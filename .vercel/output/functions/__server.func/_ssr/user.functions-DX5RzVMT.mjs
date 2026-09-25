import { createServerFn, getRequestHeaders } from "./ssr2.mjs";
import { auth, db, user } from "./auth-CgLSap3w.mjs";
import { eq } from "../_libs/drizzle-orm.mjs";
import { createServerRpc } from "./createServerRpc-NKXqGQmx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/user.functions-DX5RzVMT.js
async function getAuthenticatedUser() {
	const session = await auth.api.getSession({ headers: getRequestHeaders() });
	if (!session?.user) throw new Error("Utilisateur non authentifié");
	return session.user;
}
var getUserProfile_createServerFn_handler = createServerRpc({
	id: "af5d3ae08facf078bb6074fd53165549a73a36a7ac99d524928721375dc224d4",
	name: "getUserProfile",
	filename: "src/lib/user.functions.ts"
}, (opts) => getUserProfile.__executeServer(opts));
var getUserProfile = createServerFn({ method: "GET" }).handler(getUserProfile_createServerFn_handler, async () => {
	const authUser = await getAuthenticatedUser();
	const [profile] = await db.select().from(user).where(eq(user.id, authUser.id));
	if (!profile) throw new Error("Profil utilisateur introuvable");
	return profile;
});
var updateUserProfile_createServerFn_handler = createServerRpc({
	id: "e6b4c2156f69930488e9d0032986979bdb013fe3adabe0de1ac32537913ec766",
	name: "updateUserProfile",
	filename: "src/lib/user.functions.ts"
}, (opts) => updateUserProfile.__executeServer(opts));
var updateUserProfile = createServerFn({ method: "POST" }).validator((data) => data).handler(updateUserProfile_createServerFn_handler, async ({ data }) => {
	const authUser = await getAuthenticatedUser();
	if (!data.firstName?.trim() || !data.lastName?.trim()) throw new Error("Le prénom et le nom sont obligatoires");
	if (!data.phone?.trim()) throw new Error("Le numéro de téléphone est obligatoire");
	const fullName = `${data.firstName.trim()} ${data.lastName.trim()}`.trim();
	if (data.phone.trim() !== authUser.phone) {
		const existingPhone = await db.select({ id: user.id }).from(user).where(eq(user.phone, data.phone.trim()));
		if (existingPhone.length > 0 && existingPhone[0].id !== authUser.id) throw new Error("Ce numéro de téléphone est déjà associé à un autre compte");
	}
	const [updated] = await db.update(user).set({
		firstName: data.firstName.trim(),
		lastName: data.lastName.trim(),
		name: fullName,
		phone: data.phone.trim(),
		birthDate: data.birthDate?.trim() || "",
		countryCode: data.countryCode?.trim() || "CG",
		currency: data.currency?.trim() || "XAF",
		...data.email?.trim() ? { email: data.email.trim() } : {},
		updatedAt: /* @__PURE__ */ new Date()
	}).where(eq(user.id, authUser.id)).returning();
	return updated;
});
//#endregion
export { getUserProfile_createServerFn_handler, updateUserProfile_createServerFn_handler };
