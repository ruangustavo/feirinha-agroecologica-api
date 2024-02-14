import { prisma } from '@/lib/prisma'
import { ProductRepository } from '../product.repository'
import { Prisma } from '@prisma/client'

export class PrismaProductRepository implements ProductRepository {
  async fetchAll() {
    const products = await prisma.product.findMany()
    return products
  }

  async create({
    name,
    price,
    description,
    image,
    stockQuantity,
    stockUnit,
  }: Prisma.ProductCreateInput) {
    const product = await prisma.product.create({
      data: {
        name,
        price,
        description,
        image,
        stockQuantity,
        stockUnit,
      },
    })
    return product
  }
}
