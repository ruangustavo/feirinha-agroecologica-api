import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { $ref } from 'src/schemas/user.schema'
import { createUser } from 'src/controllers/user.controller'

export async function userRoutes(app: FastifyInstance) {
  app.get('/', (req: FastifyRequest, reply: FastifyReply) => {
    reply.send({ message: '/ route hit' })
  })
  app.post(
    '/register',
    { schema: { body: $ref('createUserSchema') } },
    createUser,
  )
  app.post(
    '/login',
    {
      schema: {
        body: $ref('loginSchema'),
        response: {
          201: $ref('loginResponseSchema'),
        },
      },
    },
    () => {},
  )
  app.delete('/logout', () => {})

  app.log.info('user routes registered')
}
