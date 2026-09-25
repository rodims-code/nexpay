import { Link, require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { ArrowUpRight, ChevronRight, Plus, Send, ShieldCheck, TrendingUp, WalletCards } from "../_libs/lucide-react.mjs";
import { DashboardLayout, SectionTitle, useSession } from "./router-5dHOOvT4.mjs";
import { demoTransactions } from "./dashboard-data-DeK0PiCk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-DQN4Wn4o.js
var import_jsx_runtime = require_jsx_runtime();
function DashboardPage() {
	const { data: session } = useSession();
	const userName = (session?.user)?.firstName || session?.user?.name?.split(" ")[0] || "";
	const greetingTitle = userName ? `Bonjour, ${userName}` : "Bienvenue sur NexPay";
	const today = /* @__PURE__ */ new Date();
	const rawDate = new Intl.DateTimeFormat("fr-FR", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}).format(today);
	const formattedDate = rawDate.charAt(0).toUpperCase() + rawDate.slice(1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardLayout, {
		title: greetingTitle,
		eyebrow: formattedDate,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid gap-4 xl:grid-cols-[1.45fr_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden rounded-[2rem] bg-primary p-6 text-primary-content shadow-xl shadow-primary/20 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative z-10 flex h-full flex-col justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-3 flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-extrabold uppercase tracking-wider opacity-80",
											children: "Solde de stockage"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold backdrop-blur-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-emerald-400 animate-pulse" }), "Passerelle directe"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-baseline gap-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-3xl font-extrabold sm:text-4xl",
											children: "Non disponible"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2.5 text-xs font-medium leading-relaxed text-primary-content/85 sm:text-sm",
										children: "NexPay opère comme une passerelle directe sans rétention de fonds. Vos transferts transitent instantanément d’un compte à un autre sans stockage intermédiaire."
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 flex items-center gap-2 text-xs font-bold opacity-90",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Zéro rétention de dépôts · Pont sécurisé en direct" })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-8 -top-12 size-48 rounded-full border-[24px] border-white/10" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-20 right-20 size-56 rounded-full border-[32px] border-white/10" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-between rounded-[2rem] border border-base-200 bg-base-200/50 p-6 sm:p-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-bold text-base-content/55",
								children: "Votre prochaine action"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 font-display text-2xl font-bold",
								children: "Envoyer de l’argent"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-sm text-sm leading-relaxed text-base-content/55",
								children: "Transférez de l’argent à vos proches en quelques secondes."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/dashboard/send",
							className: "btn btn-secondary mt-6 w-full rounded-2xl sm:w-fit",
							children: ["Commencer un envoi ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "stat rounded-3xl border border-base-200 bg-base-100 p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "stat-figure text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "stat-title text-xs font-bold",
									children: "Envoyé ce mois"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "stat-value font-display text-2xl",
									children: ["85 500 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
										className: "text-xs",
										children: "XAF"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "stat-desc",
									children: "12 transactions"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "stat rounded-3xl border border-base-200 bg-base-100 p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "stat-figure text-secondary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletCards, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "stat-title text-xs font-bold",
									children: "Reçu ce mois"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "stat-value font-display text-2xl",
									children: ["40 000 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
										className: "text-xs",
										children: "XAF"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "stat-desc",
									children: "3 transactions"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "stat rounded-3xl border border-base-200 bg-base-100 p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "stat-figure text-accent",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "stat-title text-xs font-bold",
									children: "Taux de réussite"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "stat-value font-display text-2xl",
									children: "98,4%"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "stat-desc",
									children: "Sur vos transferts"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/dashboard/transactions",
						className: "btn btn-ghost btn-sm rounded-full text-primary",
						children: ["Voir tout ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
					}),
					children: "Transactions récentes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-[1.75rem] border border-base-200 bg-base-100",
					children: demoTransactions.slice(0, 3).map((transaction) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 border-b border-base-200 p-4 last:border-0 sm:p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `flex size-10 shrink-0 items-center justify-center rounded-2xl text-xs font-extrabold ${transaction.tone}`,
								children: transaction.initials
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-bold",
									children: transaction.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-base-content/45",
									children: transaction.date
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-extrabold",
									children: transaction.amount
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-[10px] font-extrabold uppercase ${transaction.tone.split(" ")[1]}`,
									children: transaction.status
								})]
							})
						]
					}, transaction.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/dashboard/send",
						className: "btn btn-primary rounded-2xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Nouvel envoi"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/dashboard/payment-methods",
						className: "btn btn-outline rounded-2xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletCards, { className: "size-4" }), " Ajouter un moyen"]
					})]
				})
			]
		})
	});
}
//#endregion
export { DashboardPage as component };
