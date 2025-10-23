import type { AddCartItemDto } from "./dto/add-cart-item.dto";
import { EnumCurrencies } from "@prisma/client";
import type { GetMyCartResponse } from "./response/get-my-cart.res";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { PrismaService } from "src/core/prisma/prisma.service";
import { ProductsService } from "../products/products.service";
import { cartDefaultOutput } from "src/shared/lib/prisma/outputs/cart.output";

@Injectable()
export class CartService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly productService: ProductsService
	) {}

	async getMyCart(userId: string): Promise<GetMyCartResponse> {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: { id: true, settings: { select: { defaultCurrency: true } } },
		});

		const cart = await this.prisma.cart.findUnique({ where: { userId: user.id }, select: cartDefaultOutput });

		if (!cart) throw new NotFoundException("Cart not found"); // TODO

		return {
			...cart,
			length: cart.cartItems.length,
			currency: user.settings.defaultCurrency || EnumCurrencies.DOLLAR,
		};
	}

	async addCartItem(userId: string, dto: AddCartItemDto): Promise<boolean> {
		const { id: cartId } = await this.getMyCart(userId);
		const { id: productId } = await this.productService.getProductById(dto.productId);

		await this.prisma.cartItem.create({
			data: {
				product: { connect: { id: productId } },
				quantity: dto.quantity,
				priceInUSD: dto.priceInUSD,
				cart: { connect: { id: cartId } },
			},
		});

		return this.countTotalPrice(cartId);
	}

	async removeCartItem(id: string): Promise<boolean> {
		const { id: itemId } = await this.prisma.cartItem.findUnique({ where: { id }, select: { id: true } });

		if (!itemId) throw new NotFoundException("Cart item not found"); // TODO: Add proper exception

		const { cartId } = await this.prisma.cartItem.delete({ where: { id: itemId }, select: { cartId: true } });

		return this.countTotalPrice(cartId);
	}

	async clearCartByUId(userId: string): Promise<boolean> {
		const { id: cartId } = await this.getMyCart(userId);

		await this.prisma.cartItem.deleteMany({ where: { cartId } });

		await this.prisma.cart.update({
			where: { id: cartId },
			data: { totalPrice: 0 },
		});

		return true;
	}

	private async countTotalPrice(cartId: string): Promise<boolean> {
		const totalPrice = await this.prisma.cartItem.aggregate({
			where: { cartId },
			_sum: { priceInUSD: true },
		});

		if (totalPrice) {
			await this.prisma.cart.update({
				where: { id: cartId },
				data: { totalPrice: totalPrice._sum.priceInUSD },
			});
		} else return false;

		return true;
	}
}
