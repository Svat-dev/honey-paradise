import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Get, Patch } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body, Req, Res } from "@nestjs/common/decorators/http/route-params.decorator";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import { AuthGuard } from "@nestjs/passport/dist/auth.guard";
import { EnumProviderTypes } from "@prisma/client";
import type { Request, Response } from "express";
import { Authorization } from "src/shared/decorators/auth.decorator";
import { Authorized } from "src/shared/decorators/authorized.decorator";
import { UserAgent } from "src/shared/decorators/user-agent.decorator";
import { EnumApiRoute } from "src/shared/lib/common/constants";
import type { DeleteProviderDto } from "./dto/delete-provider.dto";
import { ProvidersService } from "./providers.service";

@Controller(EnumApiRoute.AUTH)
export class ProvidersController {
	constructor(private readonly providersService: ProvidersService) {}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Get(EnumApiRoute.ALL_CONNECTIONS)
	getAllConnections(@Authorized("id") userId: string) {
		return this.providersService.getProvidersByUser(userId);
	}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Patch(EnumApiRoute.DISCONNECT)
	disconnect(@Authorized("id") userId: string, @Body() dto: DeleteProviderDto) {
		return this.providersService.deleteUserProvider(userId, dto.pid);
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard(EnumProviderTypes.GOOGLE))
	@Get(`${EnumApiRoute.OAUTH_CONNECT}/google`)
	connectGoogleProvider() {}

	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard(EnumProviderTypes.GITHUB))
	@Get(`${EnumApiRoute.OAUTH_CONNECT}/github`)
	connectGithubProvider() {}

	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard(EnumProviderTypes.YANDEX))
	@Get(`${EnumApiRoute.OAUTH_CONNECT}/yandex`)
	connectYandexProvider() {}

	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard(EnumProviderTypes.VK))
	@Get(`${EnumApiRoute.OAUTH_CONNECT}/vk`)
	connectVkProvider() {}

	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard(EnumProviderTypes.GOOGLE))
	@Get(`${EnumApiRoute.OAUTH_CALLBACK}/google`)
	googleCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response, @UserAgent() userAgent: string) {
		return this.providersService.oAuth_first(req, res, userAgent);
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard(EnumProviderTypes.GITHUB))
	@Get(`${EnumApiRoute.OAUTH_CALLBACK}/github`)
	githubCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response, @UserAgent() userAgent: string) {
		return this.providersService.oAuth_first(req, res, userAgent);
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard(EnumProviderTypes.YANDEX))
	@Get(`${EnumApiRoute.OAUTH_CALLBACK}/yandex`)
	yandexCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response, @UserAgent() userAgent: string) {
		return this.providersService.oAuth_first(req, res, userAgent);
	}

	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard(EnumProviderTypes.VK))
	@Get(`${EnumApiRoute.OAUTH_CALLBACK}/vk`)
	vkCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response, @UserAgent() userAgent: string) {
		return this.providersService.oAuth_first(req, res, userAgent);
	}
}
