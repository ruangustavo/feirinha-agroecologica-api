import Fastify, { FastifyReply, FastifyRequest } from 'fastify'

import { productRoutes } from './routes/product.route'
import { userRoutes } from './routes/user.route'

import { userSchemas } from './schemas/user.schema'

import { ZodError } from 'zod'

import fjwt, { FastifyJWT } from '@fastify/jwt'
import fCookie from '@fastify/cookie'
import multipart from '@fastify/multipart'

export function buildFastify(opts = {}) {
  const app = Fastify(opts)

  for (const schema of [...userSchemas]) {
    app.addSchema(schema)
  }

  app.get('/healthcheck', (req, res) => {
    res.send({ message: 'Success' })
  })

  app.register(userRoutes, { prefix: 'api/users' })
  app.register(multipart)
  app.register(productRoutes, { prefix: '/api/products' })

  app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
      return reply
        .status(400)
        .send({ message: 'Validation error.', issues: error.format() })
    }

    if (process.env.NODE_ENV !== 'production') {
      console.error(error)
    }

    return reply.status(500).send({ message: 'Internal server error.' })
  })

  app.decorate(
    'authenticate',
    async (req: FastifyRequest, reply: FastifyReply) => {
      const token = req.cookies.access_token
      if (!token) {
        return reply.status(401).send({ message: 'Authentication required' })
      }
      // here decoded will be a different type by default but we want it to be of user-payload type
      const decoded = req.jwt.verify<FastifyJWT['user']>(token)
      req.user = decoded
    },
  )

  // register jwt (auth module)
  app.register(fjwt, { secret: 'supersecretcode-CHANGE_THIS-USE_ENV_FILE' })

  // auth module
  app.addHook('preHandler', (req, res, next) => {
    req.jwt = app.jwt
    return next()
  })

  // cookies (auth module)
  app.register(fCookie, {
    secret: 'some-secret-key',
    hook: 'preHandler',
  })

  // graceful shutdown
  const listeners = ['SIGINT', 'SIGTERM']
  listeners.forEach((signal) => {
    process.on(signal, async () => {
      await app.close()
      process.exit(0)
    })
  })

  return app
}

export default buildFastify()
