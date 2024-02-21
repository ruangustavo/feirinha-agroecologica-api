import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUserInput, LoginUserInput } from '../schemas/user.schema'
import bcrypt from 'bcrypt'
import { IUserService } from 'src/services/user.service'

const SALT_ROUNDS = 10

export class UserController {
  constructor(private readonly userService: IUserService) {}

  async create(
    req: FastifyRequest<{
      Body: CreateUserInput
    }>,
    reply: FastifyReply,
  ) {
    const { password, email } = req.body

    const user = await this.userService.find(email)

    if (user) {
      return reply.code(401).send({
        message: 'User already exists with this email',
      })
    }

    try {
      const hash = await bcrypt.hash(password, SALT_ROUNDS)
      const user = await this.userService.create({ email, password: hash })
      return reply.code(201).send(user)
    } catch (e) {
      return reply.code(500).send(e)
    }
  }

  async login(
    req: FastifyRequest<{
      Body: LoginUserInput
    }>,
    reply: FastifyReply,
  ) {
    const { email, password } = req.body
    const user = await this.userService.find(email)

    const isMatch = user && (await bcrypt.compare(password, user.password))

    if (!user || !isMatch) {
      return reply.code(401).send({
        message: 'Invalid email or password',
      })
    }

    const payload = {
      id: user.id,
      email: user.email,
    }

    const token = req.jwt.sign(payload)

    reply.setCookie('access_token', token, {
      path: '/',
      httpOnly: true,
      secure: true,
    })

    return { accessToken: token }
  }

  async logout(req: FastifyRequest, reply: FastifyReply) {
    reply.clearCookie('access_token')
    return { message: 'Logout successful' }
  }
}
