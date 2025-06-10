import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { ForbiddenException } from "@nestjs/common/exceptions/forbidden.exception";
import type { CanActivate } from "@nestjs/common/interfaces/features/can-activate.interface";
import type { ExecutionContext } from "@nestjs/common/interfaces/features/execution-context.interface";
import type { Reflector } from "@nestjs/core/services/reflector.service";
import type { EnumUserRoles } from "@prisma/client";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
	public constructor(private readonly reflector: Reflector) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		const roles = this.reflector.getAllAndOverride<EnumUserRoles[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

		if (!roles) return true;

		if (!roles.includes(request.user.role)) throw new ForbiddenException("resource_is_forbidden");

		return true;
	}
}
