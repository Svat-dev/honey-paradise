import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator"
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception"
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception"
import { PrismaService } from "src/core/prisma/prisma.service"
import { ordersDefaultOutput } from "src/shared/lib/prisma/outputs/order.output"

import { CartService } from "../cart/cart.service"
import { PaymentsService } from "../payments/payments.service"

import type { CreateOrderResponse } from "./response/create-order.res"
import type { GetAllOrdersResponse } from "./response/get-all-orders.res"

@Injectable()
export class OrderService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly cartService: CartService,
		private readonly paymentService: PaymentsService
	) {}

	async getAllOrders(userId: string): Promise<GetAllOrdersResponse[]> {
		const orders = await this.prisma.order.findMany({
			where: { userId },
			select: ordersDefaultOutput,
			orderBy: { createdAt: "desc" },
			take: 10
		})

		return orders
	}

	async createOrder(
		userId: string,
		currencies: string,
		locale: string
	): Promise<CreateOrderResponse> {
		try {
			const parsed: Record<string, any> = JSON.parse(currencies || "{}")

			const { cartItems, totalPrice, deliveryPrice, discount } =
				await this.cartService.getMyCart(userId)

			const items = cartItems.map(
				({ quantity, priceInUSD, productVariant }) => ({
					quantity,
					price: priceInUSD,
					variantId: productVariant.product.id
				})
			)

			const { index: prevIndex } = await this.prisma.order.findFirst({
				where: { userId },
				select: { index: true },
				orderBy: { createdAt: "desc" }
			})

			const { id, index, totalAmount } = await this.prisma.order.create({
				data: {
					index: prevIndex + 1,
					totalAmount: totalPrice * (1 - discount) + deliveryPrice,
					items: { toJSON: () => items },
					user: { connect: { id: userId } }
				},
				select: { id: true, index: true, totalAmount: true }
			})

			if (!parsed?.rates?.["RUB"])
				throw new BadRequestException("No currency in cookie found!")

			const confirmation_url = await this.paymentService.createPayment(
				{ order: id, index, user: userId },
				{ usd: totalAmount, rub: totalAmount * parsed.rates["RUB"] },
				locale
			)

			await this.cartService.clearCartByUId(userId, true)

			return { totalAmount, confirmation_url }
		} catch (error) {
			console.log(error)
			throw new InternalServerErrorException("Error!")
		}
	}
}
