import type { CreateDiscountDto } from "../dto/create-discount.dto";
import type { GetAllDiscountsResponse } from "../response/get-all-discounts.res";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { PrismaService } from "src/core/prisma/prisma.service";
import { discountDefaultOutput } from "src/shared/lib/prisma/outputs/discount.output";

@Injectable()
export class DiscountsService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll(): Promise<GetAllDiscountsResponse[]> {
		const discounts = await this.prisma.discount.findMany({
			where: { products: { every: { id: { not: null } } } },
			select: discountDefaultOutput,
			orderBy: { expiresAt: "asc", createdAt: "desc" },
		});

		return discounts;
	}

	async deleteByIds(ids: string[]): Promise<boolean> {
		const discount = await this.prisma.discount.findMany({ where: { id: { in: ids } }, select: { id: true } });

		if (discount.length < 1) throw new NotFoundException("Discount not found");

		await this.prisma.discount.deleteMany({ where: { id: { in: discount.map(({ id }) => id) } } });

		return true;
	}

	async create(dto: CreateDiscountDto): Promise<boolean> {
		const { discount, type, productIds } = dto;

		try {
			await this.prisma.discount.create({
				data: {
					discount,
					type,
					products: { connect: productIds.map(id => ({ id })) },
				},
			});

			return true;
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}
}
