import fs from 'fs'

export function createProduct({
  stockQuantity,
  price = 20,
}: {
  stockQuantity: number
  price?: number
}) {
  return {
    name: 'any_product',
    description: 'any_description',
    stockUnit: 'UNITY',
    stockQuantity,
    price,
    imageUrl: fs.createReadStream(`./tests/mock/batata.jpg`),
  }
}
