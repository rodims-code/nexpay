import { HTTPError, toRequest } from "../_libs/h3+rou3+srvx.mjs";
//#region #nitro/virtual/vite-services
function lazyService(name, loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => {
			const m = typeof _mod.default?.fetch === "function" ? _mod.default : _mod;
			if (typeof m.fetch !== "function") throw new TypeError(`[nitro] Vite service "${name}" entry does not export a \`fetch\` handler.`);
			return mod = m;
		});
		return promise.then((mod) => mod.fetch(req));
	} };
}
var viteServices = { ["ssr"]: lazyService("ssr", () => import("../_ssr/ssr.mjs").then((n) => n.ssr_exports)) };
//#endregion
//#region node_modules/.pnpm/nitro-nightly@3.0.1-20260923-001540-22b17bb3/node_modules/nitro-nightly/dist/runtime/vite.mjs
function fetchViteEnv(viteEnvName, input, init) {
	const viteEnv = viteServices[viteEnvName];
	if (!viteEnv) throw HTTPError.status(404);
	return Promise.resolve(viteEnv.fetch(toRequest(input, init)));
}
//#endregion
//#region node_modules/.pnpm/nitro-nightly@3.0.1-20260923-001540-22b17bb3/node_modules/nitro-nightly/dist/runtime/internal/vite/ssr-renderer.mjs
/** @param {{ req: Request }} HTTPEvent */
function ssrRenderer({ req }) {
	return fetchViteEnv("ssr", req);
}
//#endregion
export { ssrRenderer as default };
