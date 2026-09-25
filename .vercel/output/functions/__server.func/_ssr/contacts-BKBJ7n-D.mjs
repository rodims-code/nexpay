import { require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { Phone, Plus, Search, Star } from "../_libs/lucide-react.mjs";
import { DashboardLayout } from "./router-5dHOOvT4.mjs";
import { demoContacts } from "./dashboard-data-DeK0PiCk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contacts-BKBJ7n-D.js
var import_jsx_runtime = require_jsx_runtime();
function ContactsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardLayout, {
		title: "Mes contacts",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-between gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "input input-bordered flex items-center gap-2 rounded-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 text-base-content/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { placeholder: "Rechercher un contact" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "btn btn-primary rounded-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Nouveau contact"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: demoContacts.map((contact) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "card rounded-3xl border border-base-200 bg-base-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-body flex-row items-center gap-4 p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `flex size-12 shrink-0 items-center justify-center rounded-2xl text-sm font-extrabold ${contact.color}`,
								children: contact.initials
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "truncate font-bold",
									children: contact.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-1 text-sm text-base-content/50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3" }),
										" ",
										contact.phone
									]
								})]
							}),
							contact.favorite && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4 fill-warning text-warning" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn btn-ghost btn-sm rounded-full",
								children: "Envoyer"
							})
						]
					})
				}, contact.phone))
			})]
		})
	});
}
//#endregion
export { ContactsPage as component };
