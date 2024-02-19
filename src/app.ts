import Fastify from 'fastify'
import { productRoutes } from './routes/product.route'
import { ZodError } from 'zod'
import multipart from '@fastify/multipart'

export function buildFastify(opts = {}) {
  const app = Fastify(opts)

  app.get('/healthcheck', (req, res) => {
    res.send({ message: 'Success' })
  })

  app.register(multipart)
  app.register(productRoutes, {
    prefix: '/api/products',
  })

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
