import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/infra/shared/either'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const getlinkByRouteInput = z.object({
  route: z.string().nonempty(),
})

type GetLinkByRouteInput = z.input<typeof getlinkByRouteInput>
type GetLinkByRouteOutput = {
  link: {
    id: string
    route: string
    displayUrl: string
    url: string
    createdAt: Date
  }
}

export async function getLinkByRoute(
  input: GetLinkByRouteInput
): Promise<Either<never, GetLinkByRouteOutput>> {
  const { route } = getlinkByRouteInput.parse(input)

  const linkQuery = await db
    .select({
      id: schema.links.id,
      route: schema.links.route,
      url: schema.links.url,
      displayUrl: schema.links.displayUrl,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .where(eq(schema.links.route, route))
    .limit(1)

  const link = linkQuery[0]

  return makeRight({
    link,
  })
}
