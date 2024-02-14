import { ProductController } from '@/controllers/product.controller'
import { PrismaProductRepository } from '@/repositories/prisma/prisma-product.repository'
import { ProductService } from '@/services/product.service'
import { FastifyInstance } from 'fastify'

function makeProductController() {
  const productRepository = new PrismaProductRepository()
  const productService = new ProductService(productRepository)
  const productController = new ProductController(productService)
  return productController
}

export async function productRoutes(app: FastifyInstance) {
  const productController = makeProductController()

  app.get('', async (req, reply) => productController.fetchAll(req, reply))
}
