import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/infra/shared/either'
import { count, eq } from 'drizzle-orm'
import { z } from 'zod'
import { InvalidLink } from './errors/invalid-link-format'

const deleteLinkInput = z.object({
  route: z.string(),
})

type deleteLinkInput = z.input<typeof deleteLinkInput>

export async function deleteLink(
  input: deleteLinkInput
): Promise<Either<InvalidLink, { route: string }>> {
  const exists = await db
    .select({ count: count() })
    .from(schema.links)
    .where(eq(schema.links.route, input.route))

  if (exists[0].count === 0) {
    return makeLeft(new InvalidLink())
  }

  await db.delete(schema.links).where(eq(schema.links.route, input.route))

  return makeRight({ route: input.route })
}
