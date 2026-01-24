import { SetMetadata } from "@nestjs/common/decorators/core/set-metadata.decorator"
import type { EnumUserRoles } from "@prisma/client"

export const ROLES_KEY = "roles"

export const Roles = (...roles: EnumUserRoles[]) =>
	SetMetadata(ROLES_KEY, roles)
