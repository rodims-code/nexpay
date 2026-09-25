import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { Check, CircleAlert, CircleCheck, CreditCard, LoaderCircle, Pen, Plus, ShieldCheck, Star, Trash2, X } from "../_libs/lucide-react.mjs";
import { DashboardLayout, useSession } from "./router-5dHOOvT4.mjs";
import { createPaymentMethod, deletePaymentMethod, getPaymentMethods, setDefaultPaymentMethod, updatePaymentMethod } from "./payment-methods.functions-DUXQapJB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/payment-methods-BRf_c0Y2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PROVIDERS = [
	{
		id: "mtn",
		name: "MTN Mobile Money",
		type: "mobile_money",
		badge: "MTN",
		badgeClass: "bg-[#ffcc00] text-black font-extrabold"
	},
	{
		id: "airtel",
		name: "Airtel Money",
		type: "mobile_money",
		badge: "airtel",
		badgeClass: "bg-[#ed1c24] text-white font-extrabold"
	},
	{
		id: "visa",
		name: "Carte Visa",
		type: "card",
		badge: "VISA",
		badgeClass: "bg-[#172b85] text-white font-extrabold"
	},
	{
		id: "mastercard",
		name: "Mastercard",
		type: "card",
		badge: "MC",
		badgeClass: "bg-[#eb001b] text-white font-extrabold"
	},
	{
		id: "other",
		name: "Autre compte bancaire",
		type: "bank",
		badge: "BANQUE",
		badgeClass: "bg-base-300 text-base-content font-bold"
	}
];
function getProviderStyle(provider) {
	const found = PROVIDERS.find((p) => p.id === provider.toLowerCase());
	if (found) return found;
	return {
		id: provider,
		name: provider,
		type: "mobile_money",
		badge: provider.slice(0, 4).toUpperCase(),
		badgeClass: "bg-primary/20 text-primary font-bold"
	};
}
function PaymentMethodsPage() {
	const { data: session } = useSession();
	const userPhone = (session?.user)?.phone || "";
	const [methods, setMethods] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [errorMsg, setErrorMsg] = (0, import_react.useState)(null);
	const [successMsg, setSuccessMsg] = (0, import_react.useState)(null);
	const [isAddOpen, setIsAddOpen] = (0, import_react.useState)(false);
	const [editingMethod, setEditingMethod] = (0, import_react.useState)(null);
	const [deletingId, setDeletingId] = (0, import_react.useState)(null);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [addProvider, setAddProvider] = (0, import_react.useState)("mtn");
	const [addName, setAddName] = (0, import_react.useState)("MTN Mobile Money");
	const [addAccountNumber, setAddAccountNumber] = (0, import_react.useState)(userPhone);
	const [addIsDefault, setAddIsDefault] = (0, import_react.useState)(false);
	const [editProvider, setEditProvider] = (0, import_react.useState)("mtn");
	const [editName, setEditName] = (0, import_react.useState)("");
	const [editAccountNumber, setEditAccountNumber] = (0, import_react.useState)("");
	const [editIsDefault, setEditIsDefault] = (0, import_react.useState)(false);
	const showNotification = (success, error) => {
		if (success) {
			setSuccessMsg(success);
			setTimeout(() => setSuccessMsg(null), 4e3);
		}
		if (error) {
			setErrorMsg(error);
			setTimeout(() => setErrorMsg(null), 5e3);
		}
	};
	const loadMethods = async () => {
		try {
			setLoading(true);
			const data = await getPaymentMethods();
			setMethods(data);
		} catch (err) {
			console.error(err);
			setErrorMsg(err.message || "Erreur lors du chargement des moyens de paiement");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadMethods();
	}, []);
	const handleProviderSelect = (provId, isEdit = false) => {
		const p = PROVIDERS.find((item) => item.id === provId);
		if (!p) return;
		if (isEdit) {
			setEditProvider(p.id);
			if (!editName || PROVIDERS.some((item) => item.name === editName)) setEditName(p.name);
		} else {
			setAddProvider(p.id);
			setAddName(p.name);
			if (p.type === "mobile_money" && userPhone && !addAccountNumber) setAddAccountNumber(userPhone);
		}
	};
	const handleCreate = async (e) => {
		e.preventDefault();
		if (!addName.trim() || !addAccountNumber.trim()) {
			showNotification(void 0, "Veuillez remplir tous les champs obligatoires");
			return;
		}
		try {
			setSubmitting(true);
			const prov = getProviderStyle(addProvider);
			await createPaymentMethod({ data: {
				type: prov.type,
				provider: prov.id,
				name: addName.trim(),
				accountNumber: addAccountNumber.trim(),
				isDefault: addIsDefault
			} });
			showNotification("Moyen de paiement ajouté avec succès !");
			setIsAddOpen(false);
			setAddAccountNumber(userPhone);
			setAddIsDefault(false);
			await loadMethods();
		} catch (err) {
			showNotification(void 0, err.message || "Impossible d’ajouter ce moyen de paiement");
		} finally {
			setSubmitting(false);
		}
	};
	const openEditModal = (method) => {
		setEditingMethod(method);
		setEditProvider(method.provider);
		setEditName(method.name);
		setEditAccountNumber(method.accountNumber);
		setEditIsDefault(method.isDefault);
	};
	const handleUpdate = async (e) => {
		e.preventDefault();
		if (!editingMethod) return;
		if (!editName.trim() || !editAccountNumber.trim()) {
			showNotification(void 0, "Veuillez remplir tous les champs obligatoires");
			return;
		}
		try {
			setSubmitting(true);
			const prov = getProviderStyle(editProvider);
			await updatePaymentMethod({ data: {
				id: editingMethod.id,
				type: prov.type,
				provider: prov.id,
				name: editName.trim(),
				accountNumber: editAccountNumber.trim(),
				isDefault: editIsDefault
			} });
			showNotification("Moyen de paiement modifié avec succès !");
			setEditingMethod(null);
			await loadMethods();
		} catch (err) {
			showNotification(void 0, err.message || "Erreur lors de la mise à jour");
		} finally {
			setSubmitting(false);
		}
	};
	const handleDelete = async (id) => {
		try {
			setSubmitting(true);
			await deletePaymentMethod({ data: { id } });
			showNotification("Moyen de paiement supprimé avec succès !");
			setDeletingId(null);
			await loadMethods();
		} catch (err) {
			showNotification(void 0, err.message || "Erreur lors de la suppression");
		} finally {
			setSubmitting(false);
		}
	};
	const handleSetDefault = async (id) => {
		try {
			await setDefaultPaymentMethod({ data: { id } });
			showNotification("Défini comme moyen de paiement principal");
			await loadMethods();
		} catch (err) {
			showNotification(void 0, err.message || "Erreur lors du changement de moyen principal");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardLayout, {
		title: "Moyens de paiement",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl space-y-6 pb-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-between gap-4 sm:flex-row sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-bold tracking-tight text-base-content sm:text-2xl",
						children: "Vos comptes & cartes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-base-content/60 sm:text-sm",
						children: "Enregistrez vos comptes MTN MoMo, Airtel ou cartes pour vos envois directs."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setIsAddOpen(true),
						className: "btn btn-primary rounded-2xl gap-2 font-bold shadow-lg shadow-primary/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Ajouter un moyen"]
					})]
				}),
				successMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "alert alert-success rounded-2xl text-sm font-semibold text-white shadow-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: successMsg })]
				}),
				errorMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "alert alert-error rounded-2xl text-sm font-semibold text-white shadow-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: errorMsg })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3.5",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: [1, 2].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex h-24 animate-pulse items-center gap-4 rounded-3xl border border-base-200 bg-base-100 p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-12 rounded-2xl bg-base-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-1/3 rounded bg-base-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-1/2 rounded bg-base-200" })]
							})]
						}, i))
					}) : methods.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[2.5rem] border border-dashed border-base-300 bg-base-100/50 p-10 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto mb-4 flex size-16 items-center justify-center rounded-3xl bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-8" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-bold",
								children: "Aucun moyen de paiement enregistré"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-2 max-w-md text-xs leading-relaxed text-base-content/60 sm:text-sm",
								children: "Ajoutez dès maintenant votre numéro MTN Mobile Money, Airtel Money ou votre carte bancaire pour initier des transferts instantanés."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setIsAddOpen(true),
								className: "btn btn-primary mt-6 rounded-2xl gap-2 font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Ajouter mon premier compte"]
							})
						]
					}) : methods.map((method) => {
						const prov = getProviderStyle(method.provider);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex flex-col gap-4 rounded-[2rem] border bg-base-100 p-5 shadow-sm transition sm:flex-row sm:items-center sm:justify-between ${method.isDefault ? "border-primary/40 shadow-primary/5 ring-1 ring-primary/20" : "border-base-200 hover:border-base-300"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `flex size-14 shrink-0 items-center justify-center rounded-2xl text-xs uppercase shadow-sm ${prov.badgeClass}`,
									children: prov.badge
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate font-bold text-base text-base-content",
											children: method.name
										}), method.isDefault && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "badge badge-primary badge-sm gap-1 rounded-full font-bold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }), " Principal"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-xs text-base-content/60 font-medium",
										children: method.accountNumber
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 self-end sm:self-center",
								children: [
									!method.isDefault && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => handleSetDefault(method.id),
										className: "btn btn-ghost btn-sm rounded-xl gap-1 text-xs font-semibold text-base-content/70 hover:text-primary",
										title: "Définir comme moyen principal",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "hidden sm:inline",
											children: "Par défaut"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => openEditModal(method),
										className: "btn btn-ghost btn-square btn-sm rounded-xl text-base-content/60 hover:text-base-content",
										title: "Modifier",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "size-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setDeletingId(method.id),
										className: "btn btn-ghost btn-square btn-sm rounded-xl text-error/70 hover:bg-error/10 hover:text-error",
										title: "Supprimer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
									})
								]
							})]
						}, method.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "alert rounded-3xl border-primary/20 bg-primary/5 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs leading-relaxed text-base-content/75 sm:text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-base-content block mb-0.5",
							children: "Passerelle directe sans rétention"
						}), "Vos données de paiement servent uniquement de lien direct vers votre opérateur lors de vos transferts. NexPay n’héberge aucun fonds."]
					})]
				}),
				isAddOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full max-w-md rounded-[2.5rem] border border-base-200 bg-base-100 p-6 shadow-2xl sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIsAddOpen(false),
								className: "btn btn-ghost btn-sm btn-square absolute right-5 top-5 rounded-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl font-bold text-base-content",
									children: "Nouveau moyen de paiement"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-base-content/60 mt-1",
									children: "Connectez votre compte mobile money ou carte pour vos transferts."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleCreate,
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70",
										children: "Opérateur / Type"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-2 gap-2",
										children: PROVIDERS.slice(0, 4).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => handleProviderSelect(p.id),
											className: `flex items-center gap-2.5 rounded-2xl border p-2.5 text-left text-xs font-bold transition ${addProvider === p.id ? "border-primary bg-primary/10 ring-2 ring-primary/20" : "border-base-200 hover:bg-base-200/50"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `flex size-7 shrink-0 items-center justify-center rounded-lg text-[10px] ${p.badgeClass}`,
												children: p.badge
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate",
												children: p.name.split(" ")[0]
											})]
										}, p.id))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70",
										children: "Nom du moyen (Libellé)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: addName,
										onChange: (e) => setAddName(e.target.value),
										placeholder: "ex: MTN Mobile Money Principal",
										required: true,
										className: "input input-bordered w-full rounded-2xl text-sm"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70",
										children: "Numéro de compte / téléphone / carte"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: addAccountNumber,
										onChange: (e) => setAddAccountNumber(e.target.value),
										placeholder: addProvider === "visa" || addProvider === "mastercard" ? "•••• 4242" : "+242 06 123 45 67",
										required: true,
										className: "input input-bordered w-full rounded-2xl text-sm font-medium"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex cursor-pointer items-center gap-3 pt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: addIsDefault,
											onChange: (e) => setAddIsDefault(e.target.checked),
											className: "checkbox checkbox-primary checkbox-sm rounded-lg"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold text-base-content/80",
											children: "Définir comme moyen de paiement principal"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2.5 pt-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setIsAddOpen(false),
											className: "btn btn-ghost flex-1 rounded-2xl",
											children: "Annuler"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											disabled: submitting,
											className: "btn btn-primary flex-1 rounded-2xl font-bold",
											children: submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : "Enregistrer"
										})]
									})
								]
							})
						]
					})
				}),
				editingMethod && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full max-w-md rounded-[2.5rem] border border-base-200 bg-base-100 p-6 shadow-2xl sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setEditingMethod(null),
								className: "btn btn-ghost btn-sm btn-square absolute right-5 top-5 rounded-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl font-bold text-base-content",
									children: "Modifier le moyen de paiement"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-base-content/60 mt-1",
									children: "Mettez à jour le nom ou le numéro de ce compte."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleUpdate,
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70",
										children: "Opérateur / Type"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-2 gap-2",
										children: PROVIDERS.slice(0, 4).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => handleProviderSelect(p.id, true),
											className: `flex items-center gap-2.5 rounded-2xl border p-2.5 text-left text-xs font-bold transition ${editProvider === p.id ? "border-primary bg-primary/10 ring-2 ring-primary/20" : "border-base-200 hover:bg-base-200/50"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `flex size-7 shrink-0 items-center justify-center rounded-lg text-[10px] ${p.badgeClass}`,
												children: p.badge
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate",
												children: p.name.split(" ")[0]
											})]
										}, p.id))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70",
										children: "Nom du moyen (Libellé)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: editName,
										onChange: (e) => setEditName(e.target.value),
										required: true,
										className: "input input-bordered w-full rounded-2xl text-sm"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70",
										children: "Numéro de compte / téléphone / carte"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: editAccountNumber,
										onChange: (e) => setEditAccountNumber(e.target.value),
										required: true,
										className: "input input-bordered w-full rounded-2xl text-sm font-medium"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex cursor-pointer items-center gap-3 pt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: editIsDefault,
											onChange: (e) => setEditIsDefault(e.target.checked),
											className: "checkbox checkbox-primary checkbox-sm rounded-lg"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold text-base-content/80",
											children: "Définir comme moyen de paiement principal"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2.5 pt-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setEditingMethod(null),
											className: "btn btn-ghost flex-1 rounded-2xl",
											children: "Annuler"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											disabled: submitting,
											className: "btn btn-primary flex-1 rounded-2xl font-bold",
											children: submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : "Enregistrer"
										})]
									})
								]
							})
						]
					})
				}),
				deletingId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full max-w-sm rounded-[2.5rem] border border-base-200 bg-base-100 p-6 text-center shadow-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-error/10 text-error",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-bold text-base-content",
								children: "Supprimer ce moyen de paiement ?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs leading-relaxed text-base-content/60",
								children: "Cette action retirera ce compte de vos options de paiement pour vos futurs transferts directs."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setDeletingId(null),
									className: "btn btn-ghost flex-1 rounded-2xl",
									children: "Annuler"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: submitting,
									onClick: () => handleDelete(deletingId),
									className: "btn btn-error flex-1 rounded-2xl font-bold text-white",
									children: submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : "Supprimer"
								})]
							})
						]
					})
				})
			]
		})
	});
}
//#endregion
export { PaymentMethodsPage as component };
