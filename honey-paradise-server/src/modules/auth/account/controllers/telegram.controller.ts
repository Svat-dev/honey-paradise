import { Controller } from "@nestjs/common/decorators/core/controller.decorator"
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator"
import {
	Get,
	Post
} from "@nestjs/common/decorators/http/request-mapping.decorator"
import { HttpStatus } from "@nestjs/common/enums/http-status.enum"
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { SkipThrottle } from "@nestjs/throttler/dist/throttler.decorator"
import { Authorization } from "src/shared/decorators/auth.decorator"
import { Authorized } from "src/shared/decorators/authorized.decorator"
import { EnumApiRoute } from "src/shared/lib/common/constants"
import { DefaultResponse } from "src/shared/lib/response/default.res"

import { VerificationService } from "../../verification/verification.service"
import { AccountService } from "../account.service"
import {
	ConnectTelegramResponse,
	GetTgInfoResponse
} from "../response/get-tg-info.res"

@ApiTags("Account telegram")
@Controller(EnumApiRoute.TELEGRAM)
export class TelegramController {
	constructor(
		private readonly accountService: AccountService,
		private readonly verificationService: VerificationService
	) {}

	@ApiOperation({ summary: "Get telegram info about current user" })
	@ApiOkResponse({ type: GetTgInfoResponse })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@SkipThrottle({ auth: true })
	@Get(EnumApiRoute.BY_USER)
	getTgInfo(@Authorized("id") id: string) {
		return this.accountService.getTelegramInfo(id)
	}

	@ApiOperation({
		summary: "Disconnect telegram from an account. Authorized only"
	})
	@ApiOkResponse({ type: DefaultResponse })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Post(EnumApiRoute.DISCONNECT)
	disconnectTg(@Authorized("id") id: string) {
		return this.accountService.disconnectTelegram(id)
	}

	@ApiOperation({
		summary: "Connect telegram to user's account. Authorized only"
	})
	@ApiOkResponse({ type: ConnectTelegramResponse })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Post(EnumApiRoute.CONNECT)
	connectTelegram(@Authorized("id") id: string) {
		return this.verificationService.connectTelegram(id)
	}
}
