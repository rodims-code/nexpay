import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react, useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Check, X } from "../_libs/lucide-react.mjs";
import { authClient, phoneLoginEmail } from "./router-5dHOOvT4.mjs";
import { FormField, LoadingButton, SUPPORTED_COUNTRIES, securitySchema } from "./LoadingButton-C-OWaSzP.mjs";
import { useRegister } from "./RegisterContext-BlQV2MbU.mjs";
import { PasswordInput } from "./PasswordInput-CL7zT8it.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/security-D2hfRe28.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PasswordStrength({ password }) {
	if (!password) return null;
	const checks = [
		{
			label: "Au moins 8 caractères",
			test: (p) => p.length >= 8
		},
		{
			label: "Majuscules & minuscules",
			test: (p) => /[A-Z]/.test(p) && /[a-z]/.test(p)
		},
		{
			label: "Au moins un chiffre",
			test: (p) => /[0-9]/.test(p)
		},
		{
			label: "Un caractère spécial",
			test: (p) => /[^A-Za-z0-9]/.test(p)
		}
	];
	const passedCount = checks.filter((c) => c.test(password)).length;
	let strengthLabel = "Faible";
	let progressColor = "progress-error";
	let progressValue = 1;
	if (passedCount >= 4) {
		strengthLabel = "Robuste";
		progressColor = "progress-success";
		progressValue = 3;
	} else if (passedCount >= 2) {
		strengthLabel = "Moyen";
		progressColor = "progress-warning";
		progressValue = 2;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2 p-3.5 bg-base-200/50 rounded-2xl border border-base-200/60",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold text-base-content/50",
					children: "Sécurité du mot de passe :"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `font-black ${passedCount >= 4 ? "text-success" : passedCount >= 2 ? "text-warning" : "text-error"}`,
					children: strengthLabel
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("progress", {
				className: `progress ${progressColor} w-full h-1.5`,
				value: progressValue,
				max: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 pt-1.5",
				children: checks.map((check, idx) => {
					const ok = check.test(password);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 text-[11px] font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `flex size-4 items-center justify-center rounded-full shrink-0 ${ok ? "bg-success/15 text-success" : "bg-base-300 text-base-content/25"}`,
							children: ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-2.5 stroke-[3]" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-2.5 stroke-[3]" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: ok ? "text-base-content/80" : "text-base-content/40",
							children: check.label
						})]
					}, idx);
				})
			})
		]
	});
}
function SecurityStep() {
	const { registrationData, updateData } = useRegister();
	const [password, setPassword] = (0, import_react.useState)(registrationData.password || "");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)(registrationData.password || "");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(void 0);
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(void 0);
		setLoading(true);
		const validation = securitySchema.safeParse({
			password,
			confirmPassword
		});
		if (!validation.success) {
			setError(validation.error.issues[0]?.message);
			setLoading(false);
			return;
		}
		const country = SUPPORTED_COUNTRIES.find((item) => item.code === registrationData.countryCode);
		if (!country || !registrationData.firstName || !registrationData.lastName || !registrationData.birthDate || !registrationData.currency) {
			setError("Veuillez compléter les étapes précédentes avant de créer votre compte.");
			setLoading(false);
			return;
		}
		updateData({ password });
		const phone = country.callingCode + registrationData.phoneNumber;
		const { error: signUpError } = await authClient.signUp.email({
			name: `${registrationData.firstName} ${registrationData.lastName}`,
			email: phoneLoginEmail(phone),
			password,
			phone,
			countryCode: registrationData.countryCode,
			currency: registrationData.currency,
			firstName: registrationData.firstName,
			lastName: registrationData.lastName,
			birthDate: registrationData.birthDate
		});
		if (signUpError) {
			setError(signUpError.code === "USER_ALREADY_EXISTS" ? "Ce numéro de téléphone est déjà enregistré chez NexPay." : "Impossible de créer votre compte. Veuillez réessayer.");
			setLoading(false);
			return;
		}
		navigate({ to: "/dashboard" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				label: "Mot de passe",
				required: true,
				error,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordInput, {
					value: password,
					onChange: (e) => {
						setPassword(e.target.value);
						setError(void 0);
					},
					disabled: loading,
					placeholder: "Définir un mot de passe"
				})
			}),
			password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordStrength, { password }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				label: "Confirmer le mot de passe",
				required: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordInput, {
					value: confirmPassword,
					onChange: (e) => {
						setConfirmPassword(e.target.value);
						setError(void 0);
					},
					disabled: loading,
					placeholder: "Ressaisir le mot de passe"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingButton, {
				type: "submit",
				loading,
				className: "w-full btn-md",
				children: "Créer mon compte"
			})
		]
	});
}
//#endregion
export { SecurityStep as component };
