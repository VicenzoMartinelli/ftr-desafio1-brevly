import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/infra/shared/either'
import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'

const incrementLinkInput = z.object({
  linkId: z.string().nonempty(),
})

type linkImageInput = z.input<typeof incrementLinkInput>

export async function incrementLinkHits(
  input: linkImageInput
): Promise<Either<never, null>> {
  await db
    .update(schema.links)
    .set({ hits: sql`${schema.links.hits} + 1` })
    .where(eq(schema.links.id, input.linkId))
    .catch(console.error)

  return makeRight(null)
}
