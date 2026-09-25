import "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { SUPPORTED_COUNTRIES } from "./LoadingButton-C-OWaSzP.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function PhoneInput({ countryCode, phoneNumber, onCountryChange, onPhoneChange, disabled = false, error = false, placeholder }) {
	const selectedCountry = SUPPORTED_COUNTRIES.find((c) => c.code === countryCode);
	const handlePhoneInputChange = (e) => {
		let val = e.target.value;
		val = val.replace(/[^\d\s-]/g, "");
		onPhoneChange(val);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "join w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			className: `select select-bordered join-item bg-base-200 border-base-300 font-bold px-3 text-center focus:outline-none focus:border-primary ${error ? "border-error" : ""}`,
			value: countryCode,
			onChange: (e) => onCountryChange(e.target.value),
			disabled,
			"aria-label": "Code pays",
			children: SUPPORTED_COUNTRIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
				value: c.code,
				children: [
					c.flag,
					" ",
					c.callingCode
				]
			}, c.code))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "tel",
			className: `input input-bordered join-item w-full font-bold focus:outline-none focus:border-primary ${error ? "border-error" : ""}`,
			placeholder: placeholder || (selectedCountry ? selectedCountry.placeholder : "06 600 00 00"),
			value: phoneNumber,
			onChange: handlePhoneInputChange,
			disabled
		})]
	});
}
//#endregion
export { PhoneInput };
