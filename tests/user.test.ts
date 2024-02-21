import { afterAll, expect, test } from 'vitest'
import app from '../src/app'

import { PrismaUserRepository } from '../src/repositories/prisma/prisma-user.repository'

// arrange
const userData = {
  email: 'jhondoe@gmail.com',
  password: '123456',
}

test('Test /register route', async () => {
  const userRepository = new PrismaUserRepository()

  // act
  const response = await app.inject({
    method: 'POST',
    url: '/api/users/register',
    payload: userData,
  })

  // assert
  expect(response.statusCode).toBe(201)
  expect(response.json().email).toBe(userData.email)
  expect(response.json().password).toBeUndefined()

  // cleanup
  await userRepository.delete(response.json().id)
})

afterAll(async () => {
  await app.close()
})

test('Test /login route', async () => {
  const response = await app.inject({
    method: 'POST',
    url: '/api/users/login',
    payload: userData,
  })

  expect(response.statusCode).toBe(401)
})
