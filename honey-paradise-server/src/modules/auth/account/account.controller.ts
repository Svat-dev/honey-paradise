import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body } from "@nestjs/common/decorators/http/route-params.decorator";
import { AccountService } from "./account.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("auth/account")
export class AccountController {
	constructor(private readonly accountService: AccountService) {}

	@HttpCode(200)
	@Post("create")
	createAccount(@Body() dto: CreateUserDto): Promise<boolean> {
		return this.accountService.create(dto);
	}
}
