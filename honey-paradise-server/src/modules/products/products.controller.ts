import { ParseUUIDPipe } from "@nestjs/common";
import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Get, Patch, Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body, Param, Query, Req } from "@nestjs/common/decorators/http/route-params.decorator";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import { ApiBody, ApiParam } from "@nestjs/swagger";
import { ApiOperation } from "@nestjs/swagger/dist/decorators/api-operation.decorator";
import { ApiOkResponse } from "@nestjs/swagger/dist/decorators/api-response.decorator";
import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator";
import { SkipThrottle, Throttle } from "@nestjs/throttler/dist/throttler.decorator";
import type { Request } from "express";
import { Authorization } from "src/shared/decorators/auth.decorator";
import { Authorized } from "src/shared/decorators/authorized.decorator";
import { EnumApiRoute } from "src/shared/lib/common/constants";
import { ms } from "src/shared/lib/common/utils";
import { EnumStorageKeys } from "src/shared/types/client/enums.type";
import { CreateProductDto } from "./dto/create-product.dto";
import { GetPresearchDataQueryDto, GetProductsQueryDto } from "./dto/search-products-query.dto";
import { ProductsService } from "./products.service";
import { GetAllProductsResponse, GetCatsWithProductsResponse } from "./response/get-all-products.res";
import { GetPresearchDataResponse } from "./response/get-products-by-term.res";

@ApiTags("Products & Categories")
@SkipThrottle({ auth: true })
@Controller(EnumApiRoute.PRODUCTS)
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@ApiOperation({ summary: "Get all categories with products", description: "" })
	@ApiOkResponse({ type: GetCatsWithProductsResponse })
	@ApiParam({ name: "q", description: "Search query parameter", required: false })
	@Throttle({ default: { limit: 150, ttl: ms("1min") } })
	@HttpCode(HttpStatus.OK)
	@Get(EnumApiRoute.GET_ALL_PRODUCTS)
	getAllCatsWithProducts(@Query() query: GetProductsQueryDto, @Req() req: Request) {
		const lang = req.cookies[EnumStorageKeys.LOCALE_LANGUAGE] || "en";

		return this.productsService.getAllCatsWithProducts(query.q, lang);
	}

	@ApiOperation({ summary: "Get products by searching query", description: "" })
	@ApiOkResponse({ type: GetPresearchDataResponse })
	@ApiParam({ name: "q", type: String, description: "Search query parameter", required: true })
	@Throttle({ default: { limit: 150, ttl: ms("1min") } })
	@HttpCode(HttpStatus.OK)
	@Get(EnumApiRoute.GET_PRESEARCH_DATA)
	getPresearchData(@Query() query: GetPresearchDataQueryDto, @Req() req: Request) {
		const lang = req.cookies[EnumStorageKeys.LOCALE_LANGUAGE] || "en";

		return this.productsService.getBySearchTerm(query.q, lang);
	}

	@ApiOperation({ summary: "Get popular products", description: "Rating more or equal than (>=) 4.5" })
	@ApiOkResponse({ type: GetAllProductsResponse })
	@HttpCode(HttpStatus.OK)
	@Get(EnumApiRoute.GET_POPULAR_PRODUCTS)
	getPopular() {
		return this.productsService.getPopularProducts();
	}

	@ApiOperation({ summary: "Get products by category slug", description: "" })
	@ApiOkResponse({ type: GetAllProductsResponse })
	@HttpCode(HttpStatus.OK)
	@Get(EnumApiRoute.GET_BY_CATEGORY_SLUG)
	getByCategorySlug(@Param("slug") slug: string) {
		return this.productsService.getProductsByCategorySlug(slug);
	}

	@ApiOperation({ summary: "Create a new product", description: "" })
	@ApiOkResponse({ type: Boolean, example: true })
	@ApiBody({ type: CreateProductDto })
	@HttpCode(HttpStatus.OK)
	@Authorization("ADMIN")
	@Throttle({ default: { limit: 3, ttl: ms("1min") } })
	@Post(EnumApiRoute.CREATE_NEW_PRODUCT)
	createNewProduct(@Body() dto: CreateProductDto) {
		return this.productsService.createProduct(dto);
	}

	@ApiOperation({ summary: "Add/delete products in favorites", description: "" })
	@ApiOkResponse({ type: Boolean, example: true })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Patch(`${EnumApiRoute.SWITCH_FAVORITES_PRODUCTS}/:productId`)
	switchFavoritesProducts(@Authorized("id") userId: string, @Param("productId", new ParseUUIDPipe({ version: "4" })) productId: string) {
		return this.productsService.switchFavoritesProducts(productId, userId);
	}

	@ApiOperation({ summary: "Clear all favorites products", description: "" })
	@ApiOkResponse({ type: Boolean, example: true })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Patch(EnumApiRoute.CLEAR_FAVORITES_PRODUCTS)
	clearFavoritesProducts(@Authorized("id") userId: string) {
		return this.productsService.clearFavoritesProducts(userId);
	}
}
