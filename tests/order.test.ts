import { expect, test } from 'vitest'
import formAutoContent from 'form-auto-content'
import fs from 'fs'
import app from 'src/app'
import { prisma } from 'src/lib/prisma'
import { Order } from '@prisma/client'

function createProduct({ stockQuantity }: { stockQuantity: number }) {
  return formAutoContent({
    name: 'any_product',
    price: 10,
    description: 'any_description',
    stockUnit: 'UNITY',
    stockQuantity,
    imageUrl: fs.createReadStream(`./tests/mock/batata.jpg`),
  })
}

test('Test POST orders', async () => {
  // Arrange
  const productA = createProduct({ stockQuantity: 10 })
  const productB = createProduct({ stockQuantity: 5 })

  const productAResponse = await app.inject({
    method: 'POST',
    url: '/api/products',
    ...productA,
  })
  const productAId = productAResponse.json().id

  const productBResponse = await app.inject({
    method: 'POST',
    url: '/api/products',
    ...productB,
  })
  const productBId = productBResponse.json().id

  const order = {
    address: 'any_address',
    addressNumber: 'any_number',
    email: 'jaquinho@gmail.com',
    neighborhood: 'any_neighborhood',
    paymentMethod: 'MONEY',
    phoneNumber: 'any_phone_number',
    postalCode: 'any_postal_code',
    referencePoint: 'any_reference_point',
    products: [
      {
        id: productAId,
        quantity: 1,
      },
      {
        id: productBId,
        quantity: 4,
      },
    ],
  }

  // Act
  const orderResponse = await app.inject({
    method: 'POST',
    url: '/api/orders',
    payload: order,
  })
  const createdOrder: Order = orderResponse.json()

  const updatedProductA = await prisma.product.findUnique({
    where: {
      id: productAId,
    },
  })

  const updatedProductB = await prisma.product.findUnique({
    where: {
      id: productBId,
    },
  })

  // Assert
  expect(createdOrder?.total).toBe(50)
  expect(orderResponse.statusCode).toBe(201)
  expect(updatedProductA?.stockQuantity).toBe(9)
  expect(updatedProductB?.stockQuantity).toBe(1)
})
