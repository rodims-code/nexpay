import { monerooProvider } from '../providers/moneroo.ts'
const providers = { moneroo: monerooProvider }
export const getProvider = (n: keyof typeof providers) => providers[n]