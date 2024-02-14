import Fastify from 'fastify'
import { productRoutes } from './routes/product.route'

export function buildFastify(opts = {}) {
  const app = Fastify(opts)

  app.register(productRoutes, {
    prefix: '/api/products',
  })

  return app
}
