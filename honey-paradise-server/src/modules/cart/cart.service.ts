import {
	ConflictException,
	HttpStatus,
	ServiceUnavailableException
} from "@nestjs/common"
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator"
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception"
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception"
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception"
import { ConfigService } from "@nestjs/config/dist/config.service"
import { EnumCurrencies, EnumDiscountType, EnumUserRoles } from "@prisma/client"
import type { Response } from "express"
import * as fs from "fs"
import { I18nService } from "nestjs-i18n"
import * as path from "path"
import { PrismaService } from "src/core/prisma/prisma.service"
import {
	cartDefaultOutput,
	cartItemDefaultOutput,
	cartItemProductVariantOutput
} from "src/shared/lib/prisma/outputs/cart.output"
import { createCartTable } from "src/shared/lib/tables/create-cart-table"

import { FavoritesProductsService } from "../products/services/favorites-products.service"
import { ProductsService } from "../products/services/products.service"
import { PromoCodesService } from "../promocodes/promocodes.service"

import type { AddCartItemDto } from "./dto/add-cart-item.dto"
import {
	UpdateQuantityDto,
	UpdateQuantityType
} from "./dto/update-quantity.dto"
import type { GetMyCartResponse } from "./response/get-my-cart.res"
import type { CartExcelModelResponse } from "./types/cart-excel-model.type"

interface ICountTotalPriceResponse {
	price: number
	weight: number
}

@Injectable()
export class CartService {
	constructor(
		private readonly config: ConfigService,
		private readonly prisma: PrismaService,
		private readonly i18n: I18nService,
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
									productVariant: {
										select: cartItemProductVariantOutput
									}
								},
								orderBy: { createdAt: "desc" }
							}
						}
					}
				}
			})

			if (!cart) throw new NotFoundException("Cart not found") // TODO translation

			const { discount, freeDelivery } =
				await this.promoCodesService.countDiscounts(cart.id)

			return {
				...cart,
				deliveryPrice: freeDelivery ? 0 : 100,
				discount,
				length: cart._count.cartItems,
				currency: settings.defaultCurrency || EnumCurrencies.DOLLAR
			}
		} catch (error) {
			console.log(error)
		}
	}

	async addCartItem(userId: string, dto: AddCartItemDto): Promise<boolean> {
		try {
			const { id: cartId, user } = await this.getCartByUId(userId)

			const cartItem = await this.prisma.cartItem.findFirst({
				where: { cartId, productVariantId: dto.variantId },
				select: { id: true }
			})

			if (cartItem)
				throw new ConflictException(
					"Cart item with this product variant is already exists"
				)

			const {
				id,
				product: { discounts },
				priceInUsd,
				weight
			} = await this.prisma.productVariant.findUnique({
				where: { id: dto.variantId },
				select: {
					id: true,
					priceInUsd: true,
					weight: true,
					product: {
						select: {
							id: true,
							discounts: { select: { discount: true, type: true } }
						}
					}
				}
			})

			const allowedRoles = [
				EnumUserRoles.ADMIN,
				EnumUserRoles.VIP
			] as EnumUserRoles[]

			const totalDiscount = discounts.reduce((acc, { discount, type }) => {
				if (type === EnumDiscountType.VIP_CLUB) {
					if (!allowedRoles.includes(user.role)) return acc
				}
				return acc + discount
			}, 0)

			await this.prisma.cartItem.create({
				data: {
					productVariant: { connect: { id } },
					cart: { connect: { id: cartId } },
					quantity: dto.quantity,
					priceInUSD: priceInUsd - priceInUsd * totalDiscount,
					weight
				}
			})

			return this.countTotalPrice(cartId)
		} catch (error) {
			console.log(error)
			throw new InternalServerErrorException("Failed to add cart item")
		}
	}

	async addFavoritesToCart(userId: string): Promise<boolean> {
		throw new ServiceUnavailableException("Service now not working!")

		const favorites =
			await this.productFavoritesService.getFavoritesProducts(userId)

		if (favorites.products.length === 0)
			throw new BadRequestException("No products in favorites") // TODO translation

		// for (const { id, priceInUsd } of favorites.products) {
		// 	await this.addCartItem(userId, {
		// 		productId: id,
		// 		quantity: 1
		// 	})
		// }

		return true
	}

	async updateCartItem(dto: UpdateQuantityDto): Promise<boolean> {
		const { cartItemId, type } = dto

		const cartItem = await this.prisma.cartItem.findUnique({
			where: { id: cartItemId },
			select: { id: true, quantity: true, cartId: true }
		})

		if (!cartItem) throw new NotFoundException("Cart item not found") // TODO Add translation
		const { id, quantity, cartId } = cartItem

		if (type === UpdateQuantityType.decrease && quantity <= 1)
			throw new BadRequestException("Quantity can't be less than 1") // TODO Add translation

		await this.prisma.cartItem.update({
			where: { id },
			data: {
				quantity:
					type === UpdateQuantityType.increase
						? { increment: 1 }
						: { decrement: 1 }
			}
		})

		return this.countTotalPrice(cartId)
	}

	async removeCartItem(id: string): Promise<boolean> {
		const { id: itemId } = await this.prisma.cartItem.findUnique({
			where: { id },
			select: { id: true }
		})

		if (!itemId) throw new NotFoundException("Cart item not found") // TODO: Add proper exception

		const { cartId } = await this.prisma.cartItem.delete({
			where: { id: itemId },
			select: { cartId: true }
		})

		return this.countTotalPrice(cartId)
	}

	async clearCartByUId(
		userId: string,
		fromOrder: boolean = false
	): Promise<boolean> {
		const { id: cartId, promoTokens } = await this.getCartByUId(userId)

		if (fromOrder)
			await this.promoCodesService.setStatusToIds(promoTokens, "USED")

		await this.prisma.cart.update({
			where: { id: cartId },
			data: {
				totalPrice: 0,
				cartItems: { set: [] },
				promoTokens: fromOrder ? [] : undefined
			},
			select: { promoTokens: true }
		})

		return true
	}

	async getCartExcelTable(
		userId: string,
		res: Response,
		lang: string
	): Promise<void> {
		try {
			const cart: CartExcelModelResponse = await this.prisma.cart.findUnique({
				where: { userId },
				select: {
					id: true,
					totalPrice: true,
					user: { select: { username: true } },
					cartItems: {
						select: {
							id: true,
							quantity: true,
							priceInUSD: true,
							weight: true,
							productVariant: {
								select: {
									art: true,
									product: {
										select: {
											title: true,
											slug: true,
											category: {
												select: {
													title: true,
													slug: true
												}
											}
										}
									}
								}
							}
						},
						orderBy: {
							productVariant: { product: { slug: "asc" } }
						}
					},
					_count: {
						select: {
							cartItems: true
						}
					}
				}
			})

			const clientUrl = this.config.get("CLIENT_URL") || ""
			const workbook = createCartTable(clientUrl, this.i18n, lang, cart)

			const uploadDir = path.join("public", "assets", "tables", "cart")
			const filepath = path.join(uploadDir, `${cart.id}.xlsx`)

			await workbook.xlsx.writeFile(filepath)

			res.setHeader(
				"Content-disposition",
				`attachment; filename=user-cart-table.xlsx`
			)
			res.setHeader("Content-type", `application/xlsx`)

			const content = fs.readFileSync(filepath)

			res.status(HttpStatus.OK).send(content)

			fs.unlinkSync(filepath)
		} catch (error) {
			console.error(error)
			throw new InternalServerErrorException("Error while creating table!", {
				cause: error
			})
		}
	}

	private async getCartByUId(userId: string) {
		const cart = await this.prisma.cart.findUnique({
			where: { userId },
			select: {
				id: true,
				promoTokens: true,
				user: { select: { id: true, role: true } }
			}
		})

		if (!cart) throw new NotFoundException("Cart not found") // TODO: translation

		return cart
	}

	private async countTotalPrice(cartId: string): Promise<boolean> {
		const total: ICountTotalPriceResponse[] = await this.prisma.$queryRaw`
			SELECT
				COALESCE(SUM(price_usd * quantity), 0) AS "price",
				COALESCE(SUM(weight * quantity), 0) AS "weight"
			FROM "cart_items"
			WHERE (cart_id)::text = ${cartId}
			LIMIT 1;
		`

		if (total.length) {
			await this.prisma.cart.update({
				where: { id: cartId },
				data: { totalPrice: parseFloat(String(total[0].price)) }
			})
		} else return false

		return true
	}
}
