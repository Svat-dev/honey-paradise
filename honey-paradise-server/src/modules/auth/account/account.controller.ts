import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Get, Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body } from "@nestjs/common/decorators/http/route-params.decorator";
import { Recaptcha } from "@nestlab/google-recaptcha";
import { Authorization } from "src/shared/decorators/auth.decorator";
import { Authorized } from "src/shared/decorators/authorized.decorator";
import { AccountService } from "./account.service";
import type { CreateUserDto } from "./dto/create-user.dto";

@Controller("auth/account")
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@HttpCode(200)
	@Recaptcha()
	@Post("create")
	createAccount(@Body() dto: CreateUserDto): Promise<boolean> {
		return this.accountService.create(dto);
	}

	@HttpCode(200)
	@Authorization()
	@Get("me")
	getMe(@Authorized("id") id: string) {
		return this.accountService.me(id);
	}
}
