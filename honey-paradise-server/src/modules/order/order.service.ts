import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator"
import { PrismaService } from "src/core/prisma/prisma.service"
import { ordersDefaultOutput } from "src/shared/lib/prisma/outputs/order.output"

import { CartService } from "../cart/cart.service"

import type { CreateOrderResponse } from "./response/create-order.res"

@Injectable()
export class OrderService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly cartService: CartService
	) {}

	async getAllOrders(userId: string): Promise<any> {
		const orders = await this.prisma.order.findMany({
			where: { userId },
			select: ordersDefaultOutput,
			take: 5
		})

		return orders
	}

	async createOrder(userId: string): Promise<CreateOrderResponse> {
		const { cartItems, totalPrice, deliveryPrice, discount } =
			await this.cartService.getMyCart(userId)

		const items = cartItems.map(({ quantity, priceInUSD, productVariant }) => ({
			quantity,
			price: priceInUSD,
			variantId: productVariant.product.id
		}))

		const { id, totalAmount } = await this.prisma.order.create({
			data: {
				totalAmount: totalPrice * (1 - discount) + deliveryPrice,
				items: { toJSON: () => items },
				user: { connect: { id: userId } }
			},
			select: { id: true, totalAmount: true }
		})

		await this.cartService.clearCartByUId(userId, true)

		return { orderId: id, totalAmount }
	}
}
