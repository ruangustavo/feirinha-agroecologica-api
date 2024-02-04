import { buildFastify } from './app'

const fastify = buildFastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
    },
  },
})

fastify.listen({ port: 3000 ?? process.env.PORT }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
