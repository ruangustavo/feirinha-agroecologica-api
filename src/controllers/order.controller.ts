import { FastifyRequest } from 'fastify'
import { IOrderService } from 'src/services/order.service'
import { z } from 'zod'

export class OrderController {
  constructor(private readonly orderService: IOrderService) {}

  async createOrder(req: FastifyRequest) {
    const createOrderSchema = z.object({
      address: z.string(),
      addressNumber: z.string(),
      email: z.string().email(),
      neighborhood: z.string(),
      paymentMethod: z.enum(['MONEY', 'PIX']),
      phoneNumber: z.string(),
      postalCode: z.string(),
      referencePoint: z.string(),
      products: z.array(
        z.object({
          id: z.string(),
          quantity: z.number().int().positive(),
        }),
      ),
    })

    const {
      address,
      addressNumber,
      email,
      neighborhood,
      paymentMethod,
      phoneNumber,
      postalCode,
      referencePoint,
      products,
    } = createOrderSchema.parse(req.body)

    const createOrder = await this.orderService.createOrder({
      address,
      addressNumber,
      email,
      neighborhood,
      paymentMethod,
      phoneNumber,
      postalCode,
      referencePoint,
      products,
    })

    return createOrder
  }

  async getOrders() {
    return await this.orderService.getOrders()
  }
}
