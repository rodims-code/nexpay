import { createServerFn } from '@tanstack/react-start'

/** Keeps the sandbox route unavailable in production unless it is explicitly enabled. */
export const isSandboxRouteEnabled = createServerFn({ method: 'GET' }).handler(() => {
  return process.env.NODE_ENV !== 'production' || process.env.ENABLE_SANDBOX === 'true'
})
