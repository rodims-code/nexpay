import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react, useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { FormField, LoadingButton, SUPPORTED_COUNTRIES, countrySchema } from "./LoadingButton-C-OWaSzP.mjs";
import { useRegister } from "./RegisterContext-BlQV2MbU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/country-BTjfqP0L.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CountrySelector({ value, onChange, disabled = false, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
		className: `select select-bordered w-full rounded-2xl bg-base-100 border-base-300 font-medium focus:border-primary focus:outline-none ${className}`,
		value,
		onChange: (e) => onChange(e.target.value),
		disabled,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: "",
			disabled: true,
			children: "Sélectionnez votre pays"
		}), SUPPORTED_COUNTRIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
			value: c.code,
			children: [
				c.flag,
				" ",
				c.name,
				" (",
				c.callingCode,
				")"
			]
		}, c.code))]
	});
}
function CountryStep() {
	const { registrationData, updateData } = useRegister();
	const [countryCode, setCountryCode] = (0, import_react.useState)(registrationData.countryCode || "CG");
	const [currency, setCurrency] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(void 0);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		const country = SUPPORTED_COUNTRIES.find((c) => c.code === countryCode);
		if (country) setCurrency(country.currency);
	}, [countryCode]);
	const handleSubmit = (e) => {
		e.preventDefault();
		setError(void 0);
		setLoading(true);
		const validation = countrySchema.safeParse({
			countryCode,
			currency
		});
		if (!validation.success) {
			setError(validation.error.issues[0]?.message);
			setLoading(false);
			return;
		}
		updateData({
			countryCode,
			currency
		});
		setLoading(false);
		navigate({ to: "/auth/register/security" });
	};
	const selectedCountry = SUPPORTED_COUNTRIES.find((c) => c.code === countryCode);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				label: "Pays de résidence",
				required: true,
				error,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountrySelector, {
					value: countryCode,
					onChange: (code) => {
						setCountryCode(code);
						setError(void 0);
					},
					disabled: loading
				})
			}),
			selectedCountry && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					label: "Devise de facturation (automatique)",
					description: "Déterminée selon votre pays",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "input input-bordered w-full font-bold bg-base-200 border-base-300 flex items-center gap-2 select-none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🪙" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedCountry.currency }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-base-content/40 font-medium",
								children: [
									"(",
									selectedCountry.currency === "CDF" ? "Franc Congolais" : "Franc CFA",
									")"
								]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "alert alert-info text-xs font-semibold rounded-2xl bg-info/10 text-info border border-info/15 p-3.5 leading-relaxed",
					children: "💡 Votre pays de résidence détermine les rails de paiement, les devises locales configurées, ainsi que les frais applicables sur votre compte NexPay."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingButton, {
				type: "submit",
				loading,
				className: "w-full btn-md",
				children: "Continuer"
			})
		]
	});
}
//#endregion
export { CountryStep as component };
