import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { $ref, CreateUserInput, LoginUserInput } from 'src/schemas/user.schema'
import { UserController } from 'src/controllers/user.controller'
import { PrismaUserRepository } from 'src/repositories/prisma/prisma-user.repository'
import { UserService } from 'src/services/user.service'

function makeUserController() {
  const userRepository = new PrismaUserRepository()
  const userService = new UserService(userRepository)
  return new UserController(userService)
}

export async function userRoutes(app: FastifyInstance) {
  const userController = makeUserController()

  app.get('/', (req, reply) => {
    reply.send({ message: '/ route hit' })
  })

  app.post(
    '/register',
    {
      schema: {
        body: $ref('createUserSchema'),
        response: { 201: $ref('createUserResponseSchema') },
      },
    },
    async (req: FastifyRequest<{ Body: CreateUserInput }>, reply) =>
      await userController.create(req, reply),
  )

  app.post(
    '/login',
    {
      schema: {
        body: $ref('loginSchema'),
        response: {
          200: $ref('loginResponseSchema'),
        },
      },
    },
    async (
      req: FastifyRequest<{ Body: LoginUserInput }>,
      reply: FastifyReply,
    ) => await userController.login(req, reply),
  )

  app.delete(
    '/logout',
    { preHandler: [app.authenticate] },
    async (req, reply) => await userController.logout(req, reply),
  )
  app.log.info('user routes registered')
}
