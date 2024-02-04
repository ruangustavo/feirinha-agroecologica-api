// https://fastify.dev/docs/latest/Guides/Testing/

import { buildFastify } from '../src/app'
import { test } from 'tap'

test('requests the "/" route', async (t) => {
  const app = buildFastify()

  const response = await app.inject({
    method: 'GET',
    url: '/',
  })

  t.equal(response.statusCode, 200, 'returns a status code of 200')
  t.same(response.json(), { hello: 'world' })
})
