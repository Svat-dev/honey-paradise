import { CLIENT_URL } from "@constants/base"
import axios, { type AxiosResponse } from "axios"

import type {
	IYandexTranslateDto,
	IYandexTranslateResponse
} from "@/shared/types"

class YaTranslateServiceClass {
	async translate(dto: IYandexTranslateDto) {
		const res = await axios.post<any, AxiosResponse<IYandexTranslateResponse>>(
			CLIENT_URL! + "/api/translate",
			dto
		)

		return res.data
	}
}

export const yaTranslateService = new YaTranslateServiceClass()
