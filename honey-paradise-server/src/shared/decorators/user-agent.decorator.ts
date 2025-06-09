import { createParamDecorator } from "@nestjs/common/decorators/http/create-route-param-metadata.decorator";
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception";
import type { ExecutionContext } from "@nestjs/common/interfaces/features/execution-context.interface";
import type { Request } from "express";

export const UserAgent = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
	if (ctx.getType() === "http") {
		const request = ctx.switchToHttp().getRequest() as Request;

		return request.headers["user-agent"];
	} else throw new InternalServerErrorException("Unsupported context type");
});
