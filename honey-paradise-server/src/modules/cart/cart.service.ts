import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { EnumCurrencies } from "@prisma/client";
import { PrismaService } from "src/core/prisma/prisma.service";
import { cartDefaultOutput } from "src/shared/lib/prisma/outputs/cart.output";
import { ProfileService } from "../auth/profile/profile.service";
import type { GetMyCartResponse } from "./response/get-my-cart.res";

@Injectable()
export class CartService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly profileService: ProfileService
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
}
