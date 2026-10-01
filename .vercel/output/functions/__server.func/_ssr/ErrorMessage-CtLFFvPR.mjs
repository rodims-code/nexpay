import { require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { CircleAlert } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ErrorMessage-CtLFFvPR.js
var import_jsx_runtime = require_jsx_runtime();
function ErrorMessage({ message }) {
	if (!message) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "alert alert-error rounded-2xl p-4 flex items-start gap-3 shadow-sm border border-error/15 bg-error/8 text-error text-sm leading-relaxed",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-5 shrink-0 text-error mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-semibold",
			children: message
		})]
	});
}
//#endregion
export { ErrorMessage };
