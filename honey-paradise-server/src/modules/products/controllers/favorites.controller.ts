import { Controller } from "@nestjs/common/decorators/core/controller.decorator"
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator"
import {
	Get,
	Patch
} from "@nestjs/common/decorators/http/request-mapping.decorator"
import { Param } from "@nestjs/common/decorators/http/route-params.decorator"
import { HttpStatus } from "@nestjs/common/enums/http-status.enum"
import { ApiOperation } from "@nestjs/swagger/dist/decorators/api-operation.decorator"
import { ApiOkResponse } from "@nestjs/swagger/dist/decorators/api-response.decorator"
import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator"
import { SkipThrottle } from "@nestjs/throttler/dist/throttler.decorator"
import { Authorization } from "src/shared/decorators/auth.decorator"
import { Authorized } from "src/shared/decorators/authorized.decorator"
import { EnumApiRoute } from "src/shared/lib/common/constants"
import { DefaultResponse } from "src/shared/lib/response/default.res"
import { ProductVariantIdParserPipe } from "src/shared/pipes/variant-id.parser.pipe"

import { GetFavoriteProductsResponse } from "../response/get-favorite-products.res"
import { FavoritesProductsService } from "../services/favorites-products.service"

@ApiTags("Favorites")
@SkipThrottle({ auth: true })
@Controller(EnumApiRoute.FAVORITE_PRODUCTS)
export class FavoriteProductsController {
	constructor(private readonly favoritesService: FavoritesProductsService) {}

	@ApiOperation({ summary: "Get favorite user's products", description: "" })
	@ApiOkResponse({ type: GetFavoriteProductsResponse })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Get()
	getFavoriteProducts(@Authorized("id") userId: string) {
		return this.favoritesService.getFavoritesProducts(userId)
	}

	@ApiOperation({
		summary: "Add/delete product (variant) in favorites",
		description: ""
	})
	@ApiOkResponse({ type: DefaultResponse })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Patch(EnumApiRoute.SWITCH_FAVORITES)
	switchFavoritesProducts(
		@Authorized("id") userId: string,
		@Param("vid", ProductVariantIdParserPipe) variantId: string
	) {
		return this.favoritesService.switchFavoritesProducts(variantId, userId)
	}

	@ApiOperation({ summary: "Clear all favorites products", description: "" })
	@ApiOkResponse({ type: DefaultResponse })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Patch(EnumApiRoute.CLEAR)
	clearFavoritesProducts(@Authorized("id") userId: string) {
		return this.favoritesService.clearFavoritesProducts(userId)
	}
}
