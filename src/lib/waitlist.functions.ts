import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { sql } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '#/db'
import { waitlist } from '#/db/schema'

const WAITLIST_RATE_LIMIT_MAX = 5
const WAITLIST_RATE_LIMIT_WINDOW_SECONDS = 60

export const waitlistSchema = z.object({
  email: z.string().trim().email('Adresse e-mail invalide'),
  country: z.enum(['Congo', 'RDC', 'Sénégal', 'Gabon', 'Autre']),
  website: z.string().trim().max(2_048).optional(),
})

function getClientIp() {
  const clientIp = getRequestHeaders().get('x-real-ip')

  if (clientIp) return clientIp
  if (process.env.NODE_ENV !== 'production') return '127.0.0.1'

  throw new Error('Railway did not provide the client IP')
}

async function consumeWaitlistRateLimit(clientIp: string) {
  const result = await db.execute(sql`
    INSERT INTO "waitlist_rate_limit" AS rate_limit ("ip", "count", "window_started_at")
    VALUES (${clientIp}, 1, NOW())
    ON CONFLICT ("ip") DO UPDATE
    SET
      "count" = CASE
        WHEN rate_limit."window_started_at" <= NOW() - make_interval(secs => ${WAITLIST_RATE_LIMIT_WINDOW_SECONDS}) THEN 1
        ELSE rate_limit."count" + 1
      END,
      "window_started_at" = CASE
        WHEN rate_limit."window_started_at" <= NOW() - make_interval(secs => ${WAITLIST_RATE_LIMIT_WINDOW_SECONDS}) THEN NOW()
        ELSE rate_limit."window_started_at"
      END
    WHERE
      rate_limit."count" < ${WAITLIST_RATE_LIMIT_MAX}
      OR rate_limit."window_started_at" <= NOW() - make_interval(secs => ${WAITLIST_RATE_LIMIT_WINDOW_SECONDS})
    RETURNING rate_limit."count"
  `)

  return result.rowCount === 1
}

export const joinWaitlist = createServerFn({ method: 'POST' })
  .validator((data) => waitlistSchema.parse(data))
  .handler(async ({ data }) => {
    const input = waitlistSchema.parse(data)
    if (input.website) return { success: true }

    const isAllowed = await consumeWaitlistRateLimit(getClientIp())
    if (!isAllowed) return { success: true }

    await db.insert(waitlist).values({ email: input.email, country: input.country }).onConflictDoNothing({ target: waitlist.email })
    return { success: true }
  })
