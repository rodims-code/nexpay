import { createFileRoute } from '@tanstack/react-router'
import { getProvider } from '../../../server/payments/register.ts'

export const Route = createFileRoute('/api/webhooks/moneroo' as any)({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const raw = await request.text()
        try {
          const evt = await getProvider('moneroo').parseWebhook(raw, request.headers)
          // 1. retrouver la transaction par provider_reference
          // 2. si déjà "success", ne rien faire (idempotence)
          // 3. sinon, mettre à jour le statut
          return new Response('ok')
        } catch {
          return new Response('invalid', { status: 400 })
        }
      },
    },
  },
})