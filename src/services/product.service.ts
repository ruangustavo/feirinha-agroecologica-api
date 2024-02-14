import { ProductRepository } from '@/repositories/product.repository'
import { Prisma, Product } from '@prisma/client'

export interface IProductService {
  fetchAll(): Promise<Product[]>
  create(product: Prisma.ProductCreateInput): Promise<Product>
}

export class ProductService implements IProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async fetchAll() {
    const products = await this.productRepository.fetchAll()
    return products
  }

  // NOTE: tem uma razão pra fazer desestruturação do objeto
  // NOTE: caso um usuário malicioso envie um objeto com propriedades a mais (tipo "id")
  // NOTE: vai dar um erro de integridade no banco de dados
  async create({
    description,
    image,
    name,
    price,
    stockQuantity,
    stockUnit,
  }: Prisma.ProductCreateInput) {
    const product = await this.productRepository.create({
      description,
      image,
      name,
      price,
      stockQuantity,
      stockUnit,
    })
    return product
  }
}
