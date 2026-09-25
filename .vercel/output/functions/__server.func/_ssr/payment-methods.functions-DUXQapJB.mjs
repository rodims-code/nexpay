import { createServerFn } from "./ssr2.mjs";
import { createSsrRpc } from "./router-5dHOOvT4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/payment-methods.functions-DUXQapJB.js
var getPaymentMethods = createServerFn({ method: "GET" }).handler(createSsrRpc("26e0ad3ba15d26c3b3b635e9ae69050cad62771506c0759c530e586fe4f370ac"));
var createPaymentMethod = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("6cde012380237819c6e1a83c6f79fe57d0597615ff010dd411942f522f1b1ca1"));
var updatePaymentMethod = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("0f01b10d06cd0d8d605a0a4a413fdb145217be40b891ef0a45488da35e4efdb8"));
var deletePaymentMethod = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("55fc0484b9941926147081b475de8d7569a7391edff13c9e7550b50cc47da0d3"));
var setDefaultPaymentMethod = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("acf5cc2d5f5e9e0ae23b4e99a879145db74c7cf7d824c122bb5233c78bfd3f43"));
//#endregion
export { createPaymentMethod, deletePaymentMethod, getPaymentMethods, setDefaultPaymentMethod, updatePaymentMethod };
