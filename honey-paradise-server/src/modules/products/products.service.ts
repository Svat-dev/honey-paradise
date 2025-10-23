import type { GetAllCatsResponse, GetAllProductsResponse, GetCatsWithProductsResponse } from "./response/get-all-products.res";

import type { CreateProductDto } from "./dto/create-product.dto";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { PrismaService } from "src/core/prisma/prisma.service";
import { ProfileService } from "../auth/profile/profile.service";
import { productOutput } from "src/shared/lib/prisma/outputs/product.output";

@Injectable()
export class ProductsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly profileService: ProfileService
	) {}

	async getAllCatsWithProducts(searchTerm: string, lang: "en" | "ru"): Promise<GetCatsWithProductsResponse> {
		const term = searchTerm || "";

		const categories: GetAllCatsResponse[] = await this.prisma.$queryRaw`
			WITH "product_comments" AS (
				SELECT "product_id", COUNT(*) AS comments_count 
				FROM "commentaries" 
				GROUP BY "product_id"
			),
			"sorted_products" AS (
				SELECT p."id", p."title", p."slug", p."description", p."price_usd" AS "priceInUsd", p."rating", p."image_urls" AS images, p."category_id", COALESCE(cm."comments_count", 0) AS comments 
				FROM "products" p 
				LEFT JOIN "product_comments" cm ON p."id" = cm."product_id" 
				WHERE EXISTS (
					SELECT 1 
					FROM "categories" c 
					WHERE c."id" = p."category_id" 
						AND (
							(p."title"->'en')::text ILIKE ${`%${term}%`} OR 
							(p."title"->'ru')::text ILIKE ${`%${term}%`} OR 
							(c."title"->'en')::text ILIKE ${`%${term}%`} OR 
							(c."title"->'ru')::text ILIKE ${`%${term}%`} OR 
							p."slug" ILIKE ${`%${term}%`}
						)
				) 
				ORDER BY p."title"->${`${lang}`} ASC, p."slug" ASC
			)
			SELECT 
				c."id",
				c."title",
				c."slug",
				c."image_url" AS "image",
				COALESCE(json_agg(sp) FILTER (WHERE sp."id" IS NOT NULL), '[]') AS products,
				COUNT(sp."id") AS "productsLength" 
			FROM "categories" c 
			LEFT JOIN "sorted_products" sp ON c."id" = sp."category_id" 
			GROUP BY c."id", c."title" 
			ORDER BY COUNT(sp."id") DESC, c."title"->${`${lang}`} ASC
		`;

		const jsonCategories: GetAllCatsResponse[] = [];
		let allProductsLength = 0;

		for (const cat of categories) {
			const { productsLength, products, ...other } = cat;
			const length = parseInt(productsLength.toString());

			if (length === 0) continue;

			const newProducts = cat.products.map((product: any) => {
				const { category_id, comments, ...other } = product;

				return {
					...other,
					_count: {
						comments: parseInt(comments),
					},
				};
			});

			allProductsLength += parseInt(String(cat.productsLength));

			jsonCategories.push({
				...other,
				productsLength: length,
				products: newProducts,
			});
		}
		// TODO infinite scroll
		return {
			categories: jsonCategories,
			categoriesLength: jsonCategories.length,
			allProductsLength,
		};
	}

	async getBySearchTerm(term: string, lang: "en" | "ru"): Promise<any> {
		const products: any[] = await this.prisma.$queryRaw`
			SELECT "id", "title", "slug", "image_urls" AS "images", "price_usd" AS "priceInUsd" 
			FROM "products" 
			WHERE 
				("title"->'en')::text ILIKE ${`%${term}%`} OR 
				("title"->'ru')::text ILIKE ${`%${term}%`} OR 
				"slug" ILIKE ${`%${term}%`} OR 
				"category_id" IN (
					SELECT "id" FROM "categories" 
					WHERE 
						("title"->'en')::text ILIKE ${`%${term}%`} OR 
						("title"->'ru')::text ILIKE ${`%${term}%`} OR
						"slug" ILIKE ${`%${term}%`}
				) 
			ORDER BY "title"->${`${lang}`} ASC, "slug" ASC 
			LIMIT 6
		`;

		const categories: any[] = await this.prisma.$queryRaw`
			SELECT "id", "title", "slug", "image_url" AS "image" FROM "categories" 
			WHERE 
				("title"->'en')::text ILIKE ${`%${term}%`} OR 
				("title"->'ru')::text ILIKE ${`%${term}%`} OR 
				"slug" ILIKE ${`%${term}%`} 
			ORDER BY "title"->${`${lang}`} ASC, "slug" ASC  
			LIMIT 3
		`;

		return { products, categories };
	}

	async getPopularProducts(): Promise<GetAllProductsResponse[]> {
		const products = await this.prisma.product.findMany({
			...productOutput,
			where: {
				AND: [{ rating: { gte: 4.5 } }, { rating: { lte: 5 } }],
			},
			orderBy: { rating: "desc" },
			take: 6,
		});

		return products;
	}

	async getProductsByCategorySlug(slug: string): Promise<GetAllProductsResponse[]> {
		const category = await this.getCategoryBySlug(slug);

		if (!category) throw new NotFoundException("Category not found"); // TODO: add error message

		const products = await this.prisma.product.findMany({
			...productOutput,
			where: { categoryId: category.id },
			orderBy: { title: "asc" },
		}); //TODO infinite scroll

		return products;
	}

	async getProductById(id: string): Promise<{ id: string }> {
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

	async switchFavoritesProducts(productId: string, userId: string): Promise<boolean> {
		const user = await this.profileService.getProfile(userId, "id");
		const product = await this.getProductById(productId);

		if (!user.likedProductIds.includes(productId)) {
			await this.prisma.user.update({
				where: { id: user.id },
				data: {
					likedProductIds: { push: product.id },
				},
			});
		} else {
			const newArray = user.likedProductIds.filter(id => id !== productId) || [];

			await this.prisma.user.update({
				where: { id: user.id },
				data: {
					likedProductIds: { set: newArray },
				},
			});
		}

		return true;
	}

	async clearFavoritesProducts(userId: string): Promise<boolean> {
		const user = await this.profileService.getProfile(userId, "id");

		await this.prisma.user.update({
			where: { id: user.id },
			data: { likedProductIds: { set: [] } },
		});

		return true;
	}

	private async getCategoryBySlug(slug: string) {
		const category = await this.prisma.category.findUnique({
			where: { slug },
			select: { id: true, slug: true },
		});

		return category;
	}
}
