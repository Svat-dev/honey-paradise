import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { UseInterceptors } from "@nestjs/common/decorators/core/use-interceptors.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Patch } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { UploadedFile } from "@nestjs/common/decorators/http/route-params.decorator";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import { FileInterceptor } from "@nestjs/platform-express/multer/interceptors/file.interceptor";
import { Authorization } from "src/shared/decorators/auth.decorator";
import { Authorized } from "src/shared/decorators/authorized.decorator";
import { EnumApiRoute } from "src/shared/lib/common/constants";
import { FileValidationPipe } from "src/shared/pipes/file-validation.pipe";
import { ProfileService } from "./profile.service";

@Controller(EnumApiRoute.PROFILE)
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@UseInterceptors(FileInterceptor("avatar"))
	@Patch(EnumApiRoute.UPDATE_AVATAR)
	updateAvatar(@Authorized("id") userId: string, @UploadedFile(new FileValidationPipe()) file: Express.Multer.File) {
		return this.profileService.updateAvatar(userId, file);
	}
}
