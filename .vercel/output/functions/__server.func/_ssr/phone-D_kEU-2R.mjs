import { __toESM } from "../_runtime.mjs";
import { Link, require_jsx_runtime, require_react, useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { FormField, LoadingButton, SUPPORTED_COUNTRIES, phoneSchema, sanitizePhone } from "./LoadingButton-C-OWaSzP.mjs";
import { useRegister } from "./RegisterContext-BlQV2MbU.mjs";
import { PhoneInput } from "./PhoneInput-C6R_Lw4Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/phone-D_kEU-2R.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PhoneStep() {
	const { registrationData, updateData } = useRegister();
	const [phoneNumber, setPhoneNumber] = (0, import_react.useState)(registrationData.phoneNumber);
	const [countryCode, setCountryCode] = (0, import_react.useState)(registrationData.countryCode);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(void 0);
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(void 0);
		const validation = phoneSchema.safeParse({
			countryCode,
			phone: phoneNumber
		});
		if (!validation.success) {
			setError(validation.error.issues[0]?.message);
			return;
		}
		const country = SUPPORTED_COUNTRIES.find((c) => c.code === countryCode);
		if (!country) return;
		const sanitized = sanitizePhone(phoneNumber, country.callingCode);
		if (!country.regex.test(sanitized)) {
			setError(`Format invalide pour le pays sélectionné. Ex: ${country.placeholder}`);
			return;
		}
		setLoading(true);
		try {
			updateData({
				phoneNumber: sanitized,
				countryCode
			});
			navigate({ to: "/auth/register/personal" });
		} catch (err) {
			setError("Une erreur de réseau est survenue. Veuillez réessayer.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				label: "Numéro de téléphone",
				required: true,
				error,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneInput, {
					countryCode,
					phoneNumber,
					onCountryChange: (code) => {
						setCountryCode(code);
						setError(void 0);
					},
					onPhoneChange: (val) => {
						setPhoneNumber(val);
						setError(void 0);
					},
					disabled: loading,
					error: !!error
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-[11px] text-base-content/40 leading-relaxed font-medium",
				children: [
					"En continuant, vous acceptez les",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: "underline font-bold hover:text-base-content/60",
						children: "Conditions d'Utilisation"
					}),
					" ",
					"et la",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: "underline font-bold hover:text-base-content/60",
						children: "Politique de Confidentialité"
					}),
					" ",
					"de NexPay."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingButton, {
				type: "submit",
				loading,
				className: "w-full btn-md",
				children: "Continuer"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center text-sm font-semibold text-base-content/60",
				children: [
					"Vous avez déjà un compte ?",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth/login",
						className: "link link-primary font-bold",
						children: "Se connecter"
					})
				]
			})
		]
	});
}
//#endregion
export { PhoneStep as component };
