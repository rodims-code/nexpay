import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { db } from '#/db'
import { waitlist } from '#/db/schema'

export const waitlistSchema = z.object({
  email: z.string().trim().email('Adresse e-mail invalide'),
  country: z.enum(['Congo', 'RDC', 'Sénégal', 'Gabon', 'Autre']),
  website: z.string().max(0).optional(),
})

export const joinWaitlist = createServerFn({ method: 'POST' })
  .validator((data) => waitlistSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) return { success: true }
    await db.insert(waitlist).values({ email: data.email, country: data.country }).onConflictDoNothing({ target: waitlist.email })
    return { success: true }
  })
