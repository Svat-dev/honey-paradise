import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Get, Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body } from "@nestjs/common/decorators/http/route-params.decorator";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import { ApiBody } from "@nestjs/swagger";
import { ApiOperation } from "@nestjs/swagger/dist/decorators/api-operation.decorator";
import { ApiOkResponse } from "@nestjs/swagger/dist/decorators/api-response.decorator";
import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator";
import { Authorization } from "src/shared/decorators/auth.decorator";
import { EnumApiRoute } from "src/shared/lib/common/constants";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductsService } from "./products.service";
import { GetCatsWithProductsResponse } from "./response/get-all-products.res";

@ApiTags("Products & Categories")
@Controller(EnumApiRoute.PRODUCTS)
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@ApiOperation({ summary: "Get all categories with products", description: "" })
	@ApiOkResponse({ type: GetCatsWithProductsResponse })
	@HttpCode(HttpStatus.OK)
	@Get(EnumApiRoute.GET_ALL_PRODUCTS)
	getAllCatsWithProducts() {
		return this.productsService.getAll();
	}

	@ApiOperation({ summary: "Create a new product", description: "" })
	@ApiOkResponse({ type: Boolean, example: true })
	@ApiBody({ type: CreateProductDto })
	@HttpCode(HttpStatus.OK)
	@Authorization("ADMIN")
	@Post(EnumApiRoute.CREATE_NEW_PRODUCT)
	createNewProduct(@Body() dto: CreateProductDto) {
		return this.productsService.createProduct(dto);
	}
}
