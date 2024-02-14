import { ProductRepository } from '@/repositories/product.repository'
import { Product } from '@prisma/client'

export interface IProductService {
  fetchAll(): Promise<Product[]>
}

export class ProductService implements IProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async fetchAll() {
    const products = await this.productRepository.fetchAll()
    return products
  }
}
