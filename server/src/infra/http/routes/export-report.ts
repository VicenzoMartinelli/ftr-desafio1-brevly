import { exportLinks } from '@/app/functions/links/export-links'
import { unwrapEither } from '@/infra/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const exportReportRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links/report',
    {
      schema: {
        summary: 'Export links report',
        tags: ['links'],
        querystring: z.object({
          searchQuery: z.string().optional(),
        }),
        response: {
          200: z.object({
            reportUrl: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { searchQuery } = request.query

      const result = await exportLinks({
        searchQuery,
      })

      const { reportUrl } = unwrapEither(result)

      return reply.status(200).send({ reportUrl })
    }
  )
}
