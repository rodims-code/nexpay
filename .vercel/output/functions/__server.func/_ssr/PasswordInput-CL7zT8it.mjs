import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { Eye, EyeOff } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PasswordInput-CL7zT8it.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PasswordInput({ error = false, className = "", ...props }) {
	const [show, setShow] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: show ? "text" : "password",
			className: `input input-bordered w-full pr-12 font-bold focus:outline-none focus:border-primary ${error ? "border-error" : ""} ${className}`,
			...props
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "btn btn-ghost btn-circle btn-sm absolute right-2.5 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content/85",
			onClick: () => setShow(!show),
			tabIndex: -1,
			"aria-label": show ? "Masquer le mot de passe" : "Afficher le mot de passe",
			children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4.5" })
		})]
	});
}
//#endregion
export { PasswordInput };
