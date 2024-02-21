import { UserRepository } from 'src/repositories/user.repository'
import { Prisma, User } from '@prisma/client'

export interface IUserService {
  create(user: Prisma.UserCreateInput): Promise<User>
  find(email: string): Promise<User | null>
}

export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create({ email, password }: Prisma.UserCreateInput) {
    const user = await this.userRepository.create({
      email,
      password,
    })
    return user
  }

  async find(email: string) {
    const user = await this.userRepository.find(email)
    return user
  }
}
