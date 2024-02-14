import { Product } from '@prisma/client'

export interface ProductRepository {
  fetchAll(): Promise<Product[]>
}
