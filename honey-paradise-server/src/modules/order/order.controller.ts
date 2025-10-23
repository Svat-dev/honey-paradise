import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Get, Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Authorization } from "src/shared/decorators/auth.decorator";
import { Authorized } from "src/shared/decorators/authorized.decorator";
import { EnumApiRoute } from "src/shared/lib/common/constants";
import { OrderService } from "./order.service";
import { CreateOrderResponse } from "./response/create-order.res";
import { GetAllOrdersResponse } from "./response/get-all-orders.res";

@ApiTags("Order")
@Controller(EnumApiRoute.ORDERS)
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@ApiOperation({ summary: "Get all user's orders", description: "" })
	@ApiOkResponse({ type: GetAllOrdersResponse, isArray: true })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Get(EnumApiRoute.GET_USER_ORDERS)
	getAllOrders(@Authorized("id") userId: string) {
		return this.orderService.getAllOrders(userId);
	}

	@ApiOperation({ summary: "Create new order", description: "" })
	@ApiOkResponse({ type: CreateOrderResponse })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Post(EnumApiRoute.CREATE_ORDER)
	createOrder(@Authorized("id") userId: string) {
		return this.orderService.createOrder(userId);
	}
}
