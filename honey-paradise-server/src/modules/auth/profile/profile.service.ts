import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator"
import { HttpStatus } from "@nestjs/common/enums/http-status.enum"
import { BadGatewayException } from "@nestjs/common/exceptions/bad-gateway.exception"
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception"
import { ForbiddenException } from "@nestjs/common/exceptions/forbidden.exception"
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception"
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception"
import type { Prisma } from "@prisma/client"
import { hash } from "argon2"
import type { Response } from "express"
import * as fs from "fs"
import { I18nService } from "nestjs-i18n/dist/services/i18n.service"
import * as path from "path"
import * as sharp from "sharp"
import { PrismaService } from "src/core/prisma/prisma.service"
import {
	DEFAULT_AVATAR_PATH,
	EnumApiRoute
} from "src/shared/lib/common/constants"
import {
	userDefaultOutput,
	userDownloadSettingsOutput
} from "src/shared/lib/prisma/outputs/user.output"
import * as yamljs from "yamljs"

import type { UpdateAvatarFrameDto } from "./dto/update-avatar-frame.dto"
import type { UpdateUserSettingsDto } from "./dto/update-user-settings.dto"
import type { UploadSettingsResponse } from "./response/upload-settings.res"
import type { UserSettingsFile } from "./types/user-settings-file.type"

@Injectable()
export class ProfileService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly i18n: I18nService
	) {}

	async downloadSettings(
		userId: string,
		format: "yml" | "json",
		res: Response
	): Promise<void> {
		const { user, ...settings } = await this.prisma.userSettings.findUnique({
			where: { userId },
			select: userDownloadSettingsOutput
		})

		const obj = { uid: userId, ...settings, ...user } as UserSettingsFile
		const data =
			format === "json" ? JSON.stringify(obj) : yamljs.stringify(obj, 4, 2)

		const uploadDir = path.join(
			__dirname,
			"../../../..",
			"public",
			format,
			"settings"
		)
		const filepath = path.join(uploadDir, `${userId}.${format}`)

		try {
			fs.writeFileSync(filepath, data)

			res.setHeader(
				"Content-disposition",
				`attachment; filename=user-settings.${format}`
			)
			res.setHeader("Content-type", `application/${format}`)

			const content = fs.readFileSync(filepath)
			res.status(HttpStatus.OK).send(content)

			fs.unlinkSync(filepath)
		} catch (error) {
			throw new InternalServerErrorException("Error while download file!", {
				cause: error
			})
		}
	}

	async uploadSettings(
		userId: string,
		file: Express.Multer.File
	): Promise<UploadSettingsResponse> {
		const fileExtension = file.originalname.split(".").pop()

		const uploadDir = path.join(
			__dirname,
			"../../../..",
			"public",
			fileExtension,
			"settings"
		)
		const filepath = path.join(uploadDir, `${userId}.${fileExtension}`)

		try {
			fs.writeFileSync(filepath, file.buffer)

			const localFile = fs.readFileSync(filepath, "utf-8")
			const { uid, ...settings }: UserSettingsFile =
				fileExtension === "json"
					? JSON.parse(localFile)
					: fileExtension === "yml"
						? yamljs.parse(localFile)
						: {}

			const owner = await this.getProfile(uid, "id")

			await this.prisma.user.update({
				where: { id: userId },
				data: {
					isTFAEnabled: settings?.isTFAEnabled,
					settings: {
						update: {
							defaultCurrency: settings?.defaultCurrency,
							defaultLanguage: settings?.defaultLanguage,
							defaultTheme: settings?.defaultTheme,
							useFullLogout: settings?.useFullLogout
						}
					}
				}
			})

			fs.unlinkSync(filepath)

			return owner?.username ? { username: owner.username } : null
		} catch (error) {
			throw new InternalServerErrorException(
				"Произошла неизвестная ошибка при загрузке файла!",
				{ cause: error }
			)
		}
	}

	async deleteAvatar(userId: string, exact: boolean = false): Promise<boolean> {
		const user = await this.getProfile(userId, "id")
		const avatarPath = user.avatarPath

		if (!avatarPath && !exact)
			throw new BadRequestException(
				this.i18n.t("d.errors.profile.avatar_not_found")
			)

		if (avatarPath === DEFAULT_AVATAR_PATH) {
			if (!exact)
				throw new BadRequestException(
					this.i18n.t("d.errors.profile.avatar_not_found")
				)
			else return false
		}

		const filepath = path.join(__dirname, "../../../..", "public", avatarPath)

		if (fs.existsSync(filepath)) {
			fs.unlinkSync(filepath)

			if (exact) return true

			await this.prisma.user.update({
				where: { id: userId },
				data: { avatarPath: DEFAULT_AVATAR_PATH }
			})

			return true
		} else {
			if (!exact)
				throw new BadRequestException(
					this.i18n.t("d.errors.profile.avatar_not_found")
				)
			return false
		}
	}

	async updateAvatar(
		userId: string,
		file: Express.Multer.File
	): Promise<boolean> {
		const uploadDir = path.join(
			__dirname,
			"../../../..",
			"public",
			"avatars",
			"uploads"
		)

		let randomNumber: string = ""

		for (let i = 0; i < 8; i++) {
			randomNumber += Math.floor(Math.random() * 10)
				.toString()
				.padStart(2, "0")
		}

		const filename = `${randomNumber}-${userId}.webp`
		const filePath = path.join(uploadDir, filename)

		await this.deleteAvatar(userId, true)

		if (file.originalname.endsWith(".gif")) {
			const processedBuffer = await sharp(file.buffer, { animated: true })
				.resize(512, 512)
				.webp()
				.toBuffer()

			fs.writeFileSync(filePath, processedBuffer)
		} else {
			const processedBuffer = await sharp(file.buffer)
				.resize(512, 512)
				.webp()
				.toBuffer()

			fs.writeFileSync(filePath, processedBuffer)
		}

		await this.prisma.user.update({
			where: { id: userId },
			data: { avatarPath: `${EnumApiRoute.UPLOAD_AVATARS}/${filename}` }
		})

		return true
	}

	async deleteAvatarFrame(userId: string): Promise<boolean> {
		await this.prisma.user.update({
			where: { id: userId },
			data: { framePath: null }
		})

		return true
	}

	async updateAvatarFrame(
		userId: string,
		dto: UpdateAvatarFrameDto
	): Promise<boolean> {
		const { id, role } = await this.getProfile(userId, "id")
		const { framePath } = dto

		if (!framePath) return await this.deleteAvatarFrame(userId)

		if (framePath.includes("http"))
			throw new BadGatewayException("Invalid path format") // TODO translate

		if (
			framePath.includes("/animated/") &&
			(role === "REGULAR" || role === "DELIVERANCE")
		) {
			throw new ForbiddenException(
				"You don't have permission to use animated frames"
			)
		}

		await this.prisma.user.update({
			where: { id },
			data: { framePath }
		})

		return true
	}

	async getProfile(
		id: string,
		type: "email" | "username" | "id" | "phone" | "tg-id",
		extraSelect: Prisma.UserSelect = {}
	) {
		const select = { ...userDefaultOutput, ...extraSelect }

		if (type === "id") {
			const profile = await this.prisma.user.findUnique({
				where: { id },
				select
			})

			return profile
		} else if (type === "email") {
			const profile = await this.prisma.user.findUnique({
				where: { email: id },
				select
			})

			return profile
		} else if (type === "username") {
			const profile = await this.prisma.user.findUnique({
				where: { username: id },
				select
			})

			return profile
		} else if (type === "phone") {
			const profile = await this.prisma.user.findUnique({
				where: { phoneNumber: id },
				select
			})

			return profile
		} else {
			const profile = await this.prisma.user.findUnique({
				where: { telegramId: id },
				select
			})

			return profile
		}
	}

	async checkUnique(
		id: string,
		type: "email" | "username" | "phone"
	): Promise<boolean> {
		const existingUser = await this.prisma.user.findFirst({
			where: {
				OR: [
					{ email: type === "email" ? id : undefined },
					{ username: type === "username" ? id : undefined },
					{ phoneNumber: type === "phone" ? id : undefined }
				]
			}
		})

		if (existingUser)
			throw new BadRequestException(this.i18n.t(`d.errors.${type}.is_exist`))

		return true
	}

	async updateProfile(
		id: string,
		dto: Prisma.UserUpdateInput
	): Promise<boolean> {
		if (dto.username) {
			const isExists = await this.getProfile(dto.username as string, "username")
			if (isExists)
				throw new BadRequestException(this.i18n.t("d.errors.username.is_exist"))
		}

		if (dto.phoneNumber) {
			const isExists = await this.getProfile(dto.phoneNumber as string, "phone")
			if (isExists)
				throw new BadRequestException(
					this.i18n.t("d.errors.profile.phone_number_is_exist")
				)
		}

		if (dto.telegramId) {
			const isExists = await this.getProfile(dto.telegramId as string, "tg-id")
			if (isExists)
				throw new BadRequestException(
					this.i18n.t("d.errors.profile.telegram_id_is_exist")
				)
		}

		await this.prisma.user.update({ where: { id }, data: { ...dto } })

		return true
	}

	async updateSettings(
		userId: string,
		dto: UpdateUserSettingsDto
	): Promise<boolean> {
		const settings = await this.prisma.userSettings.findUnique({
			where: { userId }
		})

		if (!settings)
			throw new NotFoundException(
				this.i18n.t("d.errors.profile.settings_not_found")
			)

		if (typeof dto.isTFAEnabled === "boolean") {
			const { isTFAEnabled, ...other } = dto

			await this.prisma.userSettings.update({
				where: { id: settings.id },
				data: other
			})

			if (isTFAEnabled)
				await this.prisma.user.update({
					where: { id: userId },
					data: { isTFAEnabled: true }
				})
			else {
				await this.prisma.user.update({
					where: { id: userId },
					data: { isTFAEnabled: false }
				})
				await this.prisma.userSettings.update({
					where: { id: settings.id },
					data: { useTgTfaLogin: false }
				})
			}
		} else {
			const { isTFAEnabled, ...other } = dto

			await this.prisma.userSettings.update({
				where: { id: settings.id },
				data: other
			})
		}

		return true
	}

	async updatePassword(userId: string, password: string) {
		const user = await this.getProfile(userId, "id")

		if (!user)
			throw new NotFoundException(this.i18n.t("d.errors.profile.not_found"))

		await this.prisma.user.update({
			where: { id: user.id },
			data: { password: await hash(password) }
		})

		return user
	}

	async updateProfileVerified(id: string): Promise<boolean> {
		await this.prisma.user.update({
			where: { id },
			data: { isVerified: true }
		})

		return true
	}
}
