import { Prisma, Product } from '@prisma/client'

export interface ProductRepository {
  fetchAll(): Promise<Product[]>
  create(product: Prisma.ProductCreateInput): Promise<Product>
  delete(id: string): Promise<Product>
  count(): Promise<number>
}
