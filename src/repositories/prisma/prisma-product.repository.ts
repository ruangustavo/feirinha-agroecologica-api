import { prisma } from '@/lib/prisma'
import { ProductRepository } from '../product.repository'

export class PrismaProductRepository implements ProductRepository {
  async fetchAll() {
    const products = await prisma.product.findMany()
    return products
  }
}
