import { ParseUUIDPipe } from "@nestjs/common"
import { Controller } from "@nestjs/common/decorators/core/controller.decorator"
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator"
import {
	Get,
	Patch,
	Post
} from "@nestjs/common/decorators/http/request-mapping.decorator"
import {
	Body,
	Param,
	Query,
	Req
} from "@nestjs/common/decorators/http/route-params.decorator"
import { HttpStatus } from "@nestjs/common/enums/http-status.enum"
import { ApiBody, ApiParam } from "@nestjs/swagger"
import { ApiOperation } from "@nestjs/swagger/dist/decorators/api-operation.decorator"
import { ApiOkResponse } from "@nestjs/swagger/dist/decorators/api-response.decorator"
import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator"
import {
	SkipThrottle,
	Throttle
} from "@nestjs/throttler/dist/throttler.decorator"
import type { Request } from "express"
import { I18nLang } from "nestjs-i18n"
import { Authorization } from "src/shared/decorators/auth.decorator"
import { Authorized } from "src/shared/decorators/authorized.decorator"
import { EnumApiRoute } from "src/shared/lib/common/constants"
import { ms } from "src/shared/lib/common/utils"
import { ProductsIdsParserPipe } from "src/shared/pipes/products-ids-parser.pipe"

import { CreateProductDto } from "./dto/create-product.dto"
import {
	GetPresearchDataQueryDto,
	GetProductsQueryDto
} from "./dto/search-products-query.dto"
import { GetCatsWithProductsResponse } from "./response/get-all-products.res"
import { GetFavoriteProductsResponse } from "./response/get-favorite-products.res"
import {
	GetProductBySlugResponse,
	GetProductResponse
} from "./response/get-product.res"
import { GetPresearchDataResponse } from "./response/get-products-by-term.res"
import { GetProductsRatingResponse } from "./response/get-products-rating.res"
import { FavoritesProductsService } from "./services/favorites-products.service"
import { ProductsService } from "./services/products.service"

@ApiTags("Products & Categories")
@SkipThrottle({ auth: true })
@Controller(EnumApiRoute.PRODUCTS)
export class ProductsController {
	constructor(
		private readonly productsService: ProductsService,
		private readonly favoritesService: FavoritesProductsService
	) {}

	@ApiOperation({
		summary: "Get all categories with products",
		description: ""
	})
	@ApiOkResponse({ type: GetCatsWithProductsResponse })
	@ApiParam({
		name: "q",
		description: "Search query parameter",
		required: false
	})
	@Throttle({ default: { limit: 150, ttl: ms("1min") } })
	@HttpCode(HttpStatus.OK)
	@Get(EnumApiRoute.GET_ALL_PRODUCTS)
	getAllCatsWithProducts(
		@Query() query: GetProductsQueryDto,
		@Req() req: Request,
		@I18nLang() lang: "en" | "ru"
	) {
		const userId = req.session?.userId || ""
		return this.productsService.getAllCatsWithProducts(query.q, lang, userId)
	}

	@ApiOperation({ summary: "Get products by searching query", description: "" })
	@ApiOkResponse({ type: GetPresearchDataResponse })
	@ApiParam({
		name: "q",
		type: String,
		description: "Search query parameter",
		required: true
	})
	@Throttle({ default: { limit: 150, ttl: ms("1min") } })
	@HttpCode(HttpStatus.OK)
	@Get(EnumApiRoute.GET_PRESEARCH_DATA)
	getPresearchData(
		@Query() query: GetPresearchDataQueryDto,
		@I18nLang() lang: "en" | "ru"
	) {
		return this.productsService.getBySearchTerm(query.q, lang)
	}

	@ApiOperation({
		summary: "Get popular products",
		description: "Rating more or equal than (>=) 4.5"
	})
	@ApiOkResponse({ type: GetProductResponse, isArray: true })
	@HttpCode(HttpStatus.OK)
	@Get(EnumApiRoute.GET_POPULAR_PRODUCTS)
	getPopular(@Req() req: Request) {
		const userId = req.session?.userId || ""

		return this.productsService.getPopularProducts(userId)
	}

	@ApiOperation({
		summary: "Get product by slug",
		description: "It'll be showed on product page"
	})
	@ApiOkResponse({ type: GetProductBySlugResponse })
	@HttpCode(HttpStatus.OK)
	@Get(EnumApiRoute.GET_PRODUCT_BY_SLUG)
	getBySlug(@Param("slug") slug: string, @Req() req: Request) {
		const userId = req.session?.userId || ""

		return this.productsService.getProductBySlug(slug, userId)
	}

	@ApiOperation({
		summary: "Get products by their ids",
		description: " "
	})
	@ApiOkResponse({ type: GetProductResponse, isArray: true })
	@HttpCode(HttpStatus.OK)
	@Get(EnumApiRoute.GET_PRODUCTS_BY_IDS)
	getByIds(
		@Query("ids", ProductsIdsParserPipe) ids: string[],
		@Req() req: Request
	) {
		const userId = req.session?.userId || ""

		return this.productsService.getProductsByIds(ids, userId)
	}

	@ApiOperation({ summary: "Get products by category slug", description: "" })
	@ApiOkResponse({ type: GetProductResponse, isArray: true })
	@HttpCode(HttpStatus.OK)
	@Get(EnumApiRoute.GET_BY_CATEGORY_SLUG)
	getByCategorySlug(
		@Param("slug") slug: string,
		@I18nLang() lang: "en" | "ru",
		@Req() req: Request
	) {
		const userId = req.session?.userId || ""
		return this.productsService.getProductsByCategorySlug(slug, lang, userId)
	}

	@ApiOperation({ summary: "Get favorite user's products", description: "" })
	@ApiOkResponse({ type: GetFavoriteProductsResponse })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Get(EnumApiRoute.FAVORITES_PRODUCTS)
	getFavoriteProducts(@Authorized("id") userId: string) {
		return this.favoritesService.getFavoritesProducts(userId)
	}

	@ApiOperation({ summary: "Get product rating", description: "" })
	@ApiOkResponse({ type: GetProductsRatingResponse })
	@HttpCode(HttpStatus.OK)
	@Get(EnumApiRoute.GET_PRODUCT_RATING)
	getProductRating(@Param("slug") slug: string) {
		return this.productsService.getProductRating(slug)
	}

	@ApiOperation({ summary: "Create a new product", description: "" })
	@ApiOkResponse({ type: Boolean, example: true })
	@ApiBody({ type: CreateProductDto })
	@HttpCode(HttpStatus.OK)
	@Authorization("ADMIN")
	@Throttle({ default: { limit: 3, ttl: ms("1min") } })
	@Post(EnumApiRoute.CREATE_NEW_PRODUCT)
	createNewProduct(@Body() dto: CreateProductDto) {
		return this.productsService.createProduct(dto)
	}

	@ApiOperation({
		summary: "Add/delete products in favorites",
		description: ""
	})
	@ApiOkResponse({ type: Boolean, example: true })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Patch(`${EnumApiRoute.SWITCH_FAVORITES_PRODUCTS}/:productId`)
	switchFavoritesProducts(
		@Authorized("id") userId: string,
		@Param("productId", new ParseUUIDPipe({ version: "4" })) productId: string
	) {
		return this.favoritesService.switchFavoritesProducts(productId, userId)
	}

	@ApiOperation({ summary: "Clear all favorites products", description: "" })
	@ApiOkResponse({ type: Boolean, example: true })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Patch(EnumApiRoute.CLEAR_FAVORITES_PRODUCTS)
	clearFavoritesProducts(@Authorized("id") userId: string) {
		return this.favoritesService.clearFavoritesProducts(userId)
	}
}
