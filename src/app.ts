import Fastify from 'fastify'

export function buildFastify(opts = {}) {
  const fastify = Fastify(opts)

  fastify.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
  })

  return fastify
}
