import { prisma } from 'src/lib/prisma'
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

  async delete(id: number) {
    const product = await prisma.product.delete({
      where: {
        id: String(id), // Prisma expects a string here GOOD PRACTICE?
      },
    })
    return product
  }

  async count(){
    const count = await prisma.product.count()
    return count
  }
}
