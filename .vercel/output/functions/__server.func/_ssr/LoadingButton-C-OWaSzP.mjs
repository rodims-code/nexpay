import "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { object, string$1 as string } from "../_libs/zod.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var SUPPORTED_COUNTRIES = [
	{
		code: "CG",
		name: "République du Congo",
		callingCode: "+242",
		flag: "🇨🇬",
		currency: "XAF",
		placeholder: "06 600 00 00",
		regex: /^(05|06)\d{7}$/
	},
	{
		code: "CD",
		name: "R.D. Congo",
		callingCode: "+243",
		flag: "🇨🇩",
		currency: "CDF",
		placeholder: "810 000 000",
		regex: /^[89]\d{8}$/
	},
	{
		code: "SN",
		name: "Sénégal",
		callingCode: "+221",
		flag: "🇸🇳",
		currency: "XOF",
		placeholder: "77 000 00 00",
		regex: /^(70|75|76|77|78)\d{7}$/
	},
	{
		code: "GA",
		name: "Gabon",
		callingCode: "+241",
		flag: "🇬🇦",
		currency: "XAF",
		placeholder: "06 00 00 00",
		regex: /^(05|06|07)\d{7}$/
	}
];
var usersDb = /* @__PURE__ */ new Map([["+242061234567", {
	phoneNumber: "061234567",
	countryCode: "CG",
	firstName: "Jean",
	lastName: "Mpemba",
	birthDate: "1995-05-15",
	password: "Password123!",
	currency: "XAF"
}]]);
var otpStore = /* @__PURE__ */ new Map();
function sanitizePhone(phone, callingCode) {
	let cleaned = phone.replace(/[\s()-]/g, "");
	if (cleaned.startsWith(callingCode)) cleaned = cleaned.substring(callingCode.length);
	if (cleaned.startsWith("+")) cleaned = cleaned.replace(/^\+\d+/, "");
	return cleaned;
}
var phoneSchema = object({
	countryCode: string().min(2, "Veuillez sélectionner un pays"),
	phone: string().min(6, "Numéro de téléphone trop court")
});
var personalSchema = object({
	firstName: string().min(2, "Le prénom doit contenir au moins 2 caractères"),
	lastName: string().min(2, "Le nom doit contenir au moins 2 caractères"),
	birthDate: string().refine((val) => {
		if (!val) return false;
		const date = new Date(val);
		if (isNaN(date.getTime())) return false;
		const today = /* @__PURE__ */ new Date();
		let age = today.getFullYear() - date.getFullYear();
		const m = today.getMonth() - date.getMonth();
		if (m < 0 || m === 0 && today.getDate() < date.getDate()) age--;
		return age >= 18;
	}, { message: "Vous devez avoir au moins 18 ans pour utiliser NexPay." })
});
var countrySchema = object({
	countryCode: string().min(2, "Veuillez sélectionner un pays de résidence"),
	currency: string().min(3, "Devise requise")
});
var securitySchema = object({
	password: string().min(8, "Le mot de passe doit contenir au moins 8 caractères").regex(/[A-Z]/, "Requiert au moins une lettre majuscule").regex(/[a-z]/, "Requiert au moins une lettre minuscule").regex(/[0-9]/, "Requiert au moins un chiffre").regex(/[^A-Za-z0-9]/, "Requiert au moins un caractère spécial"),
	confirmPassword: string()
}).refine((data) => data.password === data.confirmPassword, {
	message: "Les mots de passe ne correspondent pas.",
	path: ["confirmPassword"]
});
var loginSchema = object({
	countryCode: string().min(2),
	phone: string().min(6, "Numéro de téléphone requis"),
	password: string().min(1, "Mot de passe requis")
});
var mockAuthService = {
	checkPhoneExists: async (fullPhone) => {
		await new Promise((r) => setTimeout(r, 850));
		return usersDb.has(fullPhone);
	},
	sendOtp: async (fullPhone) => {
		await new Promise((r) => setTimeout(r, 1e3));
		const code = Math.floor(1e5 + Math.random() * 9e5).toString();
		const expiresAt = Date.now() + 6e4;
		otpStore.set(fullPhone, {
			code,
			expiresAt,
			attempts: 0
		});
		console.log(`[MOCK SMS] OTP code for ${fullPhone}: ${code}`);
		return code;
	},
	verifyOtp: async (fullPhone, code) => {
		await new Promise((r) => setTimeout(r, 800));
		const entry = otpStore.get(fullPhone);
		if (!entry) return {
			success: false,
			errorType: "incorrect"
		};
		if (entry.attempts >= 3) return {
			success: false,
			errorType: "blocked"
		};
		if (Date.now() > entry.expiresAt) return {
			success: false,
			errorType: "expired"
		};
		if (entry.code !== code) {
			entry.attempts++;
			otpStore.set(fullPhone, entry);
			return {
				success: false,
				errorType: "incorrect"
			};
		}
		otpStore.delete(fullPhone);
		return { success: true };
	},
	registerUser: async (userData) => {
		await new Promise((r) => setTimeout(r, 1200));
		const country = SUPPORTED_COUNTRIES.find((c) => c.code === userData.countryCode);
		if (!country) return {
			success: false,
			error: "Pays non pris en charge."
		};
		const fullPhone = country.callingCode + sanitizePhone(userData.phoneNumber, country.callingCode);
		if (usersDb.has(fullPhone)) return {
			success: false,
			error: "Ce numéro de téléphone est déjà enregistré."
		};
		usersDb.set(fullPhone, userData);
		return { success: true };
	},
	loginUser: async (fullPhone, password) => {
		await new Promise((r) => setTimeout(r, 1200));
		const user = usersDb.get(fullPhone);
		if (!user) return {
			success: false,
			errorType: "not_found"
		};
		if (user.password !== password) return {
			success: false,
			errorType: "incorrect_password"
		};
		return {
			success: true,
			user
		};
	}
};
function FormField({ label, error, children, required, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "form-control w-full space-y-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-baseline px-0.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "label py-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "label-text font-bold text-base-content/85 text-xs sm:text-sm",
						children: [
							label,
							" ",
							required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-error",
								children: "*"
							})
						]
					})
				}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] text-base-content/40 font-medium",
					children: description
				})]
			}),
			children,
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-error font-semibold px-0.5 transition-all",
				children: error
			})
		]
	});
}
function LoadingButton({ loading = false, children, variant = "primary", className = "", disabled, ...props }) {
	let btnClass = "btn rounded-2xl font-bold transition-all duration-200 active:scale-[0.98] ";
	if (variant === "primary") btnClass += "btn-primary text-primary-content shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30";
	else if (variant === "secondary") btnClass += "btn-secondary text-secondary-content shadow-md shadow-secondary/15 hover:shadow-lg";
	else if (variant === "outline") btnClass += "btn-outline border-base-300 hover:bg-base-200";
	else btnClass += "btn-ghost shadow-none";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: `${btnClass} ${className}`,
		disabled: disabled || loading,
		...props,
		children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "loading loading-spinner loading-xs" }), children]
	});
}
//#endregion
export { FormField, LoadingButton, SUPPORTED_COUNTRIES, countrySchema, loginSchema, mockAuthService, personalSchema, phoneSchema, sanitizePhone, securitySchema };
