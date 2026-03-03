import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator"
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception"
import { PrismaService } from "src/core/prisma/prisma.service"
import { ordersDefaultOutput } from "src/shared/lib/prisma/outputs/order.output"

import { CartService } from "../cart/cart.service"
import { PaymentsService } from "../payments/payments.service"

import type { CreateOrderResponse } from "./response/create-order.res"

@Injectable()
export class OrderService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly cartService: CartService,
		private readonly paymentService: PaymentsService
	) {}

	async getAllOrders(userId: string): Promise<any> {
		const orders = await this.prisma.order.findMany({
			where: { userId },
			select: ordersDefaultOutput,
			take: 5
		})

		return orders
	}

	async createOrder(
		userId: string,
		currencies: string,
		locale: string
	): Promise<CreateOrderResponse> {
		const parsed: Record<string, any> = JSON.parse(currencies || "{}")

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

		if (!parsed?.rates?.["RUB"])
			throw new BadRequestException("No currency in cookie found!")

		const confirmation_url = await this.paymentService.createPayment(
			{ order: id, user: userId },
			{ usd: totalAmount, rub: totalAmount * parsed.rates["RUB"] },
			locale
		)

		await this.cartService.clearCartByUId(userId, true)

		return { totalAmount, confirmation_url: "" }
	}
}
