import { Prisma, User } from '@prisma/client'

export interface UserRepository {
  create(product: Prisma.UserCreateInput): Promise<User>
  delete(id: string): Promise<User>
  find(email: string): Promise<User | null>
}
