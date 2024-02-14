import { IProductService } from '@/services/product.service'
import { FastifyRequest } from 'fastify'
import { z } from 'zod'

export class ProductController {
  constructor(private readonly productService: IProductService) {}

  async fetchAll() {
    const products = await this.productService.fetchAll()
    return products
  }

  async create(req: FastifyRequest) {
    const createProductBodySchema = z.object({
      name: z.string().min(3),
      price: z.number().positive(),
      description: z.string(),
      image: z.string(),
      stockUnit: z.enum(['KG', 'UNITY']),
      stockQuantity: z.number().min(1),
    })

    const { name, price, description, image, stockQuantity, stockUnit } =
      createProductBodySchema.parse(req.body)

    const product = await this.productService.create({
      name,
      price,
      description,
      image,
      stockQuantity,
      stockUnit,
    })

    return product
  }
}
