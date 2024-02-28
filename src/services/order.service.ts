import { Order, Prisma } from '@prisma/client'
import { prisma } from 'src/lib/prisma'

type Product = { id: string; quantity: number }
type CreateOrderRequest = Prisma.OrderCreateInput & { products: Product[] }

export interface IOrderService {
  createOrder(order: CreateOrderRequest): Promise<Order>
  getOrders(): Promise<Order[]>
}

export class OrderService implements IOrderService {
  async createOrder({
    address,
    addressNumber,
    email,
    neighborhood,
    paymentMethod,
    phoneNumber,
    postalCode,
    referencePoint,
    products,
  }: CreateOrderRequest) {
    const productsFromOrder = await prisma.product.findMany({
      where: {
        id: {
          in: products.map(({ id }) => id),
        },
      },
    })

    let total = 0
    for (const product of productsFromOrder) {
      const foundProduct = products.find(({ id }) => id === product.id)
      if (!foundProduct) continue
      total += product.price * foundProduct.quantity
    }

    const orderCreated = await prisma.order.create({
      data: {
        address,
        addressNumber,
        email,
        neighborhood,
        paymentMethod,
        phoneNumber,
        postalCode,
        referencePoint,
        total,
      },
    })

    const { id: orderId } = orderCreated

    await prisma.orderProduct.createMany({
      data: products.map(({ id, quantity }) => ({
        orderId,
        productId: id,
        quantity,
      })),
    })

    for (const product of products) {
      const { id, quantity } = product

      await prisma.product.update({
        where: {
          id,
        },
        data: {
          stockQuantity: {
            decrement: quantity,
          },
        },
      })
    }

    return orderCreated
  }

  async getOrders() {
    const orders = await prisma.order.findMany()
    return orders
  }
}
