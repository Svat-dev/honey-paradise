import { Controller } from "@nestjs/common/decorators/core/controller.decorator"
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator"
import {
	Delete,
	Post
} from "@nestjs/common/decorators/http/request-mapping.decorator"
import { Body } from "@nestjs/common/decorators/http/route-params.decorator"
import { HttpStatus } from "@nestjs/common/enums/http-status.enum"
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { Authorization } from "src/shared/decorators/auth.decorator"
import { EnumApiRoute } from "src/shared/lib/common/constants"

import { CreateDiscountDto } from "../dto/create-discount.dto"
import { DeleteDiscountsDto } from "../dto/delete-discounts.dto"
import { DiscountsService } from "../services/discounts.service"

@ApiTags("Discounts")
@Controller(EnumApiRoute.DISCOUNTS)
export class DiscountsController {
	constructor(private readonly discountService: DiscountsService) {}

	@ApiOperation({
		summary: "Create discount method. Auth only",
		description: ""
	})
	@ApiOkResponse({ type: Boolean, example: true })
	@ApiBody({ type: CreateDiscountDto })
	@HttpCode(HttpStatus.OK)
	@Authorization("ADMIN", "MANAGER")
	@Post(EnumApiRoute.CREATE_DISCOUNT)
	async createDiscount(@Body() dto: CreateDiscountDto) {
		return this.discountService.create(dto)
	}

	@ApiOperation({
		summary: "Delete discounts method. Auth only",
		description: ""
	})
	@ApiOkResponse({ type: Boolean, example: true })
	@ApiBody({ type: DeleteDiscountsDto })
	@HttpCode(HttpStatus.OK)
	@Authorization("ADMIN", "MANAGER")
	@Delete(EnumApiRoute.DELETE_DISCOUNT)
	async deleteDiscounts(@Body() dto: DeleteDiscountsDto) {
		return this.discountService.deleteByIds(dto.ids)
	}
}
