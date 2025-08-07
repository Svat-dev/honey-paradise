import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { UseInterceptors } from "@nestjs/common/decorators/core/use-interceptors.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Delete, Patch, Post, Put } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body, Param, UploadedFile } from "@nestjs/common/decorators/http/route-params.decorator";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import { FileInterceptor } from "@nestjs/platform-express/multer/interceptors/file.interceptor";
import { Authorization } from "src/shared/decorators/auth.decorator";
import { Authorized } from "src/shared/decorators/authorized.decorator";
import { EnumApiRoute } from "src/shared/lib/common/constants";
import { FileValidationPipe } from "src/shared/pipes/file-validation.pipe";
import { UniqueFieldCheckPipe } from "src/shared/pipes/unique-field-check.pipe";
import { UniqueFieldCheckDto } from "./dto/unique-field-check.dto";
import { UpdateUserSettingsDto } from "./dto/update-user-settings.dto";
import { UpdateUserDto } from "./dto/update-userinfo.dto";
import { ProfileService } from "./profile.service";

@Controller(EnumApiRoute.PROFILE)
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Post(`${EnumApiRoute.CHECK_UNIQUE}/:field`)
	checkFieldUnique(@Param("field", UniqueFieldCheckPipe) field: "email" | "username" | "phone", @Body() dto: UniqueFieldCheckDto) {
		return this.profileService.checkUnique(dto.fieldValue, field);
	}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@UseInterceptors(FileInterceptor("avatar"))
	@Patch(EnumApiRoute.UPDATE_AVATAR)
	updateAvatar(@Authorized("id") userId: string, @UploadedFile(FileValidationPipe) file: Express.Multer.File) {
		return this.profileService.updateAvatar(userId, file);
	}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Delete(EnumApiRoute.DELETE_AVATAR)
	deleteAvatar(@Authorized("id") userId: string) {
		return this.profileService.deleteAvatar(userId);
	}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Put(EnumApiRoute.UPDATE_PROFILE)
	updateUserinfo(@Authorized("id") userId: string, @Body() dto: UpdateUserDto) {
		return this.profileService.updateProfile(userId, dto);
	}

	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Put(EnumApiRoute.UPDATE_SETTINGS)
	updateUserSettings(@Authorized("id") userId: string, @Body() dto: UpdateUserSettingsDto) {
		return this.profileService.updateSettings(userId, dto);
	}
}
