import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { UnauthorizedException } from "@nestjs/common/exceptions/unauthorized.exception";
import type { CanActivate } from "@nestjs/common/interfaces/features/can-activate.interface";
import type { ExecutionContext } from "@nestjs/common/interfaces/features/execution-context.interface";
import { I18nService } from "nestjs-i18n/dist/services/i18n.service";
import { ProfileService } from "src/modules/auth/profile/profile.service";

@Injectable()
export class AuthGuard implements CanActivate {
	public constructor(
		private readonly profileService: ProfileService,
		private readonly i18n: I18nService
	) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		if (typeof request.session.userId === "undefined") throw new UnauthorizedException(this.i18n.t("d.errors.auth_to_have_access"));

		const user = await this.profileService.getProfile(request.session.userId, "id");

		request.user = user;

		return true;
	}
}
