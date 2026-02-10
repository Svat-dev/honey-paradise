import { applyDecorators } from "@nestjs/common/decorators/core/apply-decorators"
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator"
import type { EnumUserRoles } from "@prisma/client"

import { AuthGuard } from "../guards/auth.guard"
import { RolesGuard } from "../guards/roles.guard"

import { Roles } from "./roles.decorator"

export function Authorization(...roles: EnumUserRoles[]) {
	if (roles.length > 0) {
		return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard))
	}

	return applyDecorators(UseGuards(AuthGuard))
}
