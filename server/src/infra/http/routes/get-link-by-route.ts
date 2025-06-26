import { getLinkByRoute } from '@/app/functions/links/get-link-by-route'
import { incrementLinkHits } from '@/app/functions/links/incrementLinkHits'
import { unwrapEither } from '@/infra/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getLinkRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links/:route',
    {
      schema: {
        summary: 'Get link by route',
        tags: ['links'],
        params: z.object({
          route: z.string().nonempty(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            route: z.string(),
            url: z.string(),
            createdAt: z.date(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { route } = request.params

      const result = await getLinkByRoute({
        route,
      })
      const { link } = unwrapEither(result)

      if (!link) {
        return reply.status(404).send({ message: 'Link not found' })
      }

      await incrementLinkHits({ linkId: link.id })

      return reply.status(200).send(link)
    }
  )
}
