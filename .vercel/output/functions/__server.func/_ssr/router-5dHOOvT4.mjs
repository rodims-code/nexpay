import { __toESM } from "../_runtime.mjs";
import { HeadContent, Link, Scripts, createFileRoute, createRootRoute, createRouter, lazyRouteComponent, redirect, require_jsx_runtime, require_react, useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { __exportAll } from "./ssr.mjs";
import { TSS_SERVER_FUNCTION, createServerFn, getServerFnById } from "./ssr2.mjs";
import { auth, capitalizeFirstLetter, createFetch, defu, getBaseURL, isSafeUrlScheme, toKebabCase } from "./auth-CgLSap3w.mjs";
import { Bell, Calendar, ChevronDown, ChevronRight, CircleAlert, CircleCheck, CircleQuestionMark, CreditCard, Earth, House, LoaderCircle, LockKeyhole, LogOut, Mail, Menu, PenLine, Phone, RotateCcwClock, Send, Settings, ShieldCheck, UserRound, Users, X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-client-Cy7uHGeE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var PROTO_POLLUTION_PATTERNS = {
	proto: /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
	constructor: /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
	protoShort: /"__proto__"\s*:/,
	constructorShort: /"constructor"\s*:/
};
var JSON_SIGNATURE = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
var SPECIAL_VALUES = {
	true: true,
	false: false,
	null: null,
	undefined: void 0,
	nan: NaN,
	infinity: Number.POSITIVE_INFINITY,
	"-infinity": Number.NEGATIVE_INFINITY
};
var ISO_DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,7}))?(?:Z|([+-])(\d{2}):(\d{2}))$/;
function isValidDate(date) {
	return date instanceof Date && !isNaN(date.getTime());
}
function parseISODate(value) {
	const match = ISO_DATE_REGEX.exec(value);
	if (!match) return null;
	const [, year, month, day, hour, minute, second, ms, offsetSign, offsetHour, offsetMinute] = match;
	const date = new Date(Date.UTC(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10), parseInt(hour, 10), parseInt(minute, 10), parseInt(second, 10), ms ? parseInt(ms.padEnd(3, "0"), 10) : 0));
	if (offsetSign) {
		const offset = (parseInt(offsetHour, 10) * 60 + parseInt(offsetMinute, 10)) * (offsetSign === "+" ? -1 : 1);
		date.setUTCMinutes(date.getUTCMinutes() + offset);
	}
	return isValidDate(date) ? date : null;
}
function betterJSONParse(value, options = {}) {
	const { strict = false, warnings = false, reviver, parseDates = true } = options;
	if (typeof value !== "string") return value;
	const trimmed = value.trim();
	const lowerValue = trimmed.toLowerCase();
	if (lowerValue.length <= 9 && lowerValue in SPECIAL_VALUES) return SPECIAL_VALUES[lowerValue];
	if (!JSON_SIGNATURE.test(trimmed)) {
		if (strict) throw new SyntaxError("[better-json] Invalid JSON");
		return value;
	}
	if (Object.entries(PROTO_POLLUTION_PATTERNS).some(([key, pattern]) => {
		const matches = pattern.test(trimmed);
		if (matches && warnings) console.warn(`[better-json] Detected potential prototype pollution attempt using ${key} pattern`);
		return matches;
	}) && strict) throw new Error("[better-json] Potential prototype pollution attempt detected");
	try {
		const secureReviver = (key, value) => {
			if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
				if (warnings) console.warn(`[better-json] Dropping "${key}" key to prevent prototype pollution`);
				return;
			}
			if (parseDates && typeof value === "string") {
				const date = parseISODate(value);
				if (date) return date;
			}
			return reviver ? reviver(key, value) : value;
		};
		return JSON.parse(trimmed, secureReviver);
	} catch (error) {
		if (strict) throw error;
		return value;
	}
}
function parseJSON(value, options = { strict: true }) {
	return betterJSONParse(value, options);
}
var redirectPlugin = {
	id: "redirect",
	name: "Redirect",
	hooks: { onSuccess(context) {
		if (context.data?.url && context.data?.redirect && isSafeUrlScheme(context.data.url)) {
			if (typeof window !== "undefined" && window.location) {
				if (window.location) try {
					window.location.href = context.data.url;
				} catch {}
			}
		}
	} }
};
var listenerQueue = [];
var lqIndex = 0;
var batchSeen = null;
var QUEUE_ITEMS_PER_LISTENER = 4;
var nanostoresGlobal = globalThis.nanostoresGlobal ||= { epoch: 0 };
var drainQueue = () => {
	let thrown;
	let i;
	while (lqIndex < listenerQueue.length) {
		i = lqIndex;
		lqIndex += QUEUE_ITEMS_PER_LISTENER;
		try {
			listenerQueue[i](listenerQueue[i + 1].value, listenerQueue[i + 2], listenerQueue[i + 3]);
		} catch (e) {
			thrown = e;
		}
	}
	listenerQueue.length = lqIndex = 0;
	if (thrown) throw thrown;
};
var atom = /* @__NO_SIDE_EFFECTS__ */ (initialValue) => {
	let listeners = [];
	let $atom = {
		eq: Object.is,
		get() {
			if (!$atom.lc) $atom.listen(() => {})();
			return $atom.value;
		},
		init: initialValue,
		lc: 0,
		listen(listener) {
			$atom.lc = listeners.push(listener);
			return () => {
				for (let i = lqIndex; i < listenerQueue.length;) if (listenerQueue[i] === listener) listenerQueue.splice(i, QUEUE_ITEMS_PER_LISTENER);
				else i += QUEUE_ITEMS_PER_LISTENER;
				let index = listeners.indexOf(listener);
				if (~index) {
					listeners.splice(index, 1);
					if (!--$atom.lc) $atom.off();
				}
			};
		},
		notify(oldValue, changedKey) {
			nanostoresGlobal.epoch++;
			let runListenerQueue = !listenerQueue.length && !batchSeen;
			for (let listener of listeners) {
				if (batchSeen?.has(listener)) continue;
				batchSeen?.add(listener);
				listenerQueue.push(listener, $atom, oldValue, batchSeen ? void 0 : changedKey);
			}
			if (runListenerQueue) drainQueue();
		},
		off() {},
		set(newValue) {
			let oldValue = $atom.value;
			if (!$atom.eq(oldValue, newValue)) {
				$atom.value = newValue;
				$atom.notify(oldValue);
			}
		},
		subscribe(listener) {
			let unbind = $atom.listen(listener);
			listener($atom.value);
			return unbind;
		},
		value: initialValue
	};
	return $atom;
};
var SET = 2;
var MOUNT = 5;
var UNMOUNT = 6;
var REVERT_MUTATION = 10;
var on = (object, listener, eventKey, mutateStore) => {
	object.events = object.events || {};
	if (!object.events[eventKey + REVERT_MUTATION]) object.events[eventKey + REVERT_MUTATION] = mutateStore((eventProps) => {
		object.events[eventKey].reduceRight((event, l) => (l(event), event), {
			shared: {},
			...eventProps
		});
	});
	object.events[eventKey] = object.events[eventKey] || [];
	object.events[eventKey].push(listener);
	return () => {
		let currentListeners = object.events[eventKey];
		let index = currentListeners.indexOf(listener);
		if (~index) {
			currentListeners.splice(index, 1);
			if (!currentListeners.length) {
				object.events[eventKey + REVERT_MUTATION]();
				delete object.events[eventKey + REVERT_MUTATION];
			}
		}
	};
};
var onSet = ($store, listener) => on($store, listener, SET, (runListeners) => {
	let originSet = $store.set;
	let originSetKey = $store.setKey;
	if ($store.setKey) $store.setKey = (changed, changedValue) => {
		let isAborted;
		let abort = () => {
			isAborted = true;
		};
		runListeners({
			abort,
			changed,
			newValue: {
				...$store.value,
				[changed]: changedValue
			}
		});
		if (!isAborted) return originSetKey(changed, changedValue);
	};
	$store.set = (newValue) => {
		let isAborted;
		let abort = () => {
			isAborted = true;
		};
		runListeners({
			abort,
			newValue
		});
		if (!isAborted) return originSet(newValue);
	};
	return () => {
		$store.set = originSet;
		$store.setKey = originSetKey;
	};
});
var STORE_UNMOUNT_DELAY = 1e3;
var onMount = ($store, initialize) => {
	let listener = (payload) => {
		let destroy = initialize(payload);
		if (destroy) $store.events[UNMOUNT].push(destroy);
	};
	return on($store, listener, MOUNT, (runListeners) => {
		let originListen = $store.listen;
		$store.listen = (...args) => {
			if (!$store.lc && !$store.active) {
				$store.active = true;
				runListeners();
			}
			return originListen(...args);
		};
		let originOff = $store.off;
		$store.events[UNMOUNT] = [];
		$store.off = () => {
			originOff();
			setTimeout(() => {
				if ($store.active && !$store.lc) {
					$store.active = false;
					for (let destroy of $store.events[UNMOUNT]) destroy();
					$store.events[UNMOUNT] = [];
				}
			}, STORE_UNMOUNT_DELAY);
		};
		return () => {
			$store.listen = originListen;
			$store.off = originOff;
		};
	});
};
function getPath(obj, path) {
	let allKeys = getAllKeysFromPath(path);
	let res = obj;
	for (let key of allKeys) {
		if (res == null) return;
		res = res[key];
	}
	return res;
}
var ARRAY_INDEX = /(.*)\[(\d+)\]/;
function getAllKeysFromPath(path) {
	return path.split(".").flatMap((key) => getKeyAndIndicesFromKey(key));
}
function getKeyAndIndicesFromKey(key) {
	if (ARRAY_INDEX.test(key)) {
		let [, keyPart, index] = key.match(ARRAY_INDEX);
		return [...getKeyAndIndicesFromKey(keyPart), index];
	}
	return [key];
}
function listenKeys($store, keys, listener) {
	let keysSet = new Set(keys);
	return $store.listen((value, oldValue, changed) => {
		if (changed === void 0 ? keys.some((key) => oldValue === void 0 || value[key] !== oldValue[key] || getPath(value, key) !== getPath(oldValue, key)) : keysSet.has(changed) || keysSet.has(changed.split(/\.|\[/)[0])) listener(value, oldValue, changed);
	});
}
function isPlainObject(value) {
	if (typeof value !== "object" || value === null) return false;
	const prototype = Object.getPrototypeOf(value);
	return prototype === Object.prototype || prototype === null;
}
/**
* Deep structural equality for JSON-serializable values.
* Handles: primitives, null, arrays, and plain objects.
* Short-circuits on referential equality at every recursion level.
*/
function isJsonEqual(a, b) {
	if (a === b) return true;
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return false;
		for (let i = 0; i < a.length; i++) if (!isJsonEqual(a[i], b[i])) return false;
		return true;
	}
	if (isPlainObject(a) && isPlainObject(b)) {
		const keysA = Object.keys(a);
		const keysB = Object.keys(b);
		if (keysA.length !== keysB.length) return false;
		for (const key of keysA) if (!(key in b) || !isJsonEqual(a[key], b[key])) return false;
		return true;
	}
	return false;
}
/**
* Attach an equality gate to a nanostores atom via `onSet`.
* When `isEqual(currentValue, newValue)` returns true, the `set()` call
* is aborted: no listeners fire, no framework re-renders occur.
*
* Returns the unsubscribe function from `onSet`.
*/
function withEquality(store, isEqual) {
	return onSet(store, ({ newValue, abort }) => {
		if (isEqual(store.value, newValue)) abort();
	});
}
var kBroadcastChannel = Symbol.for("better-auth:broadcast-channel");
var now$1 = () => Math.floor(Date.now() / 1e3);
var WindowBroadcastChannel = class {
	listeners = /* @__PURE__ */ new Set();
	name;
	constructor(name = "better-auth.message") {
		this.name = name;
	}
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	post(message) {
		if (typeof window === "undefined") return;
		try {
			localStorage.setItem(this.name, JSON.stringify({
				...message,
				timestamp: now$1()
			}));
		} catch {}
	}
	setup() {
		if (typeof window === "undefined" || typeof window.addEventListener === "undefined") return () => {};
		const handler = (event) => {
			if (event.key !== this.name) return;
			const message = JSON.parse(event.newValue ?? "{}");
			if (message?.event !== "session" || !message?.data) return;
			this.listeners.forEach((listener) => listener(message));
		};
		window.addEventListener("storage", handler);
		return () => {
			window.removeEventListener("storage", handler);
		};
	}
};
function getGlobalBroadcastChannel(name = "better-auth.message") {
	if (!globalThis[kBroadcastChannel]) globalThis[kBroadcastChannel] = new WindowBroadcastChannel(name);
	return globalThis[kBroadcastChannel];
}
var kFocusManager = Symbol.for("better-auth:focus-manager");
var WindowFocusManager = class {
	listeners = /* @__PURE__ */ new Set();
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	setFocused(focused) {
		this.listeners.forEach((listener) => listener(focused));
	}
	setup() {
		if (typeof window === "undefined" || typeof document === "undefined" || typeof window.addEventListener === "undefined") return () => {};
		const visibilityHandler = () => {
			if (document.visibilityState === "visible") this.setFocused(true);
		};
		document.addEventListener("visibilitychange", visibilityHandler, false);
		return () => {
			document.removeEventListener("visibilitychange", visibilityHandler, false);
		};
	}
};
function getGlobalFocusManager() {
	if (!globalThis[kFocusManager]) globalThis[kFocusManager] = new WindowFocusManager();
	return globalThis[kFocusManager];
}
var kOnlineManager = Symbol.for("better-auth:online-manager");
var WindowOnlineManager = class {
	listeners = /* @__PURE__ */ new Set();
	isOnline = typeof navigator !== "undefined" ? navigator.onLine : true;
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	setOnline(online) {
		this.isOnline = online;
		this.listeners.forEach((listener) => listener(online));
	}
	setup() {
		if (typeof window === "undefined" || typeof window.addEventListener === "undefined") return () => {};
		const onOnline = () => this.setOnline(true);
		const onOffline = () => this.setOnline(false);
		window.addEventListener("online", onOnline, false);
		window.addEventListener("offline", onOffline, false);
		return () => {
			window.removeEventListener("online", onOnline, false);
			window.removeEventListener("offline", onOffline, false);
		};
	}
};
function getGlobalOnlineManager() {
	if (!globalThis[kOnlineManager]) globalThis[kOnlineManager] = new WindowOnlineManager();
	return globalThis[kOnlineManager];
}
var now = () => Math.floor(Date.now() / 1e3);
/**
* Rate limit: don't refetch on focus if a session request was made within this many seconds
*/
var FOCUS_REFETCH_RATE_LIMIT_SECONDS = 5;
function createSessionRefreshManager(opts) {
	const { fetchSession, shouldPollSession = () => true, sessionSignal, options = {} } = opts;
	const refetchInterval = options.sessionOptions?.refetchInterval ?? 0;
	const refetchOnWindowFocus = options.sessionOptions?.refetchOnWindowFocus ?? true;
	const refetchWhenOffline = options.sessionOptions?.refetchWhenOffline ?? false;
	const state = {
		isInitialized: false,
		lastSessionRequest: 0
	};
	const shouldRefetch = () => {
		return refetchWhenOffline || getGlobalOnlineManager().isOnline;
	};
	const triggerRefetch = (event) => {
		if (!shouldRefetch()) return;
		if (event?.event === "storage") {
			fetchSession();
			return;
		}
		if (event?.event === "poll") {
			state.lastSessionRequest = now();
			fetchSession();
			return;
		}
		if (event?.event === "visibilitychange") {
			if (now() - state.lastSessionRequest < FOCUS_REFETCH_RATE_LIMIT_SECONDS) return;
			state.lastSessionRequest = now();
			fetchSession();
			return;
		}
		fetchSession();
	};
	const broadcastSessionUpdate = (trigger) => {
		getGlobalBroadcastChannel().post({
			event: "session",
			data: { trigger },
			clientId: Math.random().toString(36).substring(7)
		});
	};
	const setupPolling = () => {
		if (refetchInterval && refetchInterval > 0) state.pollInterval = setInterval(() => {
			if (shouldPollSession()) triggerRefetch({ event: "poll" });
		}, refetchInterval * 1e3);
	};
	const setupBroadcast = () => {
		state.unsubscribeBroadcast = getGlobalBroadcastChannel().subscribe(() => {
			triggerRefetch({ event: "storage" });
		});
	};
	const setupFocusRefetch = () => {
		if (!refetchOnWindowFocus) return;
		state.unsubscribeFocus = getGlobalFocusManager().subscribe(() => {
			triggerRefetch({ event: "visibilitychange" });
		});
	};
	const setupOnlineRefetch = () => {
		state.unsubscribeOnline = getGlobalOnlineManager().subscribe((online) => {
			if (online) triggerRefetch({ event: "visibilitychange" });
		});
	};
	const setupSignalSubscription = () => {
		state.unsubscribeSignal = sessionSignal.listen(() => {
			fetchSession();
		});
	};
	const init = () => {
		if (state.isInitialized) return;
		state.isInitialized = true;
		setupPolling();
		setupBroadcast();
		setupFocusRefetch();
		setupOnlineRefetch();
		setupSignalSubscription();
		state.cleanupBroadcastSetup = getGlobalBroadcastChannel().setup();
		state.cleanupFocusSetup = getGlobalFocusManager().setup();
		state.cleanupOnlineSetup = getGlobalOnlineManager().setup();
	};
	const cleanup = () => {
		if (!state.isInitialized) return;
		if (state.pollInterval) {
			clearInterval(state.pollInterval);
			state.pollInterval = void 0;
		}
		if (state.unsubscribeBroadcast) {
			state.unsubscribeBroadcast();
			state.unsubscribeBroadcast = void 0;
		}
		if (state.unsubscribeFocus) {
			state.unsubscribeFocus();
			state.unsubscribeFocus = void 0;
		}
		if (state.unsubscribeOnline) {
			state.unsubscribeOnline();
			state.unsubscribeOnline = void 0;
		}
		if (state.unsubscribeSignal) {
			state.unsubscribeSignal();
			state.unsubscribeSignal = void 0;
		}
		if (state.cleanupBroadcastSetup) {
			state.cleanupBroadcastSetup();
			state.cleanupBroadcastSetup = void 0;
		}
		if (state.cleanupFocusSetup) {
			state.cleanupFocusSetup();
			state.cleanupFocusSetup = void 0;
		}
		if (state.cleanupOnlineSetup) {
			state.cleanupOnlineSetup();
			state.cleanupOnlineSetup = void 0;
		}
		state.isInitialized = false;
		state.lastSessionRequest = 0;
	};
	return {
		init,
		cleanup,
		triggerRefetch,
		broadcastSessionUpdate
	};
}
var isServer = () => typeof window === "undefined";
var SESSION_MOUNT_DEDUPE_INTERVAL = STORE_UNMOUNT_DELAY;
function hydrateSessionAtom(sessionAtom, session) {
	if (typeof window === "undefined") return;
	const currentSession = sessionAtom.get();
	if (currentSession.data !== null || session === null) return;
	sessionAtom.set({
		...currentSession,
		data: session,
		error: null,
		isPending: false
	});
}
/**
* Normalize $fetch response: `throw: true` returns data directly,
* otherwise `{ data, error }`.
*/
function normalizeSessionResponse(res) {
	if (typeof res === "object" && res !== null && "data" in res && "error" in res) return res;
	return {
		data: res,
		error: null
	};
}
function normalizeSessionData(data) {
	if (!data) return null;
	if (data.session === null && data.user === null) return null;
	return data;
}
function isSessionAtomEqual(a, b) {
	return isJsonEqual(a.data, b.data) && a.error === b.error && a.isPending === b.isPending && a.isRefetching === b.isRefetching && a.refetch === b.refetch;
}
function getSessionAtom($fetch, options) {
	const $signal = /* @__PURE__ */ atom(false);
	let flight;
	let freshUntil = 0;
	let sessionRevision = 0;
	$signal.listen(() => {
		sessionRevision++;
		freshUntil = 0;
	});
	const refetch = (queryParams) => fetchSession(queryParams);
	const session = /* @__PURE__ */ atom({
		data: null,
		error: null,
		isPending: true,
		isRefetching: false,
		refetch
	});
	withEquality(session, isSessionAtomEqual);
	const executeSessionFetch = async (signal, queryParams) => {
		const current = session.value;
		session.set({
			...current,
			isPending: current.data === null,
			isRefetching: true,
			error: null,
			refetch
		});
		if (signal.aborted) return "aborted";
		try {
			const res = await $fetch("/get-session", {
				method: "GET",
				query: queryParams?.query,
				signal
			});
			if (signal.aborted) return "aborted";
			let { data, error } = normalizeSessionResponse(res);
			let outcome = "fresh";
			if (data?.needsRefresh) try {
				const refreshRes = await $fetch("/get-session", {
					method: "POST",
					signal
				});
				if (signal.aborted) return "aborted";
				({data, error} = normalizeSessionResponse(refreshRes));
			} catch {
				if (signal.aborted) return "aborted";
				outcome = "stale";
			}
			if (error) {
				const latest = session.value;
				const isUnauthorized = error?.status === 401;
				session.set({
					data: isUnauthorized ? null : latest.data,
					error,
					isPending: false,
					isRefetching: false,
					refetch
				});
				return "failed";
			}
			const sessionData = normalizeSessionData(data);
			const current = session.value;
			const stableData = current.data != null && sessionData != null && isJsonEqual(current.data, sessionData) ? current.data : sessionData;
			session.set({
				data: stableData,
				error: null,
				isPending: false,
				isRefetching: false,
				refetch
			});
			return outcome;
		} catch (fetchError) {
			if (signal.aborted) return "aborted";
			const latest = session.value;
			session.set({
				data: latest.data,
				error: fetchError,
				isPending: false,
				isRefetching: false,
				refetch
			});
			return "failed";
		}
	};
	const getFreshUntil = () => {
		const expiresAt = session.value.data?.session?.expiresAt;
		const sessionExpiresAt = expiresAt instanceof Date ? expiresAt.getTime() : Number.POSITIVE_INFINITY;
		return Math.min(Date.now() + SESSION_MOUNT_DEDUPE_INTERVAL, sessionExpiresAt);
	};
	const fetchSession = (queryParams) => {
		freshUntil = 0;
		flight?.cancel();
		const controller = new AbortController();
		const request = {
			cancel: () => controller.abort(),
			promise: Promise.resolve().then(() => {
				if (controller.signal.aborted) return "aborted";
				return executeSessionFetch(controller.signal, queryParams);
			}),
			revision: sessionRevision
		};
		flight = request;
		const settleFlight = (outcome) => {
			if (flight !== request) return;
			flight = void 0;
			if (outcome === "fresh" && request.revision === sessionRevision) freshUntil = getFreshUntil();
		};
		request.promise.then(settleFlight, () => settleFlight("failed"));
		return request.promise.then(() => void 0);
	};
	const fetchSessionOnMount = () => {
		if (flight?.revision === sessionRevision) return flight.promise.then(() => void 0);
		if (Date.now() < freshUntil) return Promise.resolve();
		return fetchSession();
	};
	let broadcastSessionUpdate = () => {};
	onMount(session, () => {
		let timeoutId;
		if (!isServer()) timeoutId = setTimeout(() => {
			fetchSessionOnMount();
		}, 0);
		const refreshManager = createSessionRefreshManager({
			fetchSession,
			shouldPollSession: () => session.value.data != null,
			sessionSignal: $signal,
			options
		});
		refreshManager.init();
		broadcastSessionUpdate = refreshManager.broadcastSessionUpdate;
		return () => {
			if (timeoutId) clearTimeout(timeoutId);
			refreshManager.cleanup();
		};
	});
	return {
		session,
		$sessionSignal: $signal,
		broadcastSessionUpdate: (trigger) => broadcastSessionUpdate(trigger)
	};
}
var resolvePublicAuthUrl = (basePath) => {
	if (typeof process === "undefined") return void 0;
	const path = basePath ?? "/api/auth";
	if (process.env.NEXT_PUBLIC_AUTH_URL) return process.env.NEXT_PUBLIC_AUTH_URL;
	if (typeof window === "undefined") {
		if (process.env.NEXTAUTH_URL) try {
			return process.env.NEXTAUTH_URL;
		} catch {}
		if (process.env.VERCEL_URL) try {
			const protocol = process.env.VERCEL_URL.startsWith("http") ? "" : "https://";
			return `${new URL(`${protocol}${process.env.VERCEL_URL}`).origin}${path}`;
		} catch {}
	}
};
var getClientConfig = (options, loadEnv) => {
	const isCredentialsSupported = "credentials" in Request.prototype;
	const baseURL = getBaseURL(options?.baseURL, options?.basePath, void 0, loadEnv) ?? resolvePublicAuthUrl(options?.basePath) ?? "/api/auth";
	const pluginsFetchPlugins = options?.plugins?.flatMap((plugin) => plugin.fetchPlugins).filter((pl) => pl !== void 0) || [];
	const lifeCyclePlugin = {
		id: "lifecycle-hooks",
		name: "lifecycle-hooks",
		hooks: {
			onSuccess: options?.fetchOptions?.onSuccess,
			onError: options?.fetchOptions?.onError,
			onRequest: options?.fetchOptions?.onRequest,
			onResponse: options?.fetchOptions?.onResponse
		}
	};
	const { onSuccess: _onSuccess, onError: _onError, onRequest: _onRequest, onResponse: _onResponse, ...restOfFetchOptions } = options?.fetchOptions || {};
	const $fetch = createFetch({
		baseURL,
		...isCredentialsSupported ? { credentials: "include" } : {},
		method: "GET",
		jsonParser(text) {
			if (!text) return null;
			return parseJSON(text, { strict: false });
		},
		customFetchImpl: fetch,
		...restOfFetchOptions,
		plugins: [
			lifeCyclePlugin,
			...restOfFetchOptions.plugins || [],
			...options?.disableDefaultFetchPlugins ? [] : [redirectPlugin],
			...pluginsFetchPlugins
		]
	});
	const { $sessionSignal, session, broadcastSessionUpdate } = getSessionAtom($fetch, options);
	let hasHydrated = false;
	const hydrateSession = (sessionData) => {
		if (hasHydrated || sessionData === null) return;
		hasHydrated = true;
		hydrateSessionAtom(session, sessionData);
	};
	const plugins = options?.plugins || [];
	let pluginsActions = {};
	const pluginsAtoms = {
		$sessionSignal,
		session
	};
	const pluginPathMethods = {
		"/sign-out": "POST",
		"/revoke-sessions": "POST",
		"/revoke-other-sessions": "POST",
		"/delete-user": "POST"
	};
	const atomListeners = [{
		signal: "$sessionSignal",
		matcher(path) {
			return path === "/sign-out" || path === "/update-user" || path === "/update-session" || path === "/sign-up/email" || path === "/sign-in/email" || path === "/delete-user" || path === "/verify-email" || path === "/revoke-sessions" || path === "/revoke-session" || path === "/revoke-other-sessions" || path === "/change-email" || path === "/change-password";
		},
		callback(path) {
			if (path === "/sign-out") broadcastSessionUpdate("signout");
			else if (path === "/update-user" || path === "/update-session") broadcastSessionUpdate("updateUser");
		}
	}];
	for (const plugin of plugins) {
		if (plugin.getAtoms) Object.assign(pluginsAtoms, plugin.getAtoms?.($fetch));
		if (plugin.pathMethods) Object.assign(pluginPathMethods, plugin.pathMethods);
		if (plugin.atomListeners) atomListeners.push(...plugin.atomListeners);
	}
	const $store = {
		notify: (signal) => {
			pluginsAtoms[signal].set(!pluginsAtoms[signal].get());
		},
		listen: (signal, listener) => {
			pluginsAtoms[signal].subscribe(listener);
		},
		atoms: pluginsAtoms
	};
	for (const plugin of plugins) if (plugin.getActions) pluginsActions = defu(plugin.getActions?.($fetch, $store, options) ?? {}, pluginsActions);
	return {
		get baseURL() {
			return baseURL;
		},
		pluginsActions,
		pluginsAtoms,
		pluginPathMethods,
		atomListeners,
		hydrateSession,
		$fetch,
		$store
	};
};
function isAtom(value) {
	return typeof value === "object" && value !== null && "get" in value && typeof value.get === "function" && "lc" in value && typeof value.lc === "number";
}
function getMethod(path, knownPathMethods, args) {
	const method = knownPathMethods[path];
	const { fetchOptions, query: _query, ...body } = args || {};
	if (method) return method;
	if (fetchOptions?.method) return fetchOptions.method;
	if (body && Object.keys(body).length > 0) return "POST";
	return "GET";
}
function createDynamicPathProxy(routes, client, knownPathMethods, atoms, atomListeners) {
	function createProxy(path = []) {
		return new Proxy(function() {}, {
			get(_, prop) {
				if (typeof prop !== "string") return;
				if (prop === "then" || prop === "catch" || prop === "finally") return;
				const fullPath = [...path, prop];
				let current = routes;
				for (const segment of fullPath) if (current && typeof current === "object" && segment in current) current = current[segment];
				else {
					current = void 0;
					break;
				}
				if (typeof current === "function") return current;
				if (isAtom(current)) return current;
				return createProxy(fullPath);
			},
			apply: async (_, __, args) => {
				const routePath = "/" + path.map(toKebabCase).join("/");
				const arg = args[0] || {};
				const fetchOptions = args[1] || {};
				const { query, fetchOptions: argFetchOptions, ...body } = arg;
				const options = {
					...fetchOptions,
					...argFetchOptions
				};
				const method = getMethod(routePath, knownPathMethods, arg);
				return await client(routePath, {
					...options,
					body: method === "GET" ? void 0 : {
						...body,
						...options?.body || {}
					},
					query: query || options?.query,
					method,
					async onSuccess(context) {
						await options?.onSuccess?.(context);
						if (!atomListeners || options.disableSignal) return;
						/**
						* We trigger listeners
						*/
						const matches = atomListeners.filter((s) => s.matcher(routePath));
						if (!matches.length) return;
						const visited = /* @__PURE__ */ new Set();
						for (const match of matches) {
							const signal = atoms[match.signal];
							if (!signal) return;
							if (visited.has(match.signal)) continue;
							visited.add(match.signal);
							/**
							* To avoid race conditions we set the signal in a setTimeout
							*/
							const val = signal.get();
							setTimeout(() => {
								signal.set(!val);
							}, 10);
							match.callback?.(routePath);
						}
					}
				});
			}
		});
	}
	return createProxy();
}
/**
* Subscribe to store changes and get store's value.
*
* Can be used with store builder too.
*
* ```js
* import { useStore } from 'nanostores/react'
*
* import { router } from '../store/router'
*
* export const Layout = () => {
*   let page = useStore(router)
*   if (page.route === 'home') {
*     return <HomePage />
*   } else {
*     return <Error404 />
*   }
* }
* ```
*
* @param store Store instance.
* @returns Store value.
*/
function useStore(store, options = {}) {
	const snapshotRef = (0, import_react.useRef)(store.get());
	const { keys, deps = [store, keys] } = options;
	const subscribe = (0, import_react.useCallback)((onChange) => {
		const emitChange = (value) => {
			if (snapshotRef.current === value) return;
			snapshotRef.current = value;
			onChange();
		};
		emitChange(store.value);
		if (keys?.length) return listenKeys(store, keys, emitChange);
		return store.listen(emitChange);
	}, deps);
	const get = () => snapshotRef.current;
	return (0, import_react.useSyncExternalStore)(subscribe, get, get);
}
function getAtomKey(str) {
	return `use${capitalizeFirstLetter(str)}`;
}
function createAuthClient(options) {
	const { pluginPathMethods, pluginsActions, pluginsAtoms, hydrateSession, $fetch, $store, atomListeners } = getClientConfig(options);
	const resolvedHooks = {};
	for (const [key, value] of Object.entries(pluginsAtoms)) resolvedHooks[getAtomKey(key)] = () => useStore(value);
	return createDynamicPathProxy({
		...pluginsActions,
		...resolvedHooks,
		hydrateSession,
		$fetch,
		$store
	}, $fetch, pluginPathMethods, pluginsAtoms, atomListeners);
}
var authClient = createAuthClient({ baseURL: typeof window !== "undefined" ? window.location.origin : process.env.APP_URL ?? "http://localhost:3000" });
var { useSession, signIn, signOut, signUp } = authClient;
function phoneLoginEmail(phone) {
	return `${phone.replace(/\D/g, "")}@phone.nexpay.invalid`;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-5dHOOvT4.js
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BLL-5uJ2.css";
var Route$20 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Nexpay | Infrastructure de paiement pour l’Afrique" },
			{
				name: "description",
				content: "Nexpay orchestre les paiements, les paiements sortants et la réconciliation pour les équipes qui opèrent à travers l’Afrique."
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	shellComponent: RootDocument
});
function RootDocument({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "fr",
		"data-theme": "bumblebee",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
var $$splitComponentImporter$17 = () => import("./routes-CmRyTySl.mjs");
var Route$19 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getSession = createServerFn({ method: "GET" }).handler(createSsrRpc("753fb13391a5b0328ea3344426a11caf1f07e6f28fcdc91937757498d31af961"));
var $$splitComponentImporter$16 = () => import("./dashboard-BqxO3Y7V.mjs");
var Route$18 = createFileRoute("/dashboard")({
	beforeLoad: async () => {
		if (!await getSession()) throw redirect({ to: "/auth/login" });
	},
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./forgot-password-CTDUdf0O.mjs");
var Route$17 = createFileRoute("/forgot-password")({
	beforeLoad: () => {
		throw redirect({ to: "/auth/forgot-password" });
	},
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./login-BH6-GzYA.mjs");
var Route$16 = createFileRoute("/login")({
	beforeLoad: () => {
		throw redirect({ to: "/auth/login" });
	},
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./register-skrkfMRA.mjs");
var Route$15 = createFileRoute("/register")({
	beforeLoad: () => {
		throw redirect({ to: "/auth/register" });
	},
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./register-CzRZDXUX.mjs");
var Route$14 = createFileRoute("/auth/register")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./dashboard-DQN4Wn4o.mjs");
var Route$13 = createFileRoute("/dashboard/")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./contacts-BKBJ7n-D.mjs");
var Route$12 = createFileRoute("/dashboard/contacts")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./payment-methods-BRf_c0Y2.mjs");
var Route$11 = createFileRoute("/dashboard/payment-methods")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./send-D3neurUf.mjs");
var Route$10 = createFileRoute("/dashboard/send")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var navItems = [
	{
		label: "Vue d’ensemble",
		to: "/dashboard",
		icon: House
	},
	{
		label: "Envoyer de l’argent",
		to: "/dashboard/send",
		icon: Send
	},
	{
		label: "Transactions",
		to: "/dashboard/transactions",
		icon: RotateCcwClock
	},
	{
		label: "Contacts",
		to: "/dashboard/contacts",
		icon: Users
	}
];
var manageItems = [{
	label: "Moyens de paiement",
	to: "/dashboard/payment-methods",
	icon: CreditCard
}, {
	label: "Paramètres",
	to: "/dashboard/settings",
	icon: Settings
}];
function DashboardLayout({ children, title, eyebrow }) {
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const location = useLocation();
	const { data: session } = useSession();
	const userName = session?.user?.name || "Mon Compte";
	const displayName = (session?.user)?.firstName || userName.split(" ")[0] || "Utilisateur";
	const initials = userName.split(" ").filter(Boolean).map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "NP";
	const handleSignOut = async () => {
		await signOut({ fetchOptions: { onSuccess: () => {
			window.location.href = "/auth/login";
		} } });
	};
	const links = (items) => items.map(({ label, to, icon: Icon }) => {
		const active = location.pathname === to || to !== "/dashboard" && location.pathname.startsWith(to);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to,
			onClick: () => setMobileOpen(false),
			className: `gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${active ? "bg-primary text-primary-content shadow-lg shadow-primary/20" : "text-base-content/60 hover:bg-base-200 hover:text-base-content"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "size-[18px]",
				strokeWidth: 2.2
			}), label]
		}) }, to);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-screen overflow-hidden p-3 sm:p-5 lg:p-7",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-full max-w-[1500px] gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: `fixed inset-y-3 left-3 z-50 flex w-[280px] flex-col rounded-[2rem] border border-base-300/70 bg-base-100 p-5 shadow-xl shadow-base-content/5 transition-transform sm:inset-y-5 sm:left-5 lg:static lg:translate-x-0 lg:shadow-lg ${mobileOpen ? "translate-x-0" : "-translate-x-[115%]"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-8 flex items-center justify-between px-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/dashboard",
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/images/nexpay-icon.png",
									alt: "NexPay",
									className: "size-11"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-lg font-bold tracking-tight",
									children: "NexPay"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-extrabold uppercase tracking-[0.18em] text-base-content/40",
									children: "Move money simply"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn btn-ghost btn-sm btn-square lg:hidden",
								onClick: () => setMobileOpen(false),
								"aria-label": "Fermer le menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 px-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-base-content/35",
							children: "Menu principal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "menu gap-1 p-0",
							children: links(navItems)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 mt-8 px-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-base-content/35",
							children: "Gérer"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "menu gap-1 p-0",
							children: links(manageItems)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-auto rounded-3xl bg-base-200/70 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-2 flex items-center gap-2 text-sm font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "size-4 text-primary" }), " Besoin d’aide ?"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-3 text-xs leading-relaxed text-base-content/50",
									children: "Notre équipe est disponible pour vous accompagner."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn btn-outline btn-primary btn-xs rounded-full",
									children: "Centre d’aide"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleSignOut,
							className: "mt-4 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-base-content/55 transition hover:bg-error/10 hover:text-error",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-[18px]" }), " Se déconnecter"]
						})
					]
				}),
				mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "fixed inset-0 z-40 bg-base-content/20 backdrop-blur-sm lg:hidden",
					onClick: () => setMobileOpen(false),
					"aria-label": "Fermer le menu"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[2rem] border border-base-300/60 bg-base-100/80 shadow-xl shadow-base-content/5 backdrop-blur-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex min-h-[92px] shrink-0 items-center justify-between gap-4 border-b border-base-200/80 px-5 sm:px-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn btn-ghost btn-square lg:hidden",
								onClick: () => setMobileOpen(true),
								"aria-label": "Ouvrir le menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-extrabold uppercase tracking-[0.18em] text-primary",
								children: eyebrow ?? "Espace personnel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-2xl font-bold tracking-tight sm:text-3xl",
								children: title
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 sm:gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "btn btn-ghost btn-circle relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-2 top-2 size-2 rounded-full bg-secondary ring-2 ring-base-100" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden h-8 w-px bg-base-300 sm:block" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "dropdown dropdown-end",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "flex items-center gap-2 rounded-full p-1 pr-2 hover:bg-base-200",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "avatar placeholder",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "w-9 rounded-full bg-primary text-xs font-extrabold text-primary-content",
													children: initials
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hidden text-sm font-bold sm:inline",
												children: displayName
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 text-base-content/50" })
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
										className: "menu dropdown-content z-[1] mt-3 w-56 rounded-2xl border border-base-200 bg-base-100 p-2 shadow-xl",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "px-4 py-2 border-b border-base-200/60 mb-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-base-content text-sm truncate block p-0",
													children: userName
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-base-content/50 font-normal truncate block p-0",
													children: (session?.user)?.phone || session?.user?.email || "Compte vérifié"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/dashboard/settings",
												className: "font-medium",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-4" }), " Mon profil & paramètres"]
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: handleSignOut,
												className: "text-error font-medium",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), " Se déconnecter"]
											}) })
										]
									})]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "min-h-0 flex-1 overflow-y-auto p-5 sm:p-8",
						children
					})]
				})
			]
		})
	});
}
function SectionTitle({ children, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4 flex items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg font-bold",
			children
		}), action]
	});
}
var getUserProfile = createServerFn({ method: "GET" }).handler(createSsrRpc("af5d3ae08facf078bb6074fd53165549a73a36a7ac99d524928721375dc224d4"));
var updateUserProfile = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("e6b4c2156f69930488e9d0032986979bdb013fe3adabe0de1ac32537913ec766"));
var Route$9 = createFileRoute("/dashboard/settings")({ component: SettingsPage });
var COUNTRIES = [
	{
		code: "CG",
		name: "Congo-Brazzaville",
		currency: "XAF",
		flag: "🇨🇬"
	},
	{
		code: "SN",
		name: "Sénégal",
		currency: "XOF",
		flag: "🇸🇳"
	},
	{
		code: "CI",
		name: "Côte d’Ivoire",
		currency: "XOF",
		flag: "🇨🇮"
	},
	{
		code: "CD",
		name: "RDC (Congo-Kinshasa)",
		currency: "CDF",
		flag: "🇨🇩"
	},
	{
		code: "CM",
		name: "Cameroun",
		currency: "XAF",
		flag: "🇨🇲"
	},
	{
		code: "GA",
		name: "Gabon",
		currency: "XAF",
		flag: "🇬🇦"
	}
];
function SettingsPage() {
	const { data: session } = useSession();
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [isEditOpen, setIsEditOpen] = (0, import_react.useState)(false);
	const [editTab, setEditTab] = (0, import_react.useState)("profile");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [successMsg, setSuccessMsg] = (0, import_react.useState)(null);
	const [errorMsg, setErrorMsg] = (0, import_react.useState)(null);
	const [firstName, setFirstName] = (0, import_react.useState)("");
	const [lastName, setLastName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [birthDate, setBirthDate] = (0, import_react.useState)("");
	const [countryCode, setCountryCode] = (0, import_react.useState)("CG");
	const [currency, setCurrency] = (0, import_react.useState)("XAF");
	const showNotification = (success, error) => {
		if (success) {
			setSuccessMsg(success);
			setTimeout(() => setSuccessMsg(null), 4e3);
		}
		if (error) {
			setErrorMsg(error);
			setTimeout(() => setErrorMsg(null), 5e3);
		}
	};
	const loadProfile = async () => {
		try {
			setLoading(true);
			const data = await getUserProfile();
			setProfile(data);
			setFirstName(data.firstName || "");
			setLastName(data.lastName || "");
			setPhone(data.phone || "");
			setBirthDate(data.birthDate || "");
			setCountryCode(data.countryCode || "CG");
			setCurrency(data.currency || "XAF");
		} catch (err) {
			console.error(err);
			if (session?.user) {
				const u = session.user;
				const fallback = {
					id: u.id,
					name: u.name,
					firstName: u.firstName || u.name?.split(" ")[0] || "",
					lastName: u.lastName || u.name?.split(" ").slice(1).join(" ") || "",
					phone: u.phone || "",
					email: u.email || "",
					birthDate: u.birthDate || "",
					countryCode: u.countryCode || "CG",
					currency: u.currency || "XAF"
				};
				setProfile(fallback);
				setFirstName(fallback.firstName);
				setLastName(fallback.lastName);
				setPhone(fallback.phone);
				setBirthDate(fallback.birthDate);
				setCountryCode(fallback.countryCode);
				setCurrency(fallback.currency);
			}
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadProfile();
	}, [session?.user?.id]);
	const handleCountryChange = (cCode) => {
		const c = COUNTRIES.find((item) => item.code === cCode);
		setCountryCode(cCode);
		if (c) setCurrency(c.currency);
	};
	const handleSave = async (e) => {
		e.preventDefault();
		if (!firstName.trim() || !lastName.trim()) {
			showNotification(void 0, "Le prénom et le nom sont obligatoires");
			return;
		}
		if (!phone.trim()) {
			showNotification(void 0, "Le numéro de téléphone est obligatoire");
			return;
		}
		try {
			setSubmitting(true);
			const updated = await updateUserProfile({ data: {
				firstName: firstName.trim(),
				lastName: lastName.trim(),
				phone: phone.trim(),
				birthDate: birthDate.trim(),
				countryCode: countryCode.trim(),
				currency: currency.trim()
			} });
			setProfile(updated);
			showNotification("Vos informations ont été mises à jour avec succès !");
			setIsEditOpen(false);
		} catch (err) {
			showNotification(void 0, err.message || "Erreur lors de la mise à jour");
		} finally {
			setSubmitting(false);
		}
	};
	const handleSignOut = async () => {
		await signOut({ fetchOptions: { onSuccess: () => {
			window.location.href = "/auth/login";
		} } });
	};
	const displayName = profile?.name || session?.user?.name || "Utilisateur";
	const displayPhone = profile?.phone || (session?.user)?.phone || "";
	const displayEmail = profile?.email || session?.user?.email || "";
	const displayCountry = COUNTRIES.find((c) => c.code === (profile?.countryCode || "CG"))?.name || "Congo-Brazzaville";
	const displayCurrency = profile?.currency || "XAF";
	const initials = displayName.split(" ").filter(Boolean).map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "NP";
	const settingsGroups = [
		{
			icon: UserRound,
			title: "Informations personnelles",
			text: `${displayName} · ${displayPhone || displayEmail}`,
			action: () => {
				setEditTab("profile");
				setIsEditOpen(true);
			}
		},
		{
			icon: Earth,
			title: "Pays et devise de transfert",
			text: `${displayCountry} · ${displayCurrency}`,
			action: () => {
				setEditTab("country");
				setIsEditOpen(true);
			}
		},
		{
			icon: LockKeyhole,
			title: "Sécurité et code secret",
			text: "PIN de transfert, mot de passe et sessions actives",
			action: () => {
				showNotification("Votre session est chiffrée de bout en bout et protégée par votre code PIN.");
			}
		},
		{
			icon: Bell,
			title: "Notifications et alertes SMS",
			text: "Alertes instantanées à chaque envoi ou réception de fonds",
			action: () => {
				showNotification("Les notifications SMS sont automatiquement activées sur votre numéro principal.");
			}
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardLayout, {
		title: "Paramètres",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl space-y-6 pb-12",
			children: [
				successMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "alert alert-success rounded-2xl text-sm font-semibold text-white shadow-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: successMsg })]
				}),
				errorMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "alert alert-error rounded-2xl text-sm font-semibold text-white shadow-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: errorMsg })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-5 rounded-[2.5rem] bg-primary p-6 text-primary-content shadow-xl shadow-primary/20 sm:flex-row sm:items-center sm:justify-between sm:p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "avatar placeholder",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-16 items-center justify-center rounded-2xl bg-white/20 text-2xl font-black backdrop-blur-sm",
								children: initials
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-bold tracking-tight sm:text-2xl",
							children: displayName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex flex-wrap items-center gap-2 text-xs font-semibold text-primary-content/85 sm:text-sm",
							children: [
								displayPhone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3.5" }),
										" ",
										displayPhone
									]
								}),
								displayPhone && displayEmail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
								displayEmail && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3.5" }),
										" ",
										displayEmail
									]
								})
							]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 self-start sm:self-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setEditTab("profile");
								setIsEditOpen(true);
							},
							className: "btn btn-sm rounded-xl border-white/20 bg-white/15 text-white hover:bg-white/25 gap-1.5 font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-3.5" }), " Modifier"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-1.5 rounded-xl bg-white/20 px-3 py-1.5 text-xs font-bold backdrop-blur-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-emerald-300" }), "Vérifié"]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-base-200 bg-base-100 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-extrabold uppercase tracking-wider text-base-content/50",
								children: "Prénom & Nom"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-bold text-sm text-base-content truncate",
								children: profile?.firstName ? `${profile.firstName} ${profile.lastName}` : displayName
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-base-200 bg-base-100 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-extrabold uppercase tracking-wider text-base-content/50",
								children: "Date de naissance"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-bold text-sm text-base-content",
								children: profile?.birthDate || "Non renseignée"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-base-200 bg-base-100 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-extrabold uppercase tracking-wider text-base-content/50",
								children: "Pays & Devise"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-bold text-sm text-base-content",
								children: [
									displayCountry,
									" (",
									displayCurrency,
									")"
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-3xl border border-primary/20 bg-primary/5 p-5 text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mt-0.5 size-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-bold text-base-content",
							children: "Statut du compte · Passerelle directe NexPay"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs leading-relaxed text-base-content/70",
							children: "Vos informations d’identité permettent de vous authentifier auprès des opérateurs partenaires (MTN MoMo, Airtel Money, etc.). Aucun dépôt bancaire n’est immobilisé sur NexPay."
						})] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "overflow-hidden rounded-[2.5rem] border border-base-200 bg-base-100 shadow-sm",
					children: settingsGroups.map(({ icon: Icon, title, text, action }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: action,
						className: "flex w-full items-center gap-4 border-b border-base-200 p-5 text-left transition last:border-0 hover:bg-base-200/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-12 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold text-base-content text-sm sm:text-base",
									children: title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs text-base-content/55 sm:text-sm",
									children: text
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5 shrink-0 text-base-content/30" })
						]
					}, title))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleSignOut,
						type: "button",
						className: "btn btn-outline btn-error w-full rounded-2xl gap-2 font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), " Se déconnecter de la session"]
					})
				}),
				isEditOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[2.5rem] border border-base-200 bg-base-100 p-6 shadow-2xl sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIsEditOpen(false),
								className: "btn btn-ghost btn-sm btn-square absolute right-5 top-5 rounded-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl font-bold text-base-content",
									children: "Modifier mes informations"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-base-content/60 mt-1",
									children: "Mettez à jour vos données d’identité et vos préférences de pays."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-5 flex rounded-2xl bg-base-200 p-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setEditTab("profile"),
									className: `flex-1 rounded-xl py-2 text-xs font-bold transition ${editTab === "profile" ? "bg-base-100 text-primary shadow-sm" : "text-base-content/60 hover:text-base-content"}`,
									children: "Identité & Contact"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setEditTab("country"),
									className: `flex-1 rounded-xl py-2 text-xs font-bold transition ${editTab === "country" ? "bg-base-100 text-primary shadow-sm" : "text-base-content/60 hover:text-base-content"}`,
									children: "Pays & Devise"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleSave,
								className: "space-y-4",
								children: [editTab === "profile" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-3 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70",
											children: "Prénom"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: firstName,
											onChange: (e) => setFirstName(e.target.value),
											placeholder: "Votre prénom",
											required: true,
											className: "input input-bordered w-full rounded-2xl text-sm font-medium"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70",
											children: "Nom de famille"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: lastName,
											onChange: (e) => setLastName(e.target.value),
											placeholder: "Votre nom",
											required: true,
											className: "input input-bordered w-full rounded-2xl text-sm font-medium"
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70",
										children: "Numéro de téléphone principal"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-base-content/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "tel",
											value: phone,
											onChange: (e) => setPhone(e.target.value),
											placeholder: "+242 06 123 45 67",
											required: true,
											className: "input input-bordered w-full rounded-2xl pl-10 text-sm font-medium"
										})]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70",
										children: "Date de naissance"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-base-content/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "date",
											value: birthDate,
											onChange: (e) => setBirthDate(e.target.value),
											className: "input input-bordered w-full rounded-2xl pl-10 text-sm font-medium"
										})]
									})] })
								] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70",
									children: "Pays de résidence"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-2 sm:grid-cols-2",
									children: COUNTRIES.map((c) => {
										const isSelected = countryCode === c.code;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => handleCountryChange(c.code),
											className: `flex items-center gap-2.5 rounded-2xl border p-3 text-left transition ${isSelected ? "border-primary bg-primary/10 ring-2 ring-primary/20" : "border-base-200 hover:bg-base-200/50"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xl",
												children: c.flag
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0 flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "truncate text-xs font-bold text-base-content",
													children: c.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[10px] text-base-content/50",
													children: ["Devise: ", c.currency]
												})]
											})]
										}, c.code);
									})
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-1.5 block text-xs font-bold uppercase tracking-wider text-base-content/70",
									children: "Devise de compte"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: currency,
									onChange: (e) => setCurrency(e.target.value.toUpperCase()),
									placeholder: "XAF",
									className: "input input-bordered w-full rounded-2xl text-sm font-bold uppercase"
								})] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2.5 pt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setIsEditOpen(false),
										className: "btn btn-ghost flex-1 rounded-2xl",
										children: "Annuler"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: submitting,
										className: "btn btn-primary flex-1 rounded-2xl font-bold",
										children: submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : "Enregistrer les modifications"
									})]
								})]
							})
						]
					})
				})
			]
		})
	});
}
var $$splitComponentImporter$7 = () => import("./transactions-Fo2Fojqg.mjs");
var Route$8 = createFileRoute("/dashboard/transactions")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var Route$7 = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var $$splitComponentImporter$6 = () => import("./forgot-password-DrkozIpa.mjs");
var Route$6 = createFileRoute("/auth/forgot-password/")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./login-CoIHKsAy.mjs");
var Route$5 = createFileRoute("/auth/login/")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./register-S5P7Arnr.mjs");
var Route$4 = createFileRoute("/auth/register/")({
	beforeLoad: () => {
		throw redirect({ to: "/auth/register/phone" });
	},
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./country-BTjfqP0L.mjs");
var Route$3 = createFileRoute("/auth/register/country")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./personal-C3xH-oE8.mjs");
var Route$2 = createFileRoute("/auth/register/personal")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./phone-D_kEU-2R.mjs");
var Route$1 = createFileRoute("/auth/register/phone")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./security-D2hfRe28.mjs");
var Route = createFileRoute("/auth/register/security")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$19.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$20
});
var DashboardRoute = Route$18.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$20
});
var ForgotPasswordRoute = Route$17.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$20
});
var LoginRoute = Route$16.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$20
});
var RegisterRoute = Route$15.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$20
});
var AuthRegisterRoute = Route$14.update({
	id: "/auth/register",
	path: "/auth/register",
	getParentRoute: () => Route$20
});
var DashboardIndexRoute = Route$13.update({
	id: "/",
	path: "/",
	getParentRoute: () => DashboardRoute
});
var DashboardContactsRoute = Route$12.update({
	id: "/contacts",
	path: "/contacts",
	getParentRoute: () => DashboardRoute
});
var DashboardPaymentMethodsRoute = Route$11.update({
	id: "/payment-methods",
	path: "/payment-methods",
	getParentRoute: () => DashboardRoute
});
var DashboardSendRoute = Route$10.update({
	id: "/send",
	path: "/send",
	getParentRoute: () => DashboardRoute
});
var DashboardSettingsRoute = Route$9.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => DashboardRoute
});
var DashboardTransactionsRoute = Route$8.update({
	id: "/transactions",
	path: "/transactions",
	getParentRoute: () => DashboardRoute
});
var ApiAuthSplatRoute = Route$7.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$20
});
var AuthForgotPasswordIndexRoute = Route$6.update({
	id: "/auth/forgot-password/",
	path: "/auth/forgot-password/",
	getParentRoute: () => Route$20
});
var AuthLoginIndexRoute = Route$5.update({
	id: "/auth/login/",
	path: "/auth/login/",
	getParentRoute: () => Route$20
});
var AuthRegisterIndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthRegisterRoute
});
var AuthRegisterCountryRoute = Route$3.update({
	id: "/country",
	path: "/country",
	getParentRoute: () => AuthRegisterRoute
});
var AuthRegisterPersonalRoute = Route$2.update({
	id: "/personal",
	path: "/personal",
	getParentRoute: () => AuthRegisterRoute
});
var AuthRegisterPhoneRoute = Route$1.update({
	id: "/phone",
	path: "/phone",
	getParentRoute: () => AuthRegisterRoute
});
var AuthRegisterSecurityRoute = Route.update({
	id: "/security",
	path: "/security",
	getParentRoute: () => AuthRegisterRoute
});
var DashboardRouteChildren = {
	DashboardContactsRoute,
	DashboardPaymentMethodsRoute,
	DashboardSendRoute,
	DashboardSettingsRoute,
	DashboardTransactionsRoute,
	DashboardIndexRoute
};
var DashboardRouteWithChildren = DashboardRoute._addFileChildren(DashboardRouteChildren);
var AuthRegisterRouteChildren = {
	AuthRegisterCountryRoute,
	AuthRegisterPersonalRoute,
	AuthRegisterPhoneRoute,
	AuthRegisterSecurityRoute,
	AuthRegisterIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	DashboardRoute: DashboardRouteWithChildren,
	ForgotPasswordRoute,
	LoginRoute,
	RegisterRoute,
	AuthRegisterRoute: AuthRegisterRoute._addFileChildren(AuthRegisterRouteChildren),
	ApiAuthSplatRoute,
	AuthForgotPasswordIndexRoute,
	AuthLoginIndexRoute
};
var routeTree = Route$20._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0
	});
}
//#endregion
export { DashboardLayout, SectionTitle, authClient, createSsrRpc, phoneLoginEmail, router_exports, useSession };
