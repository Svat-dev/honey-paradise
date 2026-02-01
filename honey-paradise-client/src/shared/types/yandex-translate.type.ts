import type { Locale } from "next-intl"

export interface IYandexTranslateRequest {
	folderId: string
	texts: string
	targetLanguageCode: Locale
}

interface ITranslations {
	text: string
	detectedLanguageCode: Locale
}

export interface IYandexTranslateResponse {
	translations: ITranslations[]
}

export interface IYandexTranslateDto {
	reviewId: string
	text: string
}
