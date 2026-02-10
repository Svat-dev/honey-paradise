import { Controller } from "@nestjs/common/decorators/core/controller.decorator"
import { UseInterceptors } from "@nestjs/common/decorators/core/use-interceptors.decorator"
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator"
import {
	Delete,
	Get,
	Patch,
	Post,
	Put
} from "@nestjs/common/decorators/http/request-mapping.decorator"
import {
	Body,
	Param,
	Query,
	Res,
	UploadedFile
} from "@nestjs/common/decorators/http/route-params.decorator"
import { HttpStatus } from "@nestjs/common/enums/http-status.enum"
import { FileInterceptor } from "@nestjs/platform-express/multer/interceptors/file.interceptor"
import {
	ApiBody,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags
} from "@nestjs/swagger"
import {
	SkipThrottle,
	Throttle
} from "@nestjs/throttler/dist/throttler.decorator"
import type { Response } from "express"
import { Authorization } from "src/shared/decorators/auth.decorator"
import { Authorized } from "src/shared/decorators/authorized.decorator"
import { EnumApiRoute } from "src/shared/lib/common/constants"
import { ms } from "src/shared/lib/common/utils"
import { AvatarFileValidationPipe } from "src/shared/pipes/avatar-validation.pipe"
import { SettingsFileFormatPipe } from "src/shared/pipes/settings-file-format.pipe"
import { UniqueFieldCheckPipe } from "src/shared/pipes/unique-field-check.pipe"
import { UserSettingsFileValidationPipe } from "src/shared/pipes/user-settings-validation.pipe"

import { UniqueFieldCheckDto } from "./dto/unique-field-check.dto"
import { UpdateAvatarFrameDto } from "./dto/update-avatar-frame.dto"
import { UpdateUserSettingsDto } from "./dto/update-user-settings.dto"
import { UpdateUserDto } from "./dto/update-userinfo.dto"
import { ProfileService } from "./profile.service"
import { UploadSettingsResponse } from "./response/upload-settings.res"

@ApiTags("Profile")
@SkipThrottle({ auth: true })
@Controller(EnumApiRoute.PROFILE)
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@ApiOperation({ summary: "Download user settings as json. Authorized only" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "File successfully sended"
	})
	@ApiParam({ name: "format", enum: ["json", "yml"], example: "json" })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Throttle({ default: { limit: 3, ttl: ms("5min") } })
	@Get(EnumApiRoute.DOWNLOAD_SETTINGS)
	async downloadSettings(
		@Authorized("id") userId: string,
		@Query("format", SettingsFileFormatPipe) format: "json" | "yml",
		@Res() res: Response
	) {
		return this.profileService.downloadSettings(userId, format, res)
	}

	@ApiOperation({
		summary: "Upload user settings as json to use it. Authorized only"
	})
	@ApiOkResponse({ type: UploadSettingsResponse })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Throttle({ default: { limit: 3, ttl: ms("5min") } })
	@UseInterceptors(FileInterceptor("settings"))
	@Post(EnumApiRoute.UPLOAD_SETTINGS)
	async uploadSettings(
		@Authorized("id") userId: string,
		@UploadedFile(UserSettingsFileValidationPipe) file: Express.Multer.File
	) {
		return this.profileService.uploadSettings(userId, file)
	}

	@ApiOperation({
		summary: "Check filed on unique value. email or username or phone"
	})
	@ApiParam({
		name: "field",
		enum: ["email", "username", "phone"],
		example: "email"
	})
	@ApiBody({ type: UniqueFieldCheckDto })
	@ApiOkResponse({ type: Boolean, example: true })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Post(`${EnumApiRoute.CHECK_UNIQUE}/:field`)
	checkFieldUnique(
		@Param("field", UniqueFieldCheckPipe) field: "email" | "username" | "phone",
		@Body() dto: UniqueFieldCheckDto
	) {
		return this.profileService.checkUnique(dto.fieldValue, field)
	}

	@ApiOperation({ summary: "Update user's profile photo. Authorized only" })
	@ApiOkResponse({ type: Boolean, example: true })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Throttle({ default: { limit: 5, ttl: ms("5min") } })
	@UseInterceptors(FileInterceptor("avatar"))
	@Patch(EnumApiRoute.UPDATE_AVATAR)
	updateAvatar(
		@Authorized("id") userId: string,
		@UploadedFile(AvatarFileValidationPipe) file: Express.Multer.File
	) {
		return this.profileService.updateAvatar(userId, file)
	}

	@ApiOperation({ summary: "Update user's profile photo. Authorized only" })
	@ApiBody({ type: UpdateAvatarFrameDto })
	@ApiOkResponse({ type: Boolean, example: true })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Throttle({ default: { limit: 15, ttl: ms("5min") } })
	@Patch(EnumApiRoute.UPDATE_AVATAR_FRAME)
	updateAvatarFrame(
		@Authorized("id") userId: string,
		@Body() dto: UpdateAvatarFrameDto
	) {
		return this.profileService.updateAvatarFrame(userId, dto)
	}

	@ApiOperation({ summary: "Delete user's profile photo. Authorized only" })
	@ApiOkResponse({ type: Boolean, example: true })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Throttle({ default: { limit: 5, ttl: ms("5min") } })
	@Delete(EnumApiRoute.DELETE_AVATAR)
	deleteAvatar(@Authorized("id") userId: string) {
		return this.profileService.deleteAvatar(userId)
	}

	@ApiOperation({
		summary: "Update basic profile information. Authorized only"
	})
	@ApiBody({ type: UpdateUserDto })
	@ApiOkResponse({ type: Boolean, example: true })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Put(EnumApiRoute.UPDATE_PROFILE)
	updateUserinfo(@Authorized("id") userId: string, @Body() dto: UpdateUserDto) {
		return this.profileService.updateProfile(userId, dto)
	}

	@ApiOperation({ summary: "Update user's settings. Authorized only" })
	@ApiBody({ type: UpdateUserSettingsDto })
	@ApiOkResponse({ type: Boolean, example: true })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Put(EnumApiRoute.UPDATE_SETTINGS)
	updateUserSettings(
		@Authorized("id") userId: string,
		@Body() dto: UpdateUserSettingsDto
	) {
		return this.profileService.updateSettings(userId, dto)
	}
}
