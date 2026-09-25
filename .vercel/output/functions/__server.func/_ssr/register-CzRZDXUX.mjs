import { Outlet, require_jsx_runtime, useLocation, useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { RegisterProvider } from "./RegisterContext-BlQV2MbU.mjs";
import { AuthCard, AuthLayout } from "./AuthCard-DB5GDe9E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register-CzRZDXUX.js
var import_jsx_runtime = require_jsx_runtime();
function ProgressIndicator({ currentStep }) {
	const steps = [
		{
			number: 1,
			label: "Téléphone"
		},
		{
			number: 2,
			label: "Informations"
		},
		{
			number: 3,
			label: "Éligibilité"
		},
		{
			number: 4,
			label: "Sécurité"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full pb-4 space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "badge badge-primary font-bold text-xs",
						children: [
							"Étape ",
							currentStep,
							" / 4"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-bold text-base-content/80",
						children: steps[currentStep - 1]?.label
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs font-semibold text-base-content/40",
					children: [Math.round(currentStep / 4 * 100), "%"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("progress", {
				className: "progress progress-primary w-full lg:hidden h-1.5",
				value: currentStep,
				max: "4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "steps steps-horizontal w-full hidden lg:grid text-xs",
				children: steps.map((step) => {
					const isCompleted = step.number < currentStep;
					const isActive = step.number === currentStep;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: `step text-[11px] leading-tight ${isCompleted || isActive ? "step-primary font-bold text-primary-content" : "text-base-content/40"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: isActive ? "font-black text-primary" : "",
							children: step.label
						})
					}, step.number);
				})
			})
		]
	});
}
function RegisterLayout() {
	const location = useLocation();
	const navigate = useNavigate();
	const getStepDetails = (pathname) => {
		if (pathname.includes("/auth/register/phone")) return {
			step: 1,
			title: "Créer votre compte NexPay",
			subtitle: "Commencez par votre numéro de téléphone. Nous l'utiliserons pour sécuriser votre compte."
		};
		if (pathname.includes("/auth/register/personal")) return {
			step: 2,
			title: "Informations personnelles",
			subtitle: "Veuillez saisir vos détails personnels. Uniquement ce qui est requis pour le service."
		};
		if (pathname.includes("/auth/register/country")) return {
			step: 3,
			title: "Où résidez-vous ?",
			subtitle: "Votre pays détermine les devises et méthodes de paiement éligibles."
		};
		if (pathname.includes("/auth/register/security")) return {
			step: 4,
			title: "Sécuriser votre compte",
			subtitle: "Créez un mot de passe robuste pour protéger vos fonds et transactions."
		};
		return {
			step: 1,
			title: "Créer votre compte NexPay",
			subtitle: "Commencez par votre numéro de téléphone. Nous l'utiliserons pour sécuriser votre compte."
		};
	};
	const { step: currentStep, title, subtitle } = getStepDetails(location.pathname);
	const handleBack = () => {
		if (currentStep === 2) navigate({ to: "/auth/register/phone" });
		else if (currentStep === 3) navigate({ to: "/auth/register/personal" });
		else if (currentStep === 4) navigate({ to: "/auth/register/country" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegisterProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthLayout, {
		showBackButton: currentStep > 1,
		onBackClick: handleBack,
		backButtonText: "Étape précédente",
		heroEyebrow: "Inscription",
		heroImageSrc: "/images/industrial-designer-working-3d-model.jpg",
		heroImageAlt: "Homme consultant son téléphone dans un espace de travail",
		heroTitle: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Construis ton avenir",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
			"financier."
		] }),
		heroDescription: "Créez votre compte NexPay et avancez avec une expérience pensée pour vos projets et vos paiements.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthCard, {
			title,
			subtitle: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressIndicator, { currentStep }), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-base-content/60 text-sm leading-relaxed",
					children: subtitle
				})]
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})
		})
	}) });
}
//#endregion
export { RegisterLayout as component };
