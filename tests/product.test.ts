import { afterAll, expect, test } from 'vitest'
import app from '../src/app'
import formAutoContent from 'form-auto-content'
import { prisma } from 'src/lib/prisma'

import { createProduct } from './utils'

test('Test GET products', async () => {
  const product = createProduct({ stockQuantity: 10, price: 10 })
  const productForm = formAutoContent(product)

  // act
  const postResponse = await app.inject({
    method: 'POST',
    url: '/api/products',
    ...productForm,
  })

  const response = await app.inject({
    method: 'GET',
    url: '/api/products',
  })

  expect(response.statusCode).toBe(200)
  expect(response.json()).toEqual([postResponse.json()])

  await prisma.product.delete({
    where: {
      id: postResponse.json().id,
    },
  })
})

test('Test POST products', async () => {
  // arrange
  const product = createProduct({ stockQuantity: 10, price: 10 })
  const productForm = formAutoContent(product)

  const expectedProduct = {
    ...product,
    id: expect.any(String),
    imageUrl: expect.any(String),
    createdAt: expect.any(String),
  }

  // act
  const postResponse = await app.inject({
    method: 'POST',
    url: '/api/products',
    ...productForm,
  })

  // assert
  expect(postResponse.statusCode).toBe(201)
  expect(postResponse.json()).toEqual(expectedProduct)

  // clean up
  await prisma.product.delete({
    where: {
      id: postResponse.json().id,
    },
  })
})

afterAll(async () => {
  await app.close()
})
