import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/infra/shared/either'
import { asc, count, desc, ilike } from 'drizzle-orm'
import { z } from 'zod'

const getlinksInput = z.object({
  searchQuery: z.string().optional(),
  sortBy: z.enum(['createdAt']).optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
  page: z.number().optional().default(1),
  pageSize: z.number().optional().default(20),
})

type GetlinksInput = z.input<typeof getlinksInput>
type GetlinksOutput = {
  links: {
    id: string
    route: string
    displayUrl: string
    url: string
    hits: number
    createdAt: Date
  }[]
  total: number
}

export async function getlinks(
  input: GetlinksInput
): Promise<Either<never, GetlinksOutput>> {
  const { page, pageSize, searchQuery, sortBy, sortDirection } =
    getlinksInput.parse(input)

  const [links, [{ total }]] = await Promise.all([
    db
      .select({
        id: schema.links.id,
        route: schema.links.route,
        displayUrl: schema.links.displayUrl,
        url: schema.links.url,
        hits: schema.links.hits,
        createdAt: schema.links.createdAt,
      })
      .from(schema.links)
      .where(
        searchQuery
          ? ilike(schema.links.route, `%${searchQuery}%`) ||
              ilike(schema.links.url, `%${searchQuery}%`)
          : undefined
      )
      .orderBy(fields => {
        if (sortBy && sortDirection === 'asc') {
          return asc(fields[sortBy])
        }

        if (sortBy && sortDirection === 'desc') {
          return desc(fields[sortBy])
        }

        return desc(fields.id)
      })
      .offset((page - 1) * pageSize)
      .limit(pageSize),

    db
      .select({ total: count(schema.links.id) })
      .from(schema.links)
      .where(
        searchQuery
          ? ilike(schema.links.route, `%${searchQuery}%`) ||
              ilike(schema.links.url, `%${searchQuery}%`)
          : undefined
      ),
  ])

  return makeRight({
    total,
    links,
  })
}
