import crypto from 'node:crypto'
import type { PaymentProvider, PaymentStatus } from '../payments/types.ts'

const BASE = 'https://api.moneroo.io/v1'

const mapStatus = (s: string): PaymentStatus =>
  s === 'success' ? 'success'
  : s === 'failed' ? 'failed'
  : s === 'cancelled' ? 'cancelled'
  : 'pending'

export const monerooProvider: PaymentProvider = {
  name: 'moneroo',

  async initiatePayment(i) {
    const res = await fetch(`${BASE}/payments/initialize`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.MONEROO_SECRET_KEY}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        amount: i.amount,
        currency: i.currency,
        description: i.description,
        return_url: i.returnUrl,
        customer: {
          email: i.customer.email,
          first_name: i.customer.firstName,
          last_name: i.customer.lastName,
        },
        metadata: { reference: i.reference },
      }),
    })
    if (!res.ok) throw new Error(`Moneroo init failed: ${res.status}`)
    const { data } = await res.json()
    return { providerReference: data.id, checkoutUrl: data.checkout_url }
  },

  async verifyPayment(id) {
    const res = await fetch(`${BASE}/payments/${id}/verify`, {
      headers: { Authorization: `Bearer ${process.env.MONEROO_SECRET_KEY}` },
    })
    const { data } = await res.json()
    return mapStatus(data.status)
  },

  async parseWebhook(rawBody, headers) {
    const sig = headers.get('x-moneroo-signature') ?? ''
    const expected = crypto
      .createHmac('sha256', process.env.MONEROO_WEBHOOK_SECRET!)
      .update(rawBody)
      .digest('hex')
    if (sig.length !== expected.length ||
        !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
      throw new Error('Invalid signature')
    }
    const event = JSON.parse(rawBody)
    return { providerReference: event.data.id, status: mapStatus(event.data.status) }
  },
}