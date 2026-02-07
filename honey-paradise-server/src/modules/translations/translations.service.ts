import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator"
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception"
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception"
import { ConfigService } from "@nestjs/config/dist/config.service"
import { PrismaService } from "src/core/prisma/prisma.service"
import { RedisService } from "src/core/redis/redis.service"
import { capitalize } from "src/shared/lib/common/utils/capitalize.util"

import { TranslateResponse } from "./response/translate.res"
import type {
	IYandexTranslateDto,
	IYandexTranslateResponse
} from "./translations.type"

@Injectable()
export class TranslationsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly config: ConfigService,
		private readonly redisService: RedisService
	) {}

	translationUrl = this.config.get<string>("YANDEX_TRANSLATION_URL")

	async translateById(
		id: string,
		lang: string,
		model: "review" | "commentary"
	): Promise<TranslateResponse> {
		const cacheData = await this.redisService.getTranslateCache(id, lang)

		if (!cacheData?.text) {
			const dbData: { text: string } = await this.prisma[
				model as keyof any
			].findUnique({
				where: { id },
				select: { text: true }
			})

			if (!dbData)
				throw new NotFoundException(
					`${capitalize(model)} with this ID wasn't found!`
				)

			const response = await this.translateFetch({
				texts: dbData.text,
				targetLanguageCode: lang
			})

			if (!response)
				throw new InternalServerErrorException(
					"Failed to process translate response!"
				)

			const data: IYandexTranslateResponse = await response.json()
			const translated = data.translations[0]

			await this.redisService.createTranslateCache(id, lang, {
				text: translated.text,
				languageCode: translated.detectedLanguageCode
			})

			return translated
		} else {
			const response: TranslateResponse = {
				text: cacheData.text,
				detectedLanguageCode: cacheData.languageCode
			}

			return response
		}
	}

	private async translateFetch(dto: IYandexTranslateDto) {
		const apiKey = this.config.getOrThrow<string>("YANDEX_TRANSLATION_API_KEY")
		const folderId = this.config.getOrThrow<string>(
			"YANDEX_TRANSLATION_FOLDER_ID"
		)

		const headers = new Headers()
		headers.set("Content-Type", "application/json")
		headers.set("Authorization", `Api-Key ${apiKey}`)

		const bodyData: IYandexTranslateDto & { folderId: string } = {
			...dto,
			folderId
		}
		const body = JSON.stringify(bodyData)

		const data = await fetch(this.translationUrl, {
			headers,
			body,
			method: "POST"
		})

		return data
	}
}
