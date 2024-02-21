import { IProductService } from 'src/services/product.service'
import { FastifyRequest } from 'fastify'
import { z } from 'zod'

export class ProductController {
  constructor(private readonly productService: IProductService) {}

  async fetchAll() {
    const products = await this.productService.fetchAll()
    return products
  }

  async create(req: FastifyRequest) {
    const parts = await req.file()
    const { file: imageData } = parts ?? {}

    if (!imageData) {
      return { message: 'Image is required.' }
    }

    const createProductBodySchema = z
      .object({
        name: z.object({
          value: z.string().min(3),
        }),
        price: z.object({
          value: z.coerce.number(),
        }),
        description: z.object({
          value: z.string().min(3),
        }),
        stockUnit: z.object({
          value: z.enum(['KG', 'UNITY']),
        }),
        stockQuantity: z.object({
          value: z.coerce.number().min(1),
        }),
      })
      .transform(({ name, price, description, stockUnit, stockQuantity }) => {
        return {
          name: name.value,
          price: price.value,
          description: description.value,
          stockUnit: stockUnit.value,
          stockQuantity: stockQuantity.value,
        }
      })

    const { fields } = parts ?? {}
    if (!fields) {
      return { message: 'Fields are required.' }
    }

    const { name, price, description, stockQuantity, stockUnit } =
      createProductBodySchema.parse(fields)

    const product = await this.productService.create({
      name,
      price,
      description,
      stockQuantity,
      stockUnit,
      imageData,
    })

    return product
  }
}
