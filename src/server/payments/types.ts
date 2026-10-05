export type PaymentStatus = 'pending' | 'success' | 'failed' | 'cancelled'

export interface PaymentInput {
  reference: string        // ta référence interne
  amount: number
  currency: string
  description: string
  customer: { email: string; firstName: string; lastName: string }
  returnUrl: string
}

export interface PaymentProvider {
  name: string
  initiatePayment(i: PaymentInput): Promise<{ providerReference: string; checkoutUrl: string }>
  verifyPayment(providerReference: string): Promise<PaymentStatus>
  parseWebhook(rawBody: string, headers: Headers): Promise<{ providerReference: string; status: PaymentStatus }>
}