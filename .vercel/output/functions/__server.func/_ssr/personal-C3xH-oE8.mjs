import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react, useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { FormField, LoadingButton, personalSchema } from "./LoadingButton-C-OWaSzP.mjs";
import { useRegister } from "./RegisterContext-BlQV2MbU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/personal-C3xH-oE8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PersonalStep() {
	const { registrationData, updateData } = useRegister();
	const [firstName, setFirstName] = (0, import_react.useState)(registrationData.firstName || "");
	const [lastName, setLastName] = (0, import_react.useState)(registrationData.lastName || "");
	const [birthDate, setBirthDate] = (0, import_react.useState)(registrationData.birthDate || "");
	const [error, setError] = (0, import_react.useState)(void 0);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		setError(void 0);
		setLoading(true);
		const validation = personalSchema.safeParse({
			firstName,
			lastName,
			birthDate
		});
		if (!validation.success) {
			setError(validation.error.issues[0]?.message);
			setLoading(false);
			return;
		}
		updateData({
			firstName,
			lastName,
			birthDate
		});
		setLoading(false);
		navigate({ to: "/auth/register/country" });
	};
	const isUnderAge = error && error.includes("18 ans");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					label: "Prénom",
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						className: "input input-bordered w-full font-bold focus:outline-none focus:border-primary",
						value: firstName,
						onChange: (e) => setFirstName(e.target.value),
						disabled: loading,
						placeholder: "Jean"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
					label: "Nom",
					required: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						className: "input input-bordered w-full font-bold focus:outline-none focus:border-primary",
						value: lastName,
						onChange: (e) => setLastName(e.target.value),
						disabled: loading,
						placeholder: "Mpemba"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
				label: "Date de naissance",
				required: true,
				description: "Minimum 18 ans",
				error,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "date",
					className: `input input-bordered w-full font-bold focus:outline-none focus:border-primary ${isUnderAge ? "border-error text-error bg-error/5 focus:border-error" : ""}`,
					value: birthDate,
					onChange: (e) => {
						setBirthDate(e.target.value);
						setError(void 0);
					},
					disabled: loading
				})
			}),
			isUnderAge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "alert alert-warning text-xs font-semibold rounded-2xl bg-warning/10 text-warning-content border border-warning/15 p-3.5 leading-relaxed",
				children: "NexPay est actuellement disponible uniquement aux utilisateurs qui remplissent les conditions d'âge minimum (18 ans ou plus)."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingButton, {
				type: "submit",
				loading,
				className: "w-full btn-md mt-2",
				children: "Continuer"
			})
		]
	});
}
//#endregion
export { PersonalStep as component };
