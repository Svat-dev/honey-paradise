import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator"
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception"
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception"
import { PrismaService } from "src/core/prisma/prisma.service"
import {
	orderItemVariantOutput,
	ordersDefaultOutput,
	ordersMoreInfoOutput
} from "src/shared/lib/prisma/outputs/order.output"

import { CartService } from "../cart/cart.service"
import { PaymentsService } from "../payments/payments.service"

import type { CreateOrderResponse } from "./response/create-order.res"
import type { GetAllOrdersResponse } from "./response/get-all-orders.res"
import type { GetExtraOrderInfo } from "./response/get-extra-info.res"

interface IOrderItem {
	quantity: number
	price: number
	var_id: string
}

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

	async getExtraInfo(orderId: string): Promise<GetExtraOrderInfo> {
		const { items, transaction } = await this.prisma.order.findUnique({
			where: { id: orderId },
			select: ordersMoreInfoOutput
		})

		const typedItems = items as unknown as IOrderItem[]
		const variantIds = typedItems.map(({ var_id }) => var_id)

		const variants = await this.prisma.productVariant.findMany({
			where: { id: { in: variantIds } },
			select: orderItemVariantOutput
		})

		const orderItems = typedItems.map(({ var_id, ...other }) => ({
			...variants.find(({ id }) => id === var_id),
			...other
		}))

		return {
			transaction,
			items: orderItems
		}
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

			const items = cartItems.map<IOrderItem>(
				({ quantity, priceInUSD, productVariant: { id } }) => ({
					quantity,
					price: priceInUSD,
					var_id: id
				})
			)

			const prevOrder = await this.prisma.order.findFirst({
				where: { userId },
				select: { index: true },
				orderBy: { createdAt: "desc" }
			})

			const { id, index, totalAmount } = await this.prisma.order.create({
				data: {
					index: prevOrder?.index || 0 + 1,
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
