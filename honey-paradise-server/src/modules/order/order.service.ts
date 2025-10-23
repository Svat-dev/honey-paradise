import { CartService } from "../cart/cart.service";
import type { CreateOrderResponse } from "./response/create-order.res";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { PrismaService } from "src/core/prisma/prisma.service";
import { ordersDefaultOutput } from "src/shared/lib/prisma/outputs/order.output";

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
			take: 5,
		});

		return orders;
	}

	async createOrder(userId: string): Promise<CreateOrderResponse> {
		const cart = await this.cartService.getMyCart(userId);

		const items = cart.cartItems.map(({ quantity, priceInUSD, product }) => ({
			quantity,
			price: priceInUSD,
			productId: product.id,
		}));

		const { id, totalAmount } = await this.prisma.order.create({
			data: {
				totalAmount: cart.totalPrice,
				items: { toJSON: () => items },
				user: { connect: { id: userId } },
			},
			select: { id: true, totalAmount: true },
		});

		return { orderId: id, totalAmount };
	}

	async deleteOrder(userId: string) {}
}
