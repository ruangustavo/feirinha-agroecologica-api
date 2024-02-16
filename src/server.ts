import { buildFastify } from './app'

const fastify = buildFastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
    },
  },
})
fastify.listen({ port: process.env.PORT || 3000 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
