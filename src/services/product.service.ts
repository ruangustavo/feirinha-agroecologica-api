import { ProductRepository } from '../repositories/product.repository'
import { Product, StockUnit } from '@prisma/client'
import fs from 'fs'
import util from 'util'
import { pipeline } from 'stream'
import { BusboyFileStream } from '@fastify/busboy'
import { randomUUID } from 'crypto'

export interface IProductService {
  fetchAll(): Promise<Product[]>
  create(product: {
    description: string
    name: string
    price: number
    stockUnit: StockUnit
    stockQuantity: number
    imageData: BusboyFileStream
  }): Promise<Product>
}

const pump = util.promisify(pipeline)

export class ProductService implements IProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async fetchAll() {
    const products = await this.productRepository.fetchAll()
    return products
  }

  async create({
    description,
    imageData,
    name,
    price,
    stockUnit,
    stockQuantity,
  }: {
    description: string
    name: string
    price: number
    stockUnit: StockUnit
    stockQuantity: number
    imageData: BusboyFileStream
  }) {
    const path = `./products/${randomUUID()}.png`
    await pump(imageData, fs.createWriteStream(path))

    const product = await this.productRepository.create({
      description,
      name,
      price,
      stockQuantity,
      stockUnit,
      image: path,
    })
    return product
  }
}
