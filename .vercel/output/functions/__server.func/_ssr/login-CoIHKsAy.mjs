import { __toESM } from "../_runtime.mjs";
import { Link, require_jsx_runtime, require_react, useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Lock } from "../_libs/lucide-react.mjs";
import { authClient, phoneLoginEmail } from "./router-5dHOOvT4.mjs";
import { FormField, LoadingButton, SUPPORTED_COUNTRIES, loginSchema, sanitizePhone } from "./LoadingButton-C-OWaSzP.mjs";
import { AuthCard, AuthLayout } from "./AuthCard-DB5GDe9E.mjs";
import { PhoneInput } from "./PhoneInput-C6R_Lw4Z.mjs";
import { PasswordInput } from "./PasswordInput-CL7zT8it.mjs";
import { ErrorMessage } from "./ErrorMessage-CtLFFvPR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CoIHKsAy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginComponent() {
	const [phone, setPhone] = (0, import_react.useState)("");
	const [countryCode, setCountryCode] = (0, import_react.useState)("CG");
	const [password, setPassword] = (0, import_react.useState)("");
	const [rememberMe, setRememberMe] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(void 0);
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(void 0);
		const validation = loginSchema.safeParse({
			countryCode,
			phone,
			password
		});
		if (!validation.success) {
			setError(validation.error.issues[0]?.message);
			return;
		}
		const country = SUPPORTED_COUNTRIES.find((c) => c.code === countryCode);
		if (!country) return;
		const sanitized = sanitizePhone(phone, country.callingCode);
		const fullPhone = country.callingCode + sanitized;
		setLoading(true);
		try {
			const { error: signInError } = await authClient.signIn.email({
				email: phoneLoginEmail(fullPhone),
				password,
				rememberMe
			});
			if (signInError) {
				setError("Numéro de téléphone ou mot de passe incorrect.");
				setLoading(false);
				return;
			}
			navigate({ to: "/dashboard" });
		} catch (err) {
			setError("Une erreur de réseau est survenue. Veuillez réessayer.");
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthLayout, {
		heroEyebrow: "Connexion",
		heroImageSrc: "/images/afro-friends-having-fun-together-while-drinking-fruit-juice.jpg",
		logoNexPaySrc: "/images/nexpay.png",
		logoNexPayAlt: "Logo de NexPay",
		iconNexpaySrc: "/images/nexpay-icon.png",
		heroImageAlt: "Femme utilisant son téléphone pendant sa journée",
		heroTitle: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Vos paiements,",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
			"toujours avec vous."
		] }),
		heroDescription: "Retrouvez votre espace NexPay et gardez le contrôle de vos comptes, où que vous soyez.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthCard, {
			title: "RAVI DE VOUS REVOIR 😁",
			subtitle: "Connectez-vous pour continuer vers votre espace NexPay.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Numéro de téléphone",
						required: true,
						error: error && error.includes("téléphone") ? error : void 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneInput, {
							countryCode,
							phoneNumber: phone,
							onCountryChange: (code) => {
								setCountryCode(code);
								setError(void 0);
							},
							onPhoneChange: (val) => {
								setPhone(val);
								setError(void 0);
							},
							disabled: loading,
							error: error && error.includes("téléphone") ? true : false
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Mot de passe",
						required: true,
						error: error && error.includes("passe") ? error : void 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordInput, {
							value: password,
							onChange: (e) => {
								setPassword(e.target.value);
								setError(void 0);
							},
							disabled: loading,
							placeholder: "Saisissez votre mot de passe",
							error: error && error.includes("passe") ? true : false
						})
					}),
					error && !error.includes("téléphone") && !error.includes("passe") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorMessage, { message: error }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "label cursor-pointer justify-start gap-2 py-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: rememberMe,
								onChange: (e) => setRememberMe(e.target.checked),
								className: "checkbox checkbox-primary checkbox-xs rounded-md",
								disabled: loading
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-text font-bold text-base-content/55",
								children: "Se souvenir de moi"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth/forgot-password",
							className: "link link-primary font-bold hover:underline",
							children: "Mot de passe oublié ?"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingButton, {
						type: "submit",
						loading,
						className: "w-full btn-md",
						children: "Se connecter"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center text-sm font-semibold text-base-content/60",
						children: [
							"Nouveau sur NexPay ?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth/register",
								className: "link link-primary font-bold",
								children: "Créer un compte"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center gap-1.5 pt-2 text-[11px] text-base-content/40 font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3.5 stroke-[2.5]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Votre connexion est entièrement sécurisée." })]
					})
				]
			})
		})
	});
}
//#endregion
export { LoginComponent as component };
