import { Prisma, Product } from '@prisma/client'

export interface ProductRepository {
  fetchAll(): Promise<Product[]>
  create(product: Prisma.ProductCreateInput): Promise<Product>
}
