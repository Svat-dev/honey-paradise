import { createParamDecorator } from "@nestjs/common/decorators/http/create-route-param-metadata.decorator";
import type { ExecutionContext } from "@nestjs/common/interfaces/features/execution-context.interface";
import type { User } from "@prisma/client";

export const Authorized = createParamDecorator((data: keyof User, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();
	const user = request.user;

	return data ? user[data] : user;
});
