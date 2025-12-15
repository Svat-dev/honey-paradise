import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { PrismaService } from "src/core/prisma/prisma.service";
import { ProfileService } from "src/modules/auth/profile/profile.service";
import type { GetFavoriteProductsResponse } from "../response/get-favorite-products.res";
import { ProductsService } from "./products.service";

@Injectable()
export class FavoritesProductsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly profileService: ProfileService,
		private readonly productsService: ProductsService
	) {}

	async getFavoritesProducts(userId: string): Promise<GetFavoriteProductsResponse> {
		const user = await this.profileService.getProfile(userId, "id");

		const products = await this.prisma.product.findMany({
			where: { id: { in: user.likedProductIds } },
			select: {
				id: true,
				title: true,
				slug: true,
				priceInUsd: true,
				images: true,
			},
		});

		const { _sum } = await this.prisma.product.aggregate({
			where: { id: { in: user.likedProductIds } },
			_sum: { priceInUsd: true },
		});

		return {
			products,
			length: products.length,
			total: _sum.priceInUsd || 0,
		};
	}

	async switchFavoritesProducts(productId: string, userId: string): Promise<boolean> {
		const user = await this.profileService.getProfile(userId, "id");
		const product = await this.productsService.getProductsByIds(productId);

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
}
