import { afterAll, expect, test } from 'vitest'
import app from '../src/app'
import { PrismaProductRepository } from 'src/repositories/prisma/prisma-product.repository'
import formAutoContent from 'form-auto-content'
import fs from 'fs'
import { prisma } from 'src/lib/prisma'

test('Test GET products', async () => {
  const product = formAutoContent({
    name: 'Batata',
    price: 10,
    description: 'Descrição da batata',
    stockUnit: 'UNITY',
    stockQuantity: 10,
    image: fs.createReadStream(`./tests/mock/batata.jpg`),
  })

  const postResponse = await app.inject({
    method: 'POST',
    url: '/api/products',
    ...product,
  })

  const pid = postResponse.json().id

  const response = await app.inject({
    method: 'GET',
    url: '/api/products',
  })

  expect(response.statusCode).toBe(200)
  expect(response.json()).toEqual([postResponse.json()])

  await prisma.product.delete({
    where: {
      id: pid,
    },
  })
})

test('Test POST products', async () => {
  const productRepository = new PrismaProductRepository()

  const product = formAutoContent({
    name: 'Batata',
    price: 10,
    description: 'Descrição da batata',
    stockUnit: 'UNITY',
    stockQuantity: 10,
    image: fs.createReadStream(`./tests/mock/batata.jpg`),
  })

  const expectedProduct = {
    id: expect.any(String),
    name: 'Batata',
    image: expect.any(String),
    price: 10,
    description: 'Descrição da batata',
    stockQuantity: 10,
    stockUnit: 'UNITY',
    createdAt: expect.any(String),
  }

  const response = await app.inject({
    method: 'POST',
    url: '/api/products',
    ...product,
  })

  expect(response.statusCode).toBe(201)
  expect(response.json()).toEqual(expectedProduct)
  expect(await productRepository.count()).toBe(1)
  await productRepository.delete(response.json().id)
})

afterAll(async () => {
  await app.close()
})
