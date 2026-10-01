import { __toESM } from "../_runtime.mjs";
import { Link, require_jsx_runtime, require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { ArrowLeft, ArrowRight, Check, CircleCheck, Clock, LockKeyhole, Phone, RotateCcw, Send, ShieldCheck, User } from "../_libs/lucide-react.mjs";
import { DashboardLayout, useSession } from "./router-5dHOOvT4.mjs";
import { demoContacts } from "./dashboard-data-DeK0PiCk.mjs";
import { getPaymentMethods } from "./payment-methods.functions-DUXQapJB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/send-D3neurUf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var QUICK_AMOUNTS = [
	5e3,
	1e4,
	25e3,
	5e4,
	1e5
];
function formatNumber(num) {
	return new Intl.NumberFormat("fr-FR").format(num);
}
function SendPage() {
	const { data: session } = useSession();
	const userPhone = (session?.user)?.phone || "+242 06 123 45 67";
	const defaultMethods = [
		{
			id: "mtn",
			name: "MTN Mobile Money",
			detail: userPhone,
			badge: "MTN",
			badgeClass: "bg-[#ffcc00] text-black"
		},
		{
			id: "airtel",
			name: "Airtel Money",
			detail: userPhone,
			badge: "Airtel",
			badgeClass: "bg-[#ed1c24] text-white"
		},
		{
			id: "card",
			name: "Carte Bancaire",
			detail: "•••• 4242 (Visa)",
			badge: "VISA",
			badgeClass: "bg-[#172b85] text-white"
		}
	];
	const [dbMethods, setDbMethods] = (0, import_react.useState)([]);
	const [selectedMethodId, setSelectedMethodId] = (0, import_react.useState)(defaultMethods[0].id);
	(0, import_react.useEffect)(() => {
		getPaymentMethods().then((data) => {
			if (data && data.length > 0) {
				const mapped = data.map((m) => {
					const pId = m.provider.toLowerCase();
					const isMtn = pId.includes("mtn");
					const isAirtel = pId.includes("airtel");
					const isVisa = pId.includes("visa");
					const isMc = pId.includes("mastercard") || pId.includes("mc");
					return {
						id: m.id,
						name: m.name,
						detail: m.accountNumber,
						badge: isMtn ? "MTN" : isAirtel ? "Airtel" : isVisa ? "VISA" : isMc ? "MC" : m.provider.slice(0, 4).toUpperCase(),
						badgeClass: isMtn ? "bg-[#ffcc00] text-black" : isAirtel ? "bg-[#ed1c24] text-white" : isVisa ? "bg-[#172b85] text-white" : isMc ? "bg-[#eb001b] text-white" : "bg-primary/20 text-primary"
					};
				});
				setDbMethods(mapped);
				const def = data.find((d) => d.isDefault) || data[0];
				setSelectedMethodId(def.id);
			}
		}).catch(() => {});
	}, []);
	const paymentMethods = dbMethods.length > 0 ? dbMethods : defaultMethods;
	const [recipientType, setRecipientType] = (0, import_react.useState)("contact");
	const [selectedContactPhone, setSelectedContactPhone] = (0, import_react.useState)(demoContacts[0]?.phone ?? "");
	const [customName, setCustomName] = (0, import_react.useState)("");
	const [customPhone, setCustomPhone] = (0, import_react.useState)("");
	const [amountStr, setAmountStr] = (0, import_react.useState)("10000");
	const [note, setNote] = (0, import_react.useState)("");
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [sentSuccessData, setSentSuccessData] = (0, import_react.useState)(null);
	const activeContact = demoContacts.find((c) => c.phone === selectedContactPhone);
	const recipientName = recipientType === "contact" ? activeContact?.name || "Destinataire" : customName.trim() || "Destinataire direct";
	const recipientPhone = recipientType === "contact" ? activeContact?.phone || "" : customPhone.trim();
	const currentMethod = paymentMethods.find((m) => m.id === selectedMethodId) || paymentMethods[0];
	const rawAmount = parseInt(amountStr.replace(/\D/g, "") || "0", 10);
	const fee = rawAmount > 0 ? Math.max(200, Math.round(rawAmount * .02)) : 0;
	const totalAmount = rawAmount + fee;
	const handleAmountChange = (val) => {
		const cleaned = val.replace(/\D/g, "");
		setAmountStr(cleaned);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (rawAmount < 500) return;
		setIsSubmitting(true);
		setTimeout(() => {
			setIsSubmitting(false);
			const now = new Intl.DateTimeFormat("fr-FR", {
				dateStyle: "medium",
				timeStyle: "short"
			}).format(/* @__PURE__ */ new Date());
			setSentSuccessData({
				txId: `NP-${Math.floor(1e5 + Math.random() * 9e5)}`,
				recipientName,
				recipientPhone: recipientPhone || "Non spécifié",
				amount: rawAmount,
				fee,
				total: totalAmount,
				methodName: currentMethod.name,
				date: now
			});
		}, 600);
	};
	const resetForm = () => {
		setSentSuccessData(null);
		setAmountStr("10000");
		setNote("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardLayout, {
		title: "Envoyer de l’argent",
		eyebrow: "Passerelle instantanée · Transfert direct",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl space-y-6 pb-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/dashboard",
					className: "btn btn-ghost btn-sm gap-2 rounded-full px-3 text-base-content/70 hover:text-base-content",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Retour au tableau de bord" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden items-center gap-2 text-xs font-bold text-base-content/50 sm:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Passerelle directe sécurisée" })]
				})]
			}), sentSuccessData ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-2xl overflow-hidden rounded-[2.5rem] border border-primary/20 bg-base-100 p-6 shadow-2xl sm:p-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto mb-5 flex size-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 ring-8 ring-emerald-500/5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-10 stroke-[2.5]" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "badge badge-success badge-sm gap-1.5 font-bold uppercase tracking-wider text-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), " Transfert initié avec succès"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl",
								children: [formatNumber(sentSuccessData.amount), " XAF"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-base-content/65",
								children: [
									"Acheminement direct vers",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-base-content",
										children: sentSuccessData.recipientName
									}),
									sentSuccessData.recipientPhone && ` (${sentSuccessData.recipientPhone})`
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 rounded-3xl border border-base-200 bg-base-200/40 p-6 text-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-base-content/60",
										children: "Référence transaction"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono font-bold",
										children: sentSuccessData.txId
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-base-content/60",
										children: "Date et heure"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: sentSuccessData.date
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-base-content/60",
										children: "Moyen de débit (Source)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold",
										children: sentSuccessData.methodName
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-base-content/60",
										children: "Mode de transfert"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "badge badge-outline badge-primary font-bold",
										children: "Passerelle directe"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider my-2" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-base-content/60",
										children: "Montant net transféré"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold",
										children: [formatNumber(sentSuccessData.amount), " XAF"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-base-content/60",
										children: "Frais de passerelle NexPay"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-base-content",
										children: [formatNumber(sentSuccessData.fee), " XAF"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-base font-extrabold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total débité" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-primary",
										children: [formatNumber(sentSuccessData.total), " XAF"]
									})]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex items-start gap-3 rounded-2xl bg-primary/5 p-4 text-xs text-base-content/75",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "mt-0.5 size-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Les fonds transitent directement d’opérateur à opérateur en temps réel. Le destinataire reçoit une notification SMS instantanée dès la validation par son opérateur." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: resetForm,
							className: "btn btn-outline flex-1 rounded-2xl gap-2 font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Nouveau transfert"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/dashboard/transactions",
							className: "btn btn-primary flex-1 rounded-2xl gap-2 font-bold shadow-lg shadow-primary/25",
							children: ["Voir les transactions", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-[1.25fr_0.95fr] lg:items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6 rounded-[2.5rem] border border-base-200/80 bg-base-100 p-6 shadow-xl shadow-base-content/5 sm:p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-b border-base-200 pb-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-6" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-bold tracking-tight",
								children: "Nouveau transfert"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-base-content/55 sm:text-sm",
								children: "Envoyez des fonds directement sans rechargement de solde préalable."
							})] })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-extrabold uppercase tracking-wider text-base-content/70",
										children: "1. Destinataire"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-1 rounded-xl bg-base-200 p-1 text-xs font-bold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setRecipientType("contact"),
											className: `rounded-lg px-2.5 py-1 transition ${recipientType === "contact" ? "bg-base-100 text-primary shadow-sm" : "text-base-content/60 hover:text-base-content"}`,
											children: "Contacts"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setRecipientType("custom"),
											className: `rounded-lg px-2.5 py-1 transition ${recipientType === "custom" ? "bg-base-100 text-primary shadow-sm" : "text-base-content/60 hover:text-base-content"}`,
											children: "Nouveau numéro"
										})]
									})]
								}), recipientType === "contact" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
										children: demoContacts.map((contact) => {
											const isSelected = selectedContactPhone === contact.phone;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setSelectedContactPhone(contact.phone),
												className: `flex flex-col items-center rounded-2xl border p-3 text-center transition ${isSelected ? "border-primary bg-primary/10 shadow-sm ring-2 ring-primary/20" : "border-base-200 bg-base-100 hover:border-base-300 hover:bg-base-200/50"}`,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: `flex size-10 items-center justify-center rounded-xl text-xs font-extrabold ${contact.color}`,
														children: contact.initials
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "mt-2 w-full truncate text-xs font-bold text-base-content",
														children: contact.name.split(" ")[0]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "w-full truncate text-[10px] text-base-content/50",
														children: contact.phone.slice(-4)
													})
												]
											}, contact.phone);
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										"aria-label": "Sélectionner un contact",
										value: selectedContactPhone,
										onChange: (e) => setSelectedContactPhone(e.target.value),
										className: "select select-bordered w-full rounded-2xl text-sm font-medium",
										children: demoContacts.map((contact) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: contact.phone,
											children: [
												contact.name,
												" (",
												contact.phone,
												")"
											]
										}, contact.phone))
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "mb-1.5 block text-xs font-semibold text-base-content/60",
										children: "Nom du bénéficiaire"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-base-content/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "ex: Jean Dupont",
											value: customName,
											onChange: (e) => setCustomName(e.target.value),
											className: "input input-bordered w-full rounded-2xl pl-10 text-sm font-medium"
										})]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "mb-1.5 block text-xs font-semibold text-base-content/60",
										children: "Numéro de téléphone"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-base-content/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "tel",
											placeholder: "+242 06 000 00 00",
											value: customPhone,
											onChange: (e) => setCustomPhone(e.target.value),
											className: "input input-bordered w-full rounded-2xl pl-10 text-sm font-medium"
										})]
									})] })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-extrabold uppercase tracking-wider text-base-content/70",
											children: "2. Montant à envoyer"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold text-base-content/50",
											children: "Min: 500 XAF"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											inputMode: "numeric",
											value: formatNumber(rawAmount),
											onChange: (e) => handleAmountChange(e.target.value),
											className: "input input-bordered h-16 w-full rounded-2xl pr-20 text-3xl font-extrabold tracking-tight",
											placeholder: "0"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-base-200 px-3 py-1.5 text-xs font-extrabold text-base-content/80",
											children: "XAF"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-2 pt-1",
										children: QUICK_AMOUNTS.map((amt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setAmountStr(amt.toString()),
											className: `rounded-xl px-3 py-1.5 text-xs font-bold transition ${rawAmount === amt ? "bg-primary text-primary-content shadow-sm" : "border border-base-200 bg-base-200/50 hover:bg-base-200 text-base-content/75"}`,
											children: ["+", formatNumber(amt)]
										}, amt))
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-extrabold uppercase tracking-wider text-base-content/70",
										children: "3. Moyen de paiement (Source débitée)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/dashboard/payment-methods",
										className: "text-xs font-bold text-primary hover:underline",
										children: "+ Gérer mes moyens"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-2.5",
									children: paymentMethods.map((method) => {
										const isSelected = selectedMethodId === method.id;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: `flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition ${isSelected ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-base-200 bg-base-100 hover:border-base-300 hover:bg-base-200/40"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `flex size-10 shrink-0 items-center justify-center rounded-xl text-xs font-black uppercase ${method.badgeClass}`,
													children: method.badge
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-bold text-sm text-base-content",
													children: method.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-base-content/50",
													children: method.detail
												})] })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "radio",
												name: "paymentMethod",
												checked: isSelected,
												onChange: () => setSelectedMethodId(method.id),
												className: "radio radio-primary radio-sm"
											})]
										}, method.id);
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1.5 block text-xs font-semibold text-base-content/60",
								children: "Motif ou message (optionnel)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "ex: Cadeau, loyer, courses...",
								value: note,
								onChange: (e) => setNote(e.target.value),
								className: "input input-bordered w-full rounded-2xl text-sm"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: rawAmount < 500 || isSubmitting,
									className: "btn btn-primary h-14 w-full rounded-2xl text-base font-bold shadow-xl shadow-primary/25 transition disabled:opacity-50",
									children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "loading loading-spinner" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										"Confirmer et envoyer ",
										rawAmount > 0 ? `${formatNumber(totalAmount)} XAF` : "",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-5" })
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3.5 flex items-center justify-center gap-2 text-xs font-medium text-base-content/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "size-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sécurisé de bout en bout · Validation par PIN opérateur" })]
								})]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[2.5rem] border border-base-200/80 bg-base-100 p-6 shadow-xl shadow-base-content/5 sm:p-7",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-5 flex items-center justify-between border-b border-base-200 pb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display font-bold text-lg text-base-content",
									children: "Récapitulatif en direct"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "badge badge-primary badge-sm font-bold",
									children: "Instantané"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-base-content/60",
											children: "Destinataire"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-right text-base-content truncate max-w-[180px]",
											children: recipientName
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-base-content/60",
											children: "Moyen débité"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-bold text-base-content",
											children: [
												currentMethod.name.split(" ")[0],
												" (",
												currentMethod.badge,
												")"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "divider my-1" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-base-content/60",
											children: "Montant envoyé"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-bold text-base-content",
											children: [formatNumber(rawAmount), " XAF"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1 text-base-content/60",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Frais de passerelle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "badge badge-ghost badge-xs",
												children: "NexPay"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-bold text-base-content",
											children: [formatNumber(fee), " XAF"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between rounded-2xl bg-base-200/60 p-3.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold text-base-content/70 block",
											children: "Total à débiter"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[11px] text-base-content/50",
											children: ["Débité sur votre compte ", currentMethod.badge]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-display text-xl font-extrabold text-primary",
											children: [formatNumber(totalAmount), " XAF"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-xs text-emerald-600 font-semibold px-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Montant net reçu par le bénéficiaire" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [formatNumber(rawAmount), " XAF"] })]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-[2rem] border border-primary/20 bg-primary/5 p-6 text-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-base-content",
										children: "Passerelle directe sans rétention de fonds"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs leading-relaxed text-base-content/70",
										children: "NexPay n’est pas un compte de dépôt ou une banque. Nous connectons directement vos comptes opérateurs (MTN MoMo, Airtel, etc.) pour réaliser le pont sans stocker votre argent."
									})]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[2rem] border border-base-200 bg-base-100 p-5 text-xs text-base-content/60 space-y-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Zéro frais cachés, taux et montants transparents" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Validation sécurisée par invite USSD / SMS sur votre mobile" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Traçabilité immédiate dans votre historique" })]
								})
							]
						})
					]
				})]
			})]
		})
	});
}
//#endregion
export { SendPage as component };
