import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";
import { ConflictException } from "@nestjs/common/exceptions/conflict.exception";
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { EnumPromoTokensStatus } from "@prisma/client";
import { PrismaService } from "src/core/prisma/prisma.service";
import { CreatePromoCodeDto } from "./dto/create-promocode.dto";
import type { UsePromoCodeDto } from "./dto/use-promocode.dto";

@Injectable()
export class PromoCodesService {
	constructor(private readonly prisma: PrismaService) {}

	async createPromoCode(dto: CreatePromoCodeDto): Promise<boolean> {
		if (new Date(dto.expiresAt) < new Date()) throw new BadRequestException("Expires at must be in the future"); // TODO: translation

		const token = await this.prisma.promoToken.findUnique({
			where: { token: dto.token },
		});

		if (token) throw new BadRequestException("Promo token with this code already exists"); // TODO: translation

		await this.prisma.promoToken.create({
			data: {
				...dto,
				token: dto.token ? dto.token : undefined,
				expiresAt: new Date(dto.expiresAt),
			},
		});

		return true;
	}

	async usePromoCode(userId: string, dto: UsePromoCodeDto): Promise<boolean> {
		const { birthdate, _count, cart } = await this.prisma.user.findUnique({
			where: { id: userId },
			select: { birthdate: true, _count: { select: { orders: true } }, cart: { select: { id: true, promoTokens: true } } },
		});

		if (!cart) throw new NotFoundException("Cart not found"); // TODO: translation

		const token = await this.prisma.promoToken.findUnique({
			where: { token: dto.code },
			select: { id: true, type: true, status: true, expiresAt: true },
		});

		if (!token) throw new NotFoundException("Promo code not found"); // TODO: translation

		if (token.status === "APPLIED" || token.status === "USED") throw new ConflictException("Promo code is already applied or used"); // TODO: translation

		if (token.expiresAt < new Date() || token.status === "EXPIRED") throw new ConflictException("Promo code is expired"); // TODO: translation

		if (token.type === "BIRTHDAY") {
			if (!birthdate) throw new ConflictException("You don't have birthdate"); // TODO: translation

			const month = birthdate.getMonth();
			const day = birthdate.getDate();
			const today = new Date();

			if (month !== today.getMonth() || day !== today.getDate()) throw new ConflictException("You don't have birthday today!"); // TODO: translation
		} else if (token.type === "FIRST_ORDER") {
			if (_count.orders > 0) throw new ConflictException("You have more than one order!"); // TODO: translation
		} else if (token.type === "NEW_YEAR") {
			const year = new Date().getFullYear();
			const startDate = new Date(year, 11, 17, 0, 0, 0);
			const endDate = new Date(year, 11, 31, 23, 59, 59);

			if (startDate > new Date() || endDate < new Date()) throw new ConflictException("Promo code is not valid now"); // TODO: translation
		} else if (token.type === "SHOP_BIRTHDAY") {
			const year = new Date().getFullYear();
			const startDate = new Date(year, 6, 1, 0, 0, 0);
			const endDate = new Date(year, 6, 9, 0, 0, 0);

			if (startDate > new Date() || endDate < new Date()) throw new ConflictException("Promo code is not valid now"); // TODO: translation
		}

		await this.prisma.cart.update({
			where: { id: cart.id },
			data: { promoTokens: { push: token.id } },
		});

		if (token.type === "PERSONAL")
			await this.prisma.promoToken.update({
				where: { id: token.id },
				data: { status: "APPLIED" },
			});

		return true;
	}

	async deletePromoCode(id: string): Promise<boolean> {
		const token = await this.prisma.promoToken.findUnique({ where: { id } });

		if (!token) throw new NotFoundException("Promo token not found"); // TODO: translation

		await this.prisma.promoToken.delete({ where: { id } });

		return true;
	}

	async countDiscounts(cartId: string): Promise<{ discount: number; freeDelivery: boolean }> {
		try {
			const { promoTokens: tokensIds } = await this.prisma.cart.findUnique({
				where: { id: cartId },
				select: { promoTokens: true },
			});

			const promoTokens = await this.prisma.promoToken.findMany({
				where: { id: { in: tokensIds }, status: { notIn: ["EXPIRED", "USED"] } },
				select: { type: true, discountType: true, discount: true },
			});

			let response = { discount: 0, freeDelivery: false };

			if (promoTokens.length < 1) return response;

			for (const token of promoTokens) {
				if (token.type === "FREE_DELIVERY") {
					response.freeDelivery = true;
					continue;
				}

				if (token.discountType === "ALL") {
					response.discount += token.discount;
					continue;
				}
			}

			return response;
		} catch (error) {
			throw new InternalServerErrorException(error); // TODO: translate error
		}
	}

	async setStatusToIds(ids: string[], status: EnumPromoTokensStatus): Promise<boolean> {
		const data = await this.prisma.promoToken.findMany({
			where: { id: { in: ids } },
			select: { id: true },
		});

		await this.prisma.promoToken.updateMany({
			where: { id: { in: data.map(({ id }) => id) } },
			data: { status },
		});

		return true;
	}
}
