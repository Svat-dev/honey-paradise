import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Get } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Req, Res } from "@nestjs/common/decorators/http/route-params.decorator";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import { AuthGuard } from "@nestjs/passport/dist/auth.guard";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { EnumProviderTypes } from "@prisma/client";
import type { Request, Response } from "express";
import { UserAgent } from "src/shared/decorators/user-agent.decorator";
import { EnumApiRoute } from "src/shared/lib/common/constants";
import { ProvidersService } from "../providers.service";

@ApiTags("Connect Providers")
@Controller(EnumApiRoute.OAUTH)
export class OAuthController {
	constructor(private readonly providersService: ProvidersService) {}

	@ApiOperation({ summary: "OAuth with google provider" })
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard(EnumProviderTypes.GOOGLE))
	@Get(`${EnumApiRoute.OAUTH_CONNECT}/google`)
	connectGoogleProvider() {}

	@ApiOperation({ summary: "OAuth with github provider" })
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard(EnumProviderTypes.GITHUB))
	@Get(`${EnumApiRoute.OAUTH_CONNECT}/github`)
	connectGithubProvider() {}

	@ApiOperation({ summary: "OAuth with yandex provider" })
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard(EnumProviderTypes.YANDEX))
	@Get(`${EnumApiRoute.OAUTH_CONNECT}/yandex`)
	connectYandexProvider() {}

	@ApiOperation({ summary: "OAuth with vk provider" })
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard(EnumProviderTypes.VK))
	@Get(`${EnumApiRoute.OAUTH_CONNECT}/vk`)
	connectVkProvider() {}

	@ApiOperation({ summary: "OAuth with google callback catcher" })
	@ApiOkResponse({ example: "Void function" })
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard(EnumProviderTypes.GOOGLE))
	@Get(`${EnumApiRoute.OAUTH_CALLBACK}/google`)
	googleCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response, @UserAgent() userAgent: string) {
		return this.providersService.oAuth_first(req, res, userAgent);
	}

	@ApiOperation({ summary: "OAuth with github callback catcher" })
	@ApiOkResponse({ example: "Void function" })
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard(EnumProviderTypes.GITHUB))
	@Get(`${EnumApiRoute.OAUTH_CALLBACK}/github`)
	githubCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response, @UserAgent() userAgent: string) {
		return this.providersService.oAuth_first(req, res, userAgent);
	}

	@ApiOperation({ summary: "OAuth with yandex callback catcher" })
	@ApiOkResponse({ example: "Void function" })
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard(EnumProviderTypes.YANDEX))
	@Get(`${EnumApiRoute.OAUTH_CALLBACK}/yandex`)
	yandexCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response, @UserAgent() userAgent: string) {
		return this.providersService.oAuth_first(req, res, userAgent);
	}

	@ApiOperation({ summary: "OAuth with vk callback catcher" })
	@ApiOkResponse({ example: "Void function" })
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard(EnumProviderTypes.VK))
	@Get(`${EnumApiRoute.OAUTH_CALLBACK}/vk`)
	vkCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response, @UserAgent() userAgent: string) {
		return this.providersService.oAuth_first(req, res, userAgent);
	}
}
