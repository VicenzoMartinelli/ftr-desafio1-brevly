import { Readable } from 'node:stream'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/infra/shared/either'
import { PostgresError } from 'postgres'
import { z } from 'zod'
import { DuplicatedLink } from './errors/duplicated-link'
import { InvalidLink } from './errors/invalid-link-format'

const createLinkInput = z.object({
  route: z.string().regex(/^[a-zA-Z0-9-_~.]+$/, {
    message: 'Invalid characters in route parameter',
  }),
  url: z.string().url(),
})

type createLinkInputType = z.input<typeof createLinkInput>

export async function createLink(
  input: createLinkInputType
): Promise<Either<InvalidLink, { id: string }>> {
  const parseResult = createLinkInput.safeParse(input)

  if (parseResult.success === false) {
    return makeLeft(new InvalidLink())
  }
  const { route, url } = parseResult.data

  try {
    const inserted = await db
      .insert(schema.links)
      .values({
        route: route,
        url: url,
        hits: 0,
      })
      .returning({
        id: schema.links.id,
      })
    return makeRight(inserted[0])
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (error: any) {
    if (error.cause.code === '23505') {
      return makeLeft(new DuplicatedLink())
    }

    throw error
  }
}
