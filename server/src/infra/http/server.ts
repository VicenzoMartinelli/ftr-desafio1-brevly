import { fastifyCors } from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import ScalarApiReference from '@scalar/fastify-api-reference'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createLinkRoute } from './routes/create-link'
import { deleteLinkRoute } from './routes/delete-link'
import { exportReportRoute } from './routes/export-report'
import { getLinkRoute } from './routes/get-link-by-route'
import { getLinksRoute } from './routes/get-links'

const server = fastify()
  .setValidatorCompiler(validatorCompiler)
  .setSerializerCompiler(serializerCompiler)
  .withTypeProvider<ZodTypeProvider>()

server.setErrorHandler((err, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(err)) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: err.validation,
    })
  }

  console.log(err)
  return reply.status(500).send({
    message: 'Internal server error',
  })
})
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Brevly Server',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})
server.register(ScalarApiReference, {
  routePrefix: '/docs',
})
server.register(fastifyCors, {
  origin: '*',
  methods: '*',
})

server.register(createLinkRoute, { prefix: '/api/v1' })
server.register(getLinksRoute, { prefix: '/api/v1' })
server.register(getLinkRoute, { prefix: '/api/v1' })
server.register(deleteLinkRoute, { prefix: '/api/v1' })
server.register(exportReportRoute, { prefix: '/api/v1' })

server
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('running')
  })
