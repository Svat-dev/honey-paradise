import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Delete, Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body, Param } from "@nestjs/common/decorators/http/route-params.decorator";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import { ParseUUIDPipe } from "@nestjs/common/pipes/parse-uuid.pipe";
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { SkipThrottle } from "@nestjs/throttler/dist/throttler.decorator";
import { Authorization } from "src/shared/decorators/auth.decorator";
import { Authorized } from "src/shared/decorators/authorized.decorator";
import { EnumApiRoute } from "src/shared/lib/common/constants";
import { CreatePromoCodeDto } from "./dto/create-promocode.dto";
import { UsePromoCodeDto } from "./dto/use-promocode.dto";
import { PromoCodesService } from "./promocodes.service";

@ApiTags("Promo codes")
@SkipThrottle({ auth: true })
@Controller(EnumApiRoute.PROMO_CODES)
export class PromoCodesController {
	constructor(private readonly promoCodesService: PromoCodesService) {}

	@ApiOperation({ summary: "Use promo code to user's cart", description: "" })
	@ApiOkResponse({ type: Boolean, example: true })
	@ApiBody({ type: UsePromoCodeDto })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Post(EnumApiRoute.USE_PROMO_CODE)
	usePromoCode(@Authorized("id") userId: string, @Body() dto: UsePromoCodeDto) {
		return this.promoCodesService.usePromoCode(userId, dto);
	}

	@ApiOperation({ summary: "Create promo code. Admin only", description: "" })
	@ApiOkResponse({ type: Boolean, example: true })
	@ApiBody({ type: CreatePromoCodeDto })
	@HttpCode(HttpStatus.OK)
	@Authorization("ADMIN")
	@Post(EnumApiRoute.CREATE_PROMO_CODE)
	createPromoCode(@Body() dto: CreatePromoCodeDto) {
		return this.promoCodesService.createPromoCode(dto);
	}

	@ApiOperation({ summary: "Delete promo code. Admin only", description: "" })
	@ApiOkResponse({ type: Boolean, example: true })
	@ApiParam({ name: "id", type: String, example: "uuid" })
	@HttpCode(HttpStatus.OK)
	@Authorization("ADMIN")
	@Delete(EnumApiRoute.DELETE_PROMO_CODE)
	deletePromoCode(@Param("id", ParseUUIDPipe) id: string) {
		return this.promoCodesService.deletePromoCode(id);
	}
}
