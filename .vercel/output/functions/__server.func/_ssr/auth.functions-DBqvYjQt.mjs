import { createServerFn, getRequestHeaders } from "./ssr2.mjs";
import { auth } from "./auth-CgLSap3w.mjs";
import { createServerRpc } from "./createServerRpc-NKXqGQmx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.functions-DBqvYjQt.js
var getSession_createServerFn_handler = createServerRpc({
	id: "753fb13391a5b0328ea3344426a11caf1f07e6f28fcdc91937757498d31af961",
	name: "getSession",
	filename: "src/lib/auth.functions.ts"
}, (opts) => getSession.__executeServer(opts));
var getSession = createServerFn({ method: "GET" }).handler(getSession_createServerFn_handler, async () => {
	return auth.api.getSession({ headers: getRequestHeaders() });
});
//#endregion
export { getSession_createServerFn_handler };
