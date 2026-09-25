import { require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { Download, Search } from "../_libs/lucide-react.mjs";
import { DashboardLayout } from "./router-5dHOOvT4.mjs";
import { demoTransactions } from "./dashboard-data-DeK0PiCk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/transactions-Fo2Fojqg.js
var import_jsx_runtime = require_jsx_runtime();
function TransactionsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardLayout, {
		title: "Transactions",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "input input-bordered flex flex-1 items-center gap-2 rounded-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 text-base-content/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { placeholder: "Rechercher une transaction" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "btn btn-outline rounded-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Exporter"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-[1.75rem] border border-base-200 bg-base-100",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Destinataire" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Référence" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Date" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Montant" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Statut" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: demoTransactions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "hover",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `flex size-9 items-center justify-center rounded-xl text-xs font-bold ${item.tone}`,
									children: item.initials
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold",
									children: item.name
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "text-xs text-base-content/50",
								children: item.id
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "text-sm text-base-content/60",
								children: item.date
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "font-bold",
								children: item.amount
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `badge badge-sm rounded-full border-0 font-bold ${item.tone}`,
								children: item.status
							}) })
						]
					}, item.id)) })]
				})
			})]
		})
	});
}
//#endregion
export { TransactionsPage as component };
