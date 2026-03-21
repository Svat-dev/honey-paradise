import type { AxiosResponse } from "axios"

import { instance } from "@/api/instance"
import { EnumApiRoute } from "@/shared/lib/constants/routes"
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
			EnumApiRoute.TRANSLATE(id),
			{ params: query }
		)

		return res.data
	}
}
