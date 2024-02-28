import { FastifyInstance } from 'fastify'
import { OrderController } from 'src/controllers/order.controller'
import { OrderService } from 'src/services/order.service'

function makeProductController() {
  // NOTE: inversão de dependência
  const orderService = new OrderService()
  const orderController = new OrderController(orderService)
  return orderController
}

export async function orderRoutes(app: FastifyInstance) {
  const orderController = makeProductController()

  app.post('', async (req, reply) => {
    const createdOrder = await orderController.createOrder(req)
    reply.status(201).send(createdOrder)
  })

  app.get('/', async (_req, reply) => {
    const orders = await orderController.getOrders()
    reply.send(orders)
  })
}
