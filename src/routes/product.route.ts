import { ProductController } from '@/controllers/product.controller'
import { PrismaProductRepository } from '@/repositories/prisma/prisma-product.repository'
import { ProductService } from '@/services/product.service'
import { FastifyInstance } from 'fastify'

function makeProductController() {
  // NOTE: inversão de dependência
  const productRepository = new PrismaProductRepository()
  const productService = new ProductService(productRepository)
  const productController = new ProductController(productService)
  return productController
}

export async function productRoutes(app: FastifyInstance) {
  const productController = makeProductController()

  app.get('', async () => productController.fetchAll())
  app.post('', async (req) => productController.create(req))
}
