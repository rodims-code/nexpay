import "../_runtime.mjs";
import { Link, require_jsx_runtime, require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { ArrowLeft, ShieldCheck } from "../_libs/lucide-react.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function AuthLayout({ children, showBackButton = false, onBackClick, backButtonText = "Retour", heroEyebrow = "NexPay", heroTitle = "Accédez à votre argent sans friction", heroDescription = "Une expérience d'authentification moderne, claire et sécurisée pour vos comptes et vos transactions.", heroImageSrc = "/images/afro-friends-having-fun-together-while-drinking-fruit-juice.jpg", logoNexPaySrc = "/images/nexpay.png", logoNexPayAlt = "Logo de NexPay", iconNexpaySrc = "/images/nexpay-icon.png", iconNexpayAlt = "Icône de NexPay", heroImageAlt = "Illustration de la page d’authentification NexPay" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative min-h-dvh overflow-x-hidden bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.10),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.10),_transparent_28%),linear-gradient(180deg,_hsl(var(--b1))_0%,_hsl(var(--b2))_100%)] font-sans",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto flex min-h-dvh w-full items-start px-3 py-3 sm:px-5 sm:py-4 lg:items-center lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-h-[calc(100dvh-1.5rem)] w-full overflow-visible rounded-[2rem] border border-base-300/70 bg-base-100/90 shadow-[0_30px_90px_-45px_rgba(15,23,42,0.6)] backdrop-blur-xl sm:min-h-[calc(100dvh-2rem)] lg:grid-cols-[1.08fr_0.92fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative hidden min-h-0 overflow-hidden bg-neutral-950 lg:flex lg:flex-col",
					children: [
						heroImageSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: heroImageSrc,
							alt: heroImageAlt,
							className: "absolute inset-0 h-full w-full object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/50 via-neutral-900 to-secondary/50" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/80" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black/85 via-black/45 to-transparent backdrop-blur-[2px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_38%,black_100%)]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10 flex items-center justify-between gap-4 p-8 xl:p-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "flex items-center gap-3 text-white",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-16 w-auto items-center justify-center rounded-2xl overflow-visible shadow-xl",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: logoNexPaySrc,
										alt: logoNexPayAlt,
										className: "block h-100 w-auto max-w-[180px]  object-contain object-center"
									})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 rounded-full border border-white/25 bg-black/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sécurisé" })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10 mt-auto max-w-2xl space-y-4 p-8 text-white xl:p-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-bold uppercase tracking-[0.3em] text-white/70",
									children: heroEyebrow
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-4xl font-black leading-[0.98] tracking-tight sm:text-5xl xl:text-6xl",
									children: heroTitle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "max-w-xl text-sm leading-7  text-white/75 sm:text-base",
									children: heroDescription
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex min-h-full flex-col justify-between overflow-visible bg-base-100/95 p-5 sm:p-8 lg:p-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.08),_transparent_28%)] lg:hidden" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative z-10 flex items-center justify-between gap-3",
							children: showBackButton ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: onBackClick,
								className: "btn btn-ghost btn-sm gap-2 rounded-full border border-base-300/70 bg-base-100/70 font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), backButtonText]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 lg:hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: iconNexpaySrc,
											alt: iconNexpayAlt,
											className: "w-20 h-20"
										})
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-semibold uppercase tracking-[0.3em] text-base-content/55",
									children: "NexPay"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] text-base-content/45",
									children: "Paiements et comptes"
								})] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative z-10 flex flex-1 items-center justify-center py-4 sm:py-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full max-w-[520px]",
								children
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10 flex flex-col gap-3 border-t border-base-300/70 pt-4 text-center text-xs text-base-content/45 sm:flex-row sm:items-center sm:justify-between sm:text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"© ",
								(/* @__PURE__ */ new Date()).getFullYear(),
								" NexPay. Tous droits réservés."
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap justify-center gap-4 sm:justify-end",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										className: "transition-colors hover:text-base-content/75",
										children: "Aide"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										className: "transition-colors hover:text-base-content/75",
										children: "Sécurité"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#",
										className: "transition-colors hover:text-base-content/75",
										children: "Confidentialité"
									})
								]
							})]
						})
					]
				})]
			})
		})
	});
}
function AuthCard({ children, title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "card w-full rounded-[2rem] border border-base-300/60 bg-base-100/85 shadow-2xl shadow-base-300/10 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card-body min-h-0 gap-5 p-5 sm:gap-6 sm:p-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 text-center sm:text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "card-title text-2xl font-black tracking-tight text-base-content/90 sm:text-4xl",
					children: title
				}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-xl text-sm leading-relaxed text-base-content/55 sm:text-base",
					children: subtitle
				})]
			}), children]
		})
	});
}
//#endregion
export { AuthCard, AuthLayout };
