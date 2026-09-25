import { __toESM } from "../_runtime.mjs";
import { Link, require_jsx_runtime, require_react, useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { CircleCheck } from "../_libs/lucide-react.mjs";
import { FormField, LoadingButton, SUPPORTED_COUNTRIES, mockAuthService, sanitizePhone } from "./LoadingButton-C-OWaSzP.mjs";
import { AuthCard, AuthLayout } from "./AuthCard-DB5GDe9E.mjs";
import { PhoneInput } from "./PhoneInput-C6R_Lw4Z.mjs";
import { PasswordInput } from "./PasswordInput-CL7zT8it.mjs";
import { ErrorMessage } from "./ErrorMessage-CtLFFvPR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forgot-password-DrkozIpa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OtpInput({ value, onChange, disabled = false, error = false }) {
	const inputsRef = (0, import_react.useRef)([]);
	const handleInputChange = (e, index) => {
		const cleaned = e.target.value.replace(/\D/g, "");
		if (!cleaned) return;
		const newOtp = [...Array(6)].map((_, i) => value[i] || "");
		newOtp[index] = cleaned[cleaned.length - 1];
		onChange(newOtp.join(""));
		if (index < 5 && cleaned.length > 0) inputsRef.current[index + 1]?.focus();
	};
	const handleKeyDown = (e, index) => {
		if (e.key === "Backspace") {
			const newOtp = [...Array(6)].map((_, i) => value[i] || "");
			if (!newOtp[index] && index > 0) {
				newOtp[index - 1] = "";
				onChange(newOtp.join(""));
				inputsRef.current[index - 1]?.focus();
			} else {
				newOtp[index] = "";
				onChange(newOtp.join(""));
			}
		}
	};
	const handlePaste = (e) => {
		e.preventDefault();
		const cleaned = e.clipboardData.getData("text").replace(/\D/g, "").substring(0, 6);
		if (cleaned) {
			onChange(cleaned);
			const targetIdx = Math.min(cleaned.length, 5);
			inputsRef.current[targetIdx]?.focus();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-between items-center gap-2 sm:gap-3 w-full",
		dir: "ltr",
		children: Array.from({ length: 6 }).map((_, idx) => {
			const val = value[idx] || "";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "text",
				inputMode: "numeric",
				pattern: "[0-9]*",
				maxLength: 1,
				ref: (el) => {
					inputsRef.current[idx] = el;
				},
				value: val,
				onChange: (e) => handleInputChange(e, idx),
				onKeyDown: (e) => handleKeyDown(e, idx),
				onPaste: handlePaste,
				disabled,
				className: `input input-bordered w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-black rounded-2xl bg-base-100 border-base-300 focus:border-primary focus:outline-none transition-all ${error ? "border-error text-error bg-error/5 focus:border-error" : ""}`
			}, idx);
		})
	});
}
function SuccessMessage({ message }) {
	if (!message) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "alert alert-success rounded-2xl p-4 flex items-start gap-3 shadow-sm border border-success/15 bg-success/8 text-success text-sm leading-relaxed",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 shrink-0 text-success mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-semibold",
			children: message
		})]
	});
}
function ForgotPasswordComponent() {
	const [step, setStep] = (0, import_react.useState)(1);
	const [phone, setPhone] = (0, import_react.useState)("");
	const [countryCode, setCountryCode] = (0, import_react.useState)("CG");
	const [otpCode, setOtpCode] = (0, import_react.useState)("");
	const [mockOtp, setMockOtp] = (0, import_react.useState)("");
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(void 0);
	const [success, setSuccess] = (0, import_react.useState)(void 0);
	const navigate = useNavigate();
	const country = SUPPORTED_COUNTRIES.find((c) => c.code === countryCode);
	const callingCode = country ? country.callingCode : "";
	const fullPhone = callingCode + sanitizePhone(phone, callingCode);
	const handleSendCode = async (e) => {
		e.preventDefault();
		setError(void 0);
		if (!phone) {
			setError("Veuillez saisir votre numéro de téléphone.");
			return;
		}
		setLoading(true);
		try {
			if (!await mockAuthService.checkPhoneExists(fullPhone)) {
				setError("Ce numéro de téléphone n'est pas associé à un compte NexPay.");
				setLoading(false);
				return;
			}
			const code = await mockAuthService.sendOtp(fullPhone);
			setMockOtp(code);
			setStep(2);
		} catch (err) {
			setError("Une erreur est survenue. Veuillez réessayer.");
		} finally {
			setLoading(false);
		}
	};
	const handleResetPassword = async (e) => {
		e.preventDefault();
		setError(void 0);
		setSuccess(void 0);
		if (otpCode !== mockOtp) {
			setError("Le code de vérification SMS est incorrect.");
			return;
		}
		if (newPassword.length < 8) {
			setError("Le mot de passe doit contenir au moins 8 caractères.");
			return;
		}
		if (newPassword !== confirmPassword) {
			setError("Les nouveaux mots de passe ne correspondent pas.");
			return;
		}
		setLoading(true);
		try {
			const userRes = await mockAuthService.loginUser(fullPhone);
			if (userRes.success && userRes.user) {
				const updatedUser = {
					...userRes.user,
					password: newPassword
				};
				await mockAuthService.registerUser(updatedUser);
			}
			setSuccess("Votre mot de passe a bien été réinitialisé.");
			setTimeout(() => {
				navigate({ to: "/auth/login" });
			}, 1500);
		} catch (err) {
			setError("Impossible de réinitialiser le mot de passe. Veuillez réessayer.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthLayout, {
		showBackButton: step === 2,
		onBackClick: () => {
			setStep(1);
			setError(void 0);
			setOtpCode("");
		},
		backButtonText: "Retour",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthCard, {
			title: "Mot de passe oublié ?",
			subtitle: step === 1 ? "Entrez votre numéro de téléphone pour recevoir un code de réinitialisation." : "Veuillez renseigner le code SMS et choisir votre nouveau mot de passe.",
			children: step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSendCode,
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Numéro de téléphone",
						required: true,
						error,
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
							error: !!error
						})
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
							"Retourner à la",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth/login",
								className: "link link-primary font-bold",
								children: "page de connexion"
							})
						]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleResetPassword,
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center sm:text-left space-y-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-base-content/55 font-bold",
							children: ["Code envoyé au ", fullPhone]
						})
					}),
					mockOtp && !success && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "alert alert-warning text-xs font-semibold rounded-2xl bg-warning/10 text-warning-content border border-warning/15 p-3 flex flex-col items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "opacity-75",
							children: "📱 CODE SMS REÇU (Simulation) :"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xl font-black tracking-widest text-warning",
							children: mockOtp
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Code de validation",
						required: true,
						error: error && error.includes("code") ? error : void 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OtpInput, {
							value: otpCode,
							onChange: (val) => {
								setOtpCode(val);
								setError(void 0);
							},
							disabled: loading || !!success,
							error: error && error.includes("code") ? true : false
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Nouveau mot de passe",
						required: true,
						error: error && error.includes("passe") ? error : void 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordInput, {
							value: newPassword,
							onChange: (e) => {
								setNewPassword(e.target.value);
								setError(void 0);
							},
							disabled: loading || !!success,
							placeholder: "Saisissez un nouveau mot de passe",
							error: error && error.includes("passe") ? true : false
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
						label: "Confirmer le nouveau mot de passe",
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordInput, {
							value: confirmPassword,
							onChange: (e) => {
								setConfirmPassword(e.target.value);
								setError(void 0);
							},
							disabled: loading || !!success,
							placeholder: "Confirmez votre mot de passe"
						})
					}),
					error && !error.includes("code") && !error.includes("passe") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorMessage, { message: error }),
					success && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuccessMessage, { message: success }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingButton, {
						type: "submit",
						loading,
						disabled: !!success,
						className: "w-full btn-md",
						children: "Réinitialiser le mot de passe"
					})
				]
			})
		})
	});
}
//#endregion
export { ForgotPasswordComponent as component };
