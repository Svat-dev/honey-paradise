export interface IYandexTranslateRequest {
	folderId: string
	texts: string
	targetLanguageCode: string
}

interface ITranslations {
	text: string
	detectedLanguageCode: string
}

export interface IYandexTranslateResponse {
	translations: ITranslations[]
}

export interface IYandexTranslateDto {
	texts: string | string[]
	targetLanguageCode: string
}
