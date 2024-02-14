import { IProductService } from '@/services/product.service'
import { FastifyReply, FastifyRequest } from 'fastify'

export class ProductController {
  constructor(private readonly productService: IProductService) {}

  async fetchAll(req: FastifyRequest, reply: FastifyReply) {
    const products = await this.productService.fetchAll()
    return products
  }
}
