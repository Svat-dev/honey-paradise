import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { EnumCurrencies } from "@prisma/client";
import { PrismaService } from "src/core/prisma/prisma.service";
import { cartDefaultOutput, cartItemDefaultOutput, cartItemProductOutput } from "src/shared/lib/prisma/outputs/cart.output";
import { FavoritesProductsService } from "../products/services/favorites-products.service";
import { ProductsService } from "../products/services/products.service";
import { PromoCodesService } from "../promocodes/promocodes.service";
import type { AddCartItemDto } from "./dto/add-cart-item.dto";
import { UpdateQuantityType, type UpdateQuantityDto } from "./dto/update-quantity.dto";
import type { GetMyCartResponse } from "./response/get-my-cart.res";

@Injectable()
export class CartService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly productService: ProductsService,
		private readonly productFavoritesService: FavoritesProductsService,
		private readonly promoCodesService: PromoCodesService
	) {}

	async getMyCart(userId: string): Promise<GetMyCartResponse> {
		try {
			const { settings, cart } = await this.prisma.user.findUnique({
				where: { id: userId },
				select: {
					settings: { select: { defaultCurrency: true } },
					cart: {
						select: {
							...cartDefaultOutput,
							cartItems: {
								select: {
									...cartItemDefaultOutput,
									product: { select: cartItemProductOutput },
								},
								orderBy: { createdAt: "desc" },
							},
						},
					},
				},
			});

			if (!cart) throw new NotFoundException("Cart not found"); // TODO translation

			const { discount, freeDelivery } = await this.promoCodesService.countDiscounts(cart.id);

			return {
				...cart,
				deliveryPrice: freeDelivery ? 0 : 100,
				discount,
				length: cart._count.cartItems,
				currency: settings.defaultCurrency || EnumCurrencies.DOLLAR,
			};
		} catch (error) {
			console.log(error);
		}
	}

	async addCartItem(userId: string, dto: AddCartItemDto): Promise<boolean> {
		const { id: cartId } = await this.getCartByUId(userId);
		const { id: productId } = await this.productService.getProductsByIds(dto.productId);

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

	async addFavoritesToCart(userId: string): Promise<boolean> {
		const favorites = await this.productFavoritesService.getFavoritesProducts(userId);

		if (favorites.products.length === 0) throw new BadRequestException("No products in favorites"); // TODO translation

		for (const { id, priceInUsd } of favorites.products) {
			await this.addCartItem(userId, {
				productId: id,
				priceInUSD: priceInUsd,
				quantity: 1,
			});
		}

		return true;
	}

	async updateCartItem(dto: UpdateQuantityDto): Promise<boolean> {
		const { cartItemId, type } = dto;

		const cartItem = await this.prisma.cartItem.findUnique({
			where: { id: cartItemId },
			select: { id: true, quantity: true, cartId: true },
		});

		if (!cartItem) throw new NotFoundException("Cart item not found"); // TODO Add translation
		const { id, quantity, cartId } = cartItem;

		if (type === UpdateQuantityType.decrease && quantity <= 1) throw new BadRequestException("Quantity can't be less than 1"); // TODO Add translation

		await this.prisma.cartItem.update({
			where: { id },
			data: {
				quantity: type === UpdateQuantityType.increase ? { increment: 1 } : { decrement: 1 },
			},
		});

		return this.countTotalPrice(cartId);
	}

	async removeCartItem(id: string): Promise<boolean> {
		const { id: itemId } = await this.prisma.cartItem.findUnique({
			where: { id },
			select: { id: true },
		});

		if (!itemId) throw new NotFoundException("Cart item not found"); // TODO: Add proper exception

		const { cartId } = await this.prisma.cartItem.delete({
			where: { id: itemId },
			select: { cartId: true },
		});

		return this.countTotalPrice(cartId);
	}

	async clearCartByUId(userId: string, formOrder: boolean = false): Promise<boolean> {
		const { id: cartId, promoTokens } = await this.getCartByUId(userId);

		if (formOrder) await this.promoCodesService.setStatusToIds(promoTokens, "USED");

		await this.prisma.cart.update({
			where: { id: cartId },
			data: { totalPrice: 0, cartItems: { set: [] }, promoTokens: formOrder ? [] : undefined },
			select: { promoTokens: true },
		});

		return true;
	}

	private async getCartByUId(userId: string) {
		const cart = await this.prisma.cart.findUnique({
			where: { userId },
			select: { id: true, promoTokens: true },
		});

		if (!cart) throw new NotFoundException("Cart not found"); // TODO: translation

		return cart;
	}

	private async countTotalPrice(cartId: string): Promise<boolean> {
		const total: { price: number }[] = await this.prisma.$queryRaw`
 			SELECT COALESCE(SUM("price_usd" * "quantity"), 0) AS "price"
			FROM "cart_items"
			WHERE ("cart_id")::text LIKE ${cartId}
			LIMIT 1;
		`;

		if (total.length) {
			await this.prisma.cart.update({
				where: { id: cartId },
				data: { totalPrice: parseFloat(String(total[0].price)) },
			});
		} else return false;

		return true;
	}
}
