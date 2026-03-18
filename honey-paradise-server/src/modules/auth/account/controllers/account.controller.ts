import { Controller } from "@nestjs/common/decorators/core/controller.decorator"
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator"
import {
	Get,
	Patch,
	Post
} from "@nestjs/common/decorators/http/request-mapping.decorator"
import {
	Body,
	Req,
	Res
} from "@nestjs/common/decorators/http/route-params.decorator"
import { HttpStatus } from "@nestjs/common/enums/http-status.enum"
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import {
	SkipThrottle,
	Throttle
} from "@nestjs/throttler/dist/throttler.decorator"
import { Recaptcha } from "@nestlab/google-recaptcha/decorators/recaptcha"
import type { Request, Response } from "express"
import { Authorization } from "src/shared/decorators/auth.decorator"
import { Authorized } from "src/shared/decorators/authorized.decorator"
import { UserAgent } from "src/shared/decorators/user-agent.decorator"
import { EnumApiRoute } from "src/shared/lib/common/constants"
import { ms } from "src/shared/lib/common/utils"
import { DefaultResponse } from "src/shared/lib/response/default.res"

import { VerificationService } from "../../verification/verification.service"
import { AccountService } from "../account.service"
import { CreateUserDto } from "../dto/create-user.dto"
import { EmailVerifyDto, UpdateEmailDto } from "../dto/email-verification.dto"
import {
	UpdatePasswordAuthDto,
	UpdatePasswordDto
} from "../dto/password-recover.dto"
import { GetMeResponse } from "../response/get-my-account.res"

@ApiTags("Account")
@Controller(EnumApiRoute.ACCOUNT)
export class AccountController {
	constructor(
		private readonly accountService: AccountService,
		private readonly verificationService: VerificationService
	) {}

	@ApiOperation({ summary: "Get current user account" })
	@ApiOkResponse({ type: GetMeResponse })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@SkipThrottle({ auth: true })
	@Get(EnumApiRoute.MY)
	getMe(@Authorized("id") id: string) {
		return this.accountService.me(id)
	}

	@ApiOperation({ summary: "Creates a new account. (Registration)" })
	@ApiBody({ type: CreateUserDto })
	@ApiOkResponse({ type: DefaultResponse })
	@HttpCode(HttpStatus.OK)
	@Recaptcha()
	@Post(EnumApiRoute.CREATE)
	createAccount(
		@Body() dto: CreateUserDto,
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
		@UserAgent() userAgent: string
	) {
		return this.accountService.create(dto, req, res, userAgent)
	}

	@ApiOperation({ summary: "Updates account's email. Authorized only" })
	@ApiBody({ type: UpdateEmailDto })
	@ApiOkResponse({ type: DefaultResponse })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Patch(EnumApiRoute.UPDATE_EMAIL)
	updateEmail(@Authorized("id") id: string, @Body() dto: UpdateEmailDto) {
		const { email } = dto

		return this.accountService.changeEmail(id, email)
	}

	@ApiOperation({ summary: "Send a mail to user's email to confirm it" })
	@ApiOkResponse({ type: DefaultResponse })
	@HttpCode(HttpStatus.OK)
	@Throttle({ default: { limit: 5, ttl: ms("5min") } })
	@SkipThrottle({ auth: true })
	@Post(EnumApiRoute.SEND_VERIFICATION_CODE)
	sendEmailVerification(@Req() req: Request, @UserAgent() userAgent: string) {
		return this.accountService.sendEmailVerificationCode(req, userAgent)
	}

	@ApiOperation({ summary: "Verify user's entered code to be valid" })
	@ApiBody({ type: EmailVerifyDto })
	@ApiOkResponse({ type: DefaultResponse })
	@HttpCode(HttpStatus.OK)
	@SkipThrottle({ auth: true })
	@Post(EnumApiRoute.VERIFY_EMAIL)
	verifyEmail(
		@Body() dto: EmailVerifyDto,
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
		@UserAgent() userAgent: string
	) {
		return this.verificationService.verifyEmail(req, res, dto, userAgent)
	}

	@ApiOperation({
		summary: "Send a mail with reset password link to user's email"
	})
	@ApiOkResponse({ type: DefaultResponse })
	@HttpCode(HttpStatus.OK)
	@Throttle({ default: { limit: 5, ttl: ms("5min") } })
	@SkipThrottle({ auth: true })
	@Post(EnumApiRoute.RESET_PASSWORD)
	resetPassword(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
		@UserAgent() userAgent: string
	) {
		return this.verificationService.sendRecoverPasswordEmail(
			req,
			res,
			userAgent
		)
	}

	@ApiOperation({ summary: "Update user's password. Authorized only" })
	@ApiBody({ type: UpdatePasswordAuthDto })
	@ApiOkResponse({
		examples: {
			1: { summary: "without tfa enabled", value: true },
			2: { summary: "with tfa enabled", value: "redirect/logout" }
		}
	})
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Patch(EnumApiRoute.UPDATE_PASSWORD)
	updatePassword(
		@Authorized("id") id: string,
		@Body() dto: UpdatePasswordAuthDto,
		@Req() req: Request
	) {
		const { password } = dto

		return this.accountService.updatePassword(id, password, req)
	}

	@ApiOperation({ summary: "Update user's password. Token needed" })
	@ApiBody({ type: UpdatePasswordDto })
	@ApiOkResponse({ type: DefaultResponse })
	@HttpCode(HttpStatus.OK)
	@Patch(EnumApiRoute.RECOVER_PASSWORD)
	recoverPassword(@Body() dto: UpdatePasswordDto) {
		return this.accountService.recoverPassword(dto)
	}
}
