import { EnumDiscountType, EnumUserRoles } from "@prisma/client";
import { productBySlugOutput, productOutput } from "src/shared/lib/prisma/outputs/product.output";
import type { GetAllCatsResponse, GetCatsWithProductsResponse } from "../response/get-all-products.res";
import type { GetProductBySlugResponse, GetProductBySlugResponseDiscount, GetProductResponse } from "../response/get-product.res";

import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { PrismaService } from "src/core/prisma/prisma.service";
import { discountProductOutput } from "src/shared/lib/prisma/outputs/discount.output";
import type { CreateProductDto } from "../dto/create-product.dto";
import type { GetProductsRatingResponse } from "../response/get-products-rating.res";

interface IGetProductByIdsResponse {
	id: string;
	priceInUsd: number;
	discounts: GetProductBySlugResponseDiscount[];
}

@Injectable()
export class ProductsService {
	constructor(private readonly prisma: PrismaService) {}

	async getAllCatsWithProducts(searchTerm: string, lang: "en" | "ru"): Promise<GetCatsWithProductsResponse> {
		const term = searchTerm || "";

		try {
			const categories: GetAllCatsResponse[] = await this.prisma.$queryRaw`
			WITH "product_reviews" AS (
				SELECT "product_id", COUNT(*) AS reviews_count
				FROM "reviews"
				GROUP BY "product_id"
			),
			"sorted_products" AS (
				SELECT 
					p."id",
					p."title",
					p."slug",
					p."description",
					p."price_usd" AS "priceInUsd",
					p."rating",
					p."image_urls" AS images,
					p."category_id",
					COALESCE(cm."reviews_count", 0) AS reviews,
					COALESCE(
						json_agg(
							json_build_object('id', d."id", 'type', d."type", 'discount', d."discount")
						) FILTER (WHERE d."id" IS NOT NULL),
						'[]'
					) AS "discounts"
				FROM "products" p
				LEFT JOIN "product_reviews" cm ON p."id" = cm."product_id"
				LEFT JOIN "_discount_to_product" dtp ON p."id" = dtp."B"
				LEFT JOIN "discounts" d ON dtp."A" = d."id"
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
				GROUP BY p."id", COALESCE(cm."reviews_count", 0)
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

				const newProducts = cat.products.map<GetProductResponse>((p: any) => this.getProductResponse(p, true));

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
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
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

	async getPopularProducts(): Promise<GetProductResponse[]> {
		try {
			const query = await this.prisma.product.findMany({
				select: { ...productOutput.select, discounts: { select: discountProductOutput } },
				where: {
					AND: [{ rating: { gte: 4.5 } }, { rating: { lte: 5.0 } }],
				},
				orderBy: { rating: "desc" }, // TODO sort by reviewCount
				take: 4,
			});

			const products = this.getProductResponse(query, false);

			return products;
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	async getProductsByCategorySlug(slug: string, lang: "en" | "ru"): Promise<GetAllCatsResponse> {
		try {
			const category: GetAllCatsResponse[] = await this.prisma.$queryRaw`
			WITH "product_reviews" AS (
				SELECT "product_id", COUNT(*) AS reviews_count
				FROM "reviews"
				GROUP BY "product_id"
			),
			"sorted_products" AS (
				SELECT
					p."id",
					p."title",
					p."slug",
					p."description",
					p."price_usd" AS "priceInUsd",
					p."rating",
					p."image_urls" AS images,
					p."category_id",
					COALESCE(cm."reviews_count", 0) AS reviews,
					COALESCE(
						json_agg(
							json_build_object('id', d."id", 'type', d."type", 'discount', d."discount")
						) FILTER (WHERE d."id" IS NOT NULL),
						'[]'
					) AS "discounts"
				FROM "products" p
				LEFT JOIN "product_reviews" cm ON p."id" = cm."product_id"
				LEFT JOIN "_discount_to_product" dtp ON p."id" = dtp."B"
				LEFT JOIN "discounts" d ON dtp."A" = d."id"
				WHERE EXISTS (
					SELECT 1
					FROM "categories" c
					WHERE c."id" = p."category_id"
				)
				GROUP BY p."id", COALESCE(cm."reviews_count", 0)
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
			WHERE c."slug" = ${`${slug}`}
			GROUP BY c."id", c."title"
			ORDER BY c."title"->${`${lang}`} ASC
		`; //TODO infinite scroll

			if (!category) throw new NotFoundException("Category not found"); // TODO: add error message

			const { productsLength, products, ...other } = category[0];

			const newProducts = category[0].products.map<GetProductResponse>((p: any) => this.getProductResponse(p, true));

			return {
				...other,
				productsLength: parseInt(productsLength.toString()),
				products: newProducts,
			};
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	async getProductsByIds(id: string): Promise<IGetProductByIdsResponse>;
	async getProductsByIds(id: string[]): Promise<GetProductResponse[]>;
	async getProductsByIds(id: string | string[]): Promise<{ id: string } | GetProductResponse[]> {
		if (!Array.isArray(id)) {
			const product = await this.prisma.product.findUnique({
				where: { id },
				select: { id: true, priceInUsd: true, discounts: { select: discountProductOutput } },
			});

			if (!product) throw new NotFoundException("Product not found"); // TODO: add error message

			return product;
		} else {
			const query = await this.prisma.product.findMany({
				...productOutput,
				where: { id: { in: id } },
			});

			const products = this.getProductResponse(query, false);

			return products;
		}
	}

	async getProductBySlug(slug: string): Promise<GetProductBySlugResponse> {
		const product = await this.prisma.product.findUnique({ select: productBySlugOutput, where: { slug } });

		return product;
	}

	async getProductRating(slug: string): Promise<GetProductsRatingResponse> {
		const product = await this.prisma.product.findUnique({
			where: { slug },
			select: { id: true, rating: true, extraRating: true },
		});

		const result: { rating: number; count: bigint }[] = await this.prisma.$queryRaw`
			SELECT 
				COALESCE(("rating"->'common')::integer, 0) as rating,
				COUNT(*) as count 
			FROM "reviews" 
			WHERE ("rating"->'common')::integer BETWEEN 1 AND 5 
				AND ("product_id")::text = ${`${product.id}`} 
			GROUP BY ("rating"->'common')::integer 
			ORDER BY ("rating"->'common')::integer DESC;`;

		const ratingCount: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

		result.forEach(row => {
			ratingCount[row.rating] = Number(row.count);
		});

		return { rating: product.rating, extraRating: product.extraRating, count: ratingCount };
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

	private getProductResponse(query: any, fromGetAll: true, role?: EnumUserRoles): GetProductResponse;
	private getProductResponse(query: any[], fromGetAll: false, role?: EnumUserRoles): GetProductResponse[];
	private getProductResponse(query: any[], fromGetAll: boolean, role?: EnumUserRoles): GetProductResponse[] | GetProductResponse {
		const allowedRoles: EnumUserRoles[] = [EnumUserRoles.ADMIN, EnumUserRoles.VIP];

		if (fromGetAll) {
			const { category_id, reviews, discounts, ...other } = query as any;

			const totalDiscount = (discounts as any[]).reduce((acc: number, { discount, type }: any) => {
				if (type === EnumDiscountType.VIP_CLUB) {
					if (!allowedRoles.includes(role)) {
						return acc;
					}
				}
				return acc + discount;
			}, 0);

			return {
				...other,
				totalDiscount,
				_count: {
					reviews: parseInt(reviews),
				},
			};
		} else {
			const products = query.map<GetProductResponse>(({ discounts, ...item }) => ({
				...item,
				totalDiscount: discounts.reduce((acc: number, { discount, type }: any) => {
					if (type === EnumDiscountType.VIP_CLUB) {
						if (!allowedRoles.includes(role)) return acc;
					}
					return acc + discount;
				}, 0),
			}));

			return products;
		}
	}
}
