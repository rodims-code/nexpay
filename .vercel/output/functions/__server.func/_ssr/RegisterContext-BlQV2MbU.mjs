import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/RegisterContext-BlQV2MbU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RegisterContext = (0, import_react.createContext)(void 0);
function RegisterProvider({ children }) {
	const [registrationData, setRegistrationData] = (0, import_react.useState)({
		phoneNumber: "",
		countryCode: "CG"
	});
	const [otpCode, setOtpCode] = (0, import_react.useState)("");
	const updateData = (data) => {
		setRegistrationData((current) => ({
			...current,
			...data
		}));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegisterContext.Provider, {
		value: {
			registrationData,
			updateData,
			otpCode,
			setOtpCode
		},
		children
	});
}
function useRegister() {
	const context = (0, import_react.useContext)(RegisterContext);
	if (!context) throw new Error("useRegister must be used within RegisterProvider");
	return context;
}
//#endregion
export { RegisterProvider, useRegister };
