import { ApiProperty } from "@nestjs/swagger"

import { IYandexTranslateResponse } from "../translations.type"

export class TranslateResponse {
	@ApiProperty({
		type: "string",
		description: "Translated text",
		example: "Привет"
	})
	text: string

	@ApiProperty({
		type: "string",
		description: "Detected language code",
		example: "en"
	})
	detectedLanguageCode: string
}
