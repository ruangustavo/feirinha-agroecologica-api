import { prisma } from 'src/lib/prisma'
import { UserRepository } from '../user.repository'
import { Prisma } from '@prisma/client'

export class PrismaUserRepository implements UserRepository {
  async create({ email, password }: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    })
    return user
  }

  async delete(id: string) {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    })
    return user
  }

  async find(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }
}
