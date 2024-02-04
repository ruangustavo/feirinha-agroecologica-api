import Fastify from 'fastify'

const fastify = Fastify({
  logger: true,
})

fastify.get('/', async function handler(request, reply) {
  return { hello: 'world' }
})

async function setup() {
  try {
    await fastify.listen({ port: 3000 ?? process.env.PORT })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

setup()
