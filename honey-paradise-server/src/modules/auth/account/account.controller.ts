import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Get, Patch, Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body, Req, Res } from "@nestjs/common/decorators/http/route-params.decorator";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import { SkipThrottle, Throttle } from "@nestjs/throttler/dist/throttler.decorator";
import { Recaptcha } from "@nestlab/google-recaptcha/decorators/recaptcha";
import type { Request, Response } from "express";
import { TelegramService } from "src/core/telegram/telegram.service";
import { Authorization } from "src/shared/decorators/auth.decorator";
import { Authorized } from "src/shared/decorators/authorized.decorator";
import { UserAgent } from "src/shared/decorators/user-agent.decorator";
import { EnumApiRoute } from "src/shared/lib/common/constants";
import { ms } from "src/shared/lib/common/utils";
import { VerificationService } from "../verification/verification.service";
import { AccountService } from "./account.service";
import type { CreateUserDto } from "./dto/create-user.dto";
import type { EmailVerifyDto, UpdateEmailDto } from "./dto/email-verification.dto";
import type { UpdatePasswordAuthDto, UpdatePasswordDto } from "./dto/password-recover.dto";

@Controller(EnumApiRoute.ACCOUNT)
export class AccountController {
	constructor(
		private readonly accountService: AccountService,
		private readonly verificationService: VerificationService,
		private readonly telegramService: TelegramService
	) {}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@SkipThrottle({ auth: true })
	@Get(EnumApiRoute.ME)
	getMe(@Authorized("id") id: string) {
		return this.accountService.me(id);
	}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@SkipThrottle({ auth: true })
	@Get(EnumApiRoute.TELEGRAM)
	getTgInfo(@Authorized("id") id: string) {
		return this.accountService.getTelegramInfo(id);
	}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Post(EnumApiRoute.DISCONNECT_TG)
	disconnectTg(@Authorized("id") id: string) {
		return this.accountService.disconnectTelegram(id);
	}

	@HttpCode(HttpStatus.OK)
	@Recaptcha()
	@Post(EnumApiRoute.CREATE)
	createAccount(
		@Body() dto: CreateUserDto,
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
		@UserAgent() userAgent: string
	) {
		return this.accountService.create(dto, req, res, userAgent);
	}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Patch(EnumApiRoute.UPDATE_EMAIL)
	updateEmail(@Authorized("id") id: string, @Body() dto: UpdateEmailDto) {
		const { email } = dto;

		return this.accountService.changeEmail(id, email);
	}

	@HttpCode(HttpStatus.OK)
	@Throttle({ default: { limit: 5, ttl: ms("5min") } })
	@SkipThrottle({ auth: true })
	@Post(EnumApiRoute.SEND_VERIFICATION_CODE)
	sendEmailVerification(@Req() req: Request, @UserAgent() userAgent: string) {
		return this.accountService.sendEmailVerificationCode(req, userAgent);
	}

	@HttpCode(HttpStatus.OK)
	@SkipThrottle({ auth: true })
	@Post(EnumApiRoute.VERIFY_EMAIL)
	verifyEmail(@Body() dto: EmailVerifyDto, @Req() req: Request, @Res({ passthrough: true }) res: Response, @UserAgent() userAgent: string) {
		return this.verificationService.verifyEmail(req, res, dto, userAgent);
	}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Post(EnumApiRoute.CONNECT_TG)
	connectTelegram(@Authorized("id") id: string) {
		return this.verificationService.connectTelegram(id);
	}

	@HttpCode(HttpStatus.OK)
	@Throttle({ default: { limit: 5, ttl: ms("5min") } })
	@SkipThrottle({ auth: true })
	@Post(EnumApiRoute.RESET_PASSWORD)
	resetPassword(@Req() req: Request, @Res({ passthrough: true }) res: Response, @UserAgent() userAgent: string) {
		return this.verificationService.sendRecoverPasswordEmail(req, res, userAgent);
	}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Patch(EnumApiRoute.UPDATE_PASSWORD)
	updatePassword(@Authorized("id") id: string, @Body() dto: UpdatePasswordAuthDto, @Req() req: Request) {
		const { password } = dto;

		return this.accountService.updatePassword(id, password, req);
	}

	@HttpCode(HttpStatus.OK)
	@Patch(EnumApiRoute.RECOVER_PASSWORD)
	recoverPassword(@Body() dto: UpdatePasswordDto) {
		return this.accountService.recoverPassword(dto);
	}
}
