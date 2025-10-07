import type { CreateProductDto } from "./dto/create-product.dto";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { PrismaService } from "src/core/prisma/prisma.service";
import { categoryOutput } from "src/shared/lib/prisma/outputs/category.output";

@Injectable()
export class ProductsService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll() {
		const categories = await this.prisma.category.findMany({
			select: categoryOutput,
			orderBy: { slug: "asc" },
		});

		return categories;
	}

	async getProductById(id: string) {
		const product = await this.prisma.product.findUnique({ where: { id }, select: { id: true } });

		if (!product) throw new NotFoundException("Product not found"); // TODO: add error message

		return product;
	}

	async createProduct(dto: CreateProductDto) {
		const { categoryId, ...other } = dto;

		const { id: catId } = await this.prisma.category.findUnique({
			where: { id: categoryId },
			select: { id: true },
		});

		if (!catId) throw new NotFoundException("Category not found"); // TODO: add error message

		await this.prisma.product.create({
			data: {
				...other,
				category: { connect: { id: catId } },
			},
		});

		return true;
	}
}
