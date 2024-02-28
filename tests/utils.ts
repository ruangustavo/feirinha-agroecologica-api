import fs from 'fs'

export function createProduct({
  stockQuantity,
  price = 10,
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

export function createOrder(
  products: [
    { id: string; quantity: number },
    { id: string; quantity: number },
  ],
) {
  return {
    address: 'any_address',
    addressNumber: 'any_number',
    email: 'any_email@gmail.com',
    neighborhood: 'any_neighborhood',
    paymentMethod: 'MONEY',
    phoneNumber: 'any_phone_number',
    postalCode: 'any_postal_code',
    referencePoint: 'any_reference_point',
    products,
  }
}
