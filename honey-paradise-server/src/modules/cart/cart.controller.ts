import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";

import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Delete, Get, Post, Put } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body, Param } from "@nestjs/common/decorators/http/route-params.decorator";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import { SkipThrottle } from "@nestjs/throttler/dist/throttler.decorator";
import { Authorization } from "src/shared/decorators/auth.decorator";
import { Authorized } from "src/shared/decorators/authorized.decorator";
import { EnumApiRoute } from "src/shared/lib/common/constants";
import { CartService } from "./cart.service";
import { AddCartItemDto } from "./dto/add-cart-item.dto";
import { UpdateQuantityDto } from "./dto/update-quantity.dto";
import { GetMyCartResponse } from "./response/get-my-cart.res";

@ApiTags("Carts")
@SkipThrottle({ auth: true })
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

	@ApiOperation({ summary: "Add item to cart", description: "" })
	@ApiBody({ type: AddCartItemDto })
	@ApiOkResponse({ type: Boolean, example: true })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Post(EnumApiRoute.ADD_CART_ITEM)
	addCartItem(@Authorized("id") userId: string, @Body() dto: AddCartItemDto) {
		return this.cartService.addCartItem(userId, dto);
	}

	@ApiOperation({
		summary: "Add favorites products to user's cart",
		description: "",
	})
	@ApiOkResponse({ type: Boolean, example: true })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Post(EnumApiRoute.ADD_FAVORITES_TO_CART)
	addFavoritesToCart(@Authorized("id") userId: string) {
		return this.cartService.addFavoritesToCart(userId);
	}

	@ApiOperation({ summary: "Update cart item's quantity", description: "" })
	@ApiBody({ type: UpdateQuantityDto })
	@ApiOkResponse({ type: Boolean, example: true })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Put(EnumApiRoute.UPDATE_QUANTITY)
	updateQuantity(@Body() dto: UpdateQuantityDto) {
		return this.cartService.updateCartItem(dto);
	}

	@ApiOperation({ summary: "Remove item from cart", description: "" })
	@ApiParam({ name: "id", type: String, example: "id" })
	@ApiOkResponse({ type: Boolean, example: true })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Delete(`${EnumApiRoute.REMOVE_CART_ITEM}/:id`)
	removeCartItem(@Param("id") itemId: string) {
		return this.cartService.removeCartItem(itemId);
	}

	@ApiOperation({ summary: "Clear all cart by id", description: "" })
	@ApiOkResponse({ type: Boolean, example: true })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Delete(EnumApiRoute.CLEAR_CART)
	cleatCart(@Authorized("id") userId: string) {
		return this.cartService.clearCartByUId(userId);
	}
}
