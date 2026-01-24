import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { PrismaService } from "src/core/prisma/prisma.service";
import { ProfileService } from "src/modules/auth/profile/profile.service";
import type { GetFavoriteProductsResponse } from "../response/get-favorite-products.res";
import { ProductsService } from "./products.service";

@Injectable()
export class FavoritesProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly profileService: ProfileService,
    private readonly productsService: ProductsService,
  ) {}

  async getFavoritesProducts(
    userId: string,
  ): Promise<GetFavoriteProductsResponse> {
    try {
      const query: any[] = await this.prisma.$queryRaw`
				SELECT p."id", p."title", p."slug", p."price_usd" AS "priceInUsd", p."image_urls" AS "images"
				FROM "products" p
				WHERE EXISTS (
					SELECT 1
					FROM "users" u
					WHERE u."id" = (${userId})::uuid AND (p."id")::text = ANY(u."liked_products")
				)
			`;

      const total = query.reduce(
        (acc, product) => acc + product?.priceInUsd,
        0,
      );

      return {
        products: query,
        length: query.length,
        total,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async switchFavoritesProducts(
    productId: string,
    userId: string,
  ): Promise<boolean> {
    const product = await this.productsService.getProductsByIds(productId);

    if (!product) throw new NotFoundException("Product not found!"); // TODO: translate

    await this.prisma.$queryRaw`
			UPDATE "users"
			SET "liked_products" = CASE
				WHEN NOT ((${product.id})::text = ANY("liked_products")) THEN
					array_append("liked_products", (${product.id})::text)
				ELSE
					array_remove("liked_products", (${product.id})::text)
			END
			WHERE "id" = (${userId})::uuid
		`;

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
