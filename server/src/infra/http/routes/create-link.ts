import { createLink } from '@/app/functions/links/create-link'
import { isRight, unwrapEither } from '@/infra/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/links',
    {
      schema: {
        summary: 'Create a link',
        body: z.object({
          route: z.string().nonempty(),
          url: z.string().url(),
        }),
        tags: ['links'],
        response: {
          201: z.object({
            id: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
          409: z.object({
            message: z.string().describe('Upload already exists'),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await createLink({
        route: request.body.route,
        url: request.body.url,
      })

      if (isRight(result)) {
        const unwrapedResult = unwrapEither(result)

        return reply.status(201).send(unwrapedResult)
      }

      const error = unwrapEither(result)

      return reply.status(400).send({ message: error.message })
    }
  )
}
