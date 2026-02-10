import { createParamDecorator } from "@nestjs/common/decorators/http/create-route-param-metadata.decorator"
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception"
import type { ExecutionContext } from "@nestjs/common/interfaces/features/execution-context.interface"
import type { Request } from "express"
import { I18nContext } from "nestjs-i18n/dist/i18n.context"

export const UserAgent = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		if (ctx.getType() === "http") {
			const request = ctx.switchToHttp().getRequest() as Request

			return request.headers["user-agent"]
		} else {
			const i18n = I18nContext.current(ctx)
			throw new InternalServerErrorException(
				i18n.t("d.errors.500.user_agent_not_found")
			)
		}
	}
)
