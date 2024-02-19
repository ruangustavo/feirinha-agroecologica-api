import { afterAll, expect, test } from 'vitest'
import app from '../src/app'

/* TODO: clean after run (create a repo) */

test('Test /register route', async () => {
  const response = await app.inject({
    method: 'POST',
    url: '/api/users/register',
    payload: {
      email: 'jhondoe@gmail.com',
      password: '123456',
    },
  })

  expect(response.statusCode).toBe(201)
  expect(response.json().email).toBe('jhondoe@gmail.com')
})

afterAll(async () => {
  await app.close()
})
