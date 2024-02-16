import { afterAll, expect, test } from 'vitest'
import { FastifyRequest } from 'fastify';
import app from "../src/app";

import { PrismaProductRepository } from 'src/repositories/prisma/prisma-product.repository';
import { ProductService } from 'src/services/product.service';
import { ProductController } from 'src/controllers/product.controller';


// import fastify request

// create a factory to dont neeed repeat the same code
// function createProductComponents() {
//   const productRepository = new PrismaProductRepository()
//   const productService = new ProductService(productRepository)
//   const productController = new ProductController(productService)
//   return { productRepository, productService, productController }
// }

test('Test GET products', async () => {
    const response = await app.inject({
        method: 'GET',
        url: '/api/products',
    })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual([])
})

test("Test POST products", async () => {
    const productRepository = new PrismaProductRepository()

    const response = await app.inject({
        method: 'POST',
        url: '/api/products',
        payload: {
            name: 'Product 1',
            price: 10,
            description: 'Description',
            stockQuantity: 10,
            image: 'image',
            stockUnit: 'UNITY'
        }
    })

    expect(response.statusCode).toBe(201)
    expect(await productRepository.count()).toBe(1)

    // Clean up
    await productRepository.delete(response.json().id)
});


afterAll(async () => {
  await app.close()
})