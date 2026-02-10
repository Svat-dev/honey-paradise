import type { AxiosResponse } from "axios"

import { instance } from "@/api/instance"
import type {
	TranslateResponse,
	TranslationsControllerTranslateParams
} from "@/shared/types/server"

export const yaTranslateService = {
	translate: async (
		id: string,
		query: TranslationsControllerTranslateParams
	) => {
		const res = await instance.get<any, AxiosResponse<TranslateResponse>>(
			`/translate/${id}`,
			{ params: query }
		)

		return res.data
	}
}
