import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Get } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import { Authorization } from "src/shared/decorators/auth.decorator";
import { Authorized } from "src/shared/decorators/authorized.decorator";
import { EnumApiRoute } from "src/shared/lib/common/constants";
import { CartService } from "./cart.service";
import { GetMyCartResponse } from "./response/get-my-cart.res";

@ApiTags("Carts")
@Controller(EnumApiRoute.CARTS)
export class CartController {
	constructor(private readonly cartService: CartService) {}

	@ApiOperation({ summary: "Get current user cart", description: "" })
	@ApiOkResponse({ type: GetMyCartResponse })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Get(EnumApiRoute.GET_MY_CART)
	getMyCart(@Authorized("id") userId: string) {
		return this.cartService.getMyCart(userId);
	}
}
