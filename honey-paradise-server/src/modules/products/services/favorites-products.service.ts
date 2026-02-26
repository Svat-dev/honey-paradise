import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator"
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception"
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception"
import { PrismaService } from "src/core/prisma/prisma.service"
import { ProfileService } from "src/modules/auth/profile/profile.service"
import { success } from "src/shared/lib/common/utils"
import { DefaultResponse } from "src/shared/lib/response/default.res"

import type { GetFavoriteProductsResponse } from "../response/get-favorite-products.res"

@Injectable()
export class FavoritesProductsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly profileService: ProfileService
	) {}

	async getFavoritesProducts(
		userId: string
	): Promise<GetFavoriteProductsResponse> {
		try {
			const query: any[] = await this.prisma.$queryRaw`
				SELECT
					p.id,
					p.title,
					p.slug,
					p.image_urls AS "images",
					pv.id AS "variantId",
					pv.art AS "article",
					pv.price_usd AS "priceInUsd",
					pv.weight
				FROM product_variants pv
				LEFT JOIN products p ON p.id = pv.product_id
				WHERE EXISTS (
					SELECT 1
					FROM users u
					WHERE u.id = (${userId})::uuid AND (pv.id)::text = ANY(u.liked_products)
				)
				GROUP BY pv.id, p.id
			`

			const total = query.reduce((acc, variant) => acc + variant?.priceInUsd, 0)

			return {
				products: query,
				length: query.length,
				total
			}
		} catch (error) {
			console.error(error)
			throw new InternalServerErrorException(
				"Failed requesting data from database!"
			)
		}
	}

	async switchFavoritesProducts(
		variantId: string,
		userId: string
	): Promise<DefaultResponse> {
		const variant = await this.prisma.productVariant.findUnique({
			where: { id: variantId },
			select: { id: true }
		})

		if (!variant) throw new NotFoundException("Variant not found!") // TODO: translate

		try {
			await this.prisma.$queryRaw`
			UPDATE users
			SET liked_products = CASE
				WHEN NOT ((${variant.id})::text = ANY(liked_products)) THEN
					array_append(liked_products, (${variant.id})::text)
				ELSE
					array_remove(liked_products, (${variant.id})::text)
			END
			WHERE id = (${userId})::uuid
		`
		} catch (error) {
			console.error(error)
			throw new InternalServerErrorException(
				"Failed requesting data from database!"
			)
		}

		return success()
	}

	async clearFavoritesProducts(userId: string): Promise<DefaultResponse> {
		const user = await this.profileService.getProfile(userId, "id")

		await this.prisma.user.update({
			where: { id: user.id },
			data: { likedProductIds: { set: [] } }
		})

		return success()
	}
}
