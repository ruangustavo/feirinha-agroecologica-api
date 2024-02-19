import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserInput } from '../schemas/user.schema'
import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma'

const SALT_ROUNDS = 10

export async function createUser(
  req: FastifyRequest<{
    Body: CreateUserInput
  }>,
  reply: FastifyReply,
) {
  const { password, email } = req.body

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  if (user) {
    return reply.code(401).send({
      message: 'User already exists with this email',
    })
  }

  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS)

    const user = await prisma.user.create({
      data: {
        password: hash,
        email,
      },
    })
    return reply.code(201).send(user)
  } catch (e) {
    return reply.code(500).send(e)
  }
}
