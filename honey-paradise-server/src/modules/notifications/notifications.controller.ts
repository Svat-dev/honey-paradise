import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Get, Patch } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body, Query } from "@nestjs/common/decorators/http/route-params.decorator";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import { Authorization } from "src/shared/decorators/auth.decorator";
import { Authorized } from "src/shared/decorators/authorized.decorator";
import { EnumApiRoute } from "src/shared/lib/common/constants";
import type { GetAllQueryDto } from "./dto/get-all.dto";
import type { MarkAsDto } from "./dto/mark-as.dto";
import { NotificationsService } from "./notifications.service";

@Controller(EnumApiRoute.NOTIFICATIONS)
export class NotificationsController {
	constructor(private readonly notificationsService: NotificationsService) {}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Get(EnumApiRoute.NOTIFICATIONS_GET_ALL)
	getAll(@Authorized("id") userId: string, @Query() query: GetAllQueryDto) {
		return this.notificationsService.getAllByUser(userId, query);
	}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Patch(EnumApiRoute.MARK_AS_READ)
	markAsRead(@Body() dto: MarkAsDto) {
		return this.notificationsService.markAsRead(dto.ids);
	}
}
