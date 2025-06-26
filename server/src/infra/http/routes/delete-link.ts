import { deleteLink } from '@/app/functions/links/delete-link'
import { isLeft, isRight, unwrapEither } from '@/infra/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const deleteLinkRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/links/:route',
    {
      schema: {
        summary: 'Delete a link',
        params: z.object({
          route: z.string().nonempty(),
        }),
        tags: ['links'],
        response: {
          200: z.object({}),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await deleteLink({
        route: request.params.route,
      })

      if (isLeft(result)) {
        const unwrapedResult = unwrapEither(result)

        return reply.status(404).send({ message: unwrapedResult.message })
      }

      return reply.status(204).send({})
    }
  )
}
