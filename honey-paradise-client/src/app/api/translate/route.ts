import type { AxiosError, AxiosResponse } from "axios"
import { getLocale } from "next-intl/server"
import { cookies } from "next/headers"
import { ZodError } from "zod"

import { errorCatch } from "@/api/api-helper"
import { translateInstance } from "@/api/instance"
import { EnumStorageKeys } from "@/shared/lib/constants/base"
import { DEFAULT_LANGUAGE } from "@/shared/lib/i18n"
import { translationSchema } from "@/shared/lib/schemas/translation.schema"
import type {
	IYandexTranslateDto,
	IYandexTranslateResponse
} from "@/shared/types"

import type { TCachedTranslate } from "./type"

async function returnResponse(
	texts: string,
	reviewId: string,
	cached?: TCachedTranslate
) {
	const locale = await getLocale()
	const cookie = await cookies()

	const res = await translateInstance.post<
		any,
		AxiosResponse<IYandexTranslateResponse>
	>("", {
		texts,
		targetLanguageCode: locale || DEFAULT_LANGUAGE,
		folderId: process.env.YANDEX_TRANSLATION_FOLDER_ID
	})

	const translated = res.data.translations[0]
	const expiresAt = new Date().getTime() + 3 * 60 * 60 * 1000

	const cookieData: TCachedTranslate = {
		...cached,
		[reviewId]: { ...translated, expiresAt }
	}

	cookie.set(EnumStorageKeys.TRANSLATE_DATA, JSON.stringify(cookieData))

	return new Response(JSON.stringify(res.data), { status: 200 })
}

export async function POST(req: Request): Promise<Response> {
	const data: IYandexTranslateDto = await req.json()
	const cookie = await cookies()

	try {
		const { text: texts, reviewId } = await translationSchema.parseAsync(data)
		const translateCookie = cookie.get(EnumStorageKeys.TRANSLATE_DATA)

		if (translateCookie?.value) {
			const cachedTranslate: TCachedTranslate = JSON.parse(
				translateCookie.value
			)

			if (
				cachedTranslate[reviewId] &&
				cachedTranslate[reviewId].expiresAt > new Date().getTime()
			) {
				const { text, detectedLanguageCode } = cachedTranslate[reviewId]

				return new Response(
					JSON.stringify({
						translations: [{ text, detectedLanguageCode }]
					} as IYandexTranslateResponse)
				)
			}

			return await returnResponse(texts, reviewId, cachedTranslate)
		} else return await returnResponse(texts, reviewId)
	} catch (error) {
		if (error instanceof ZodError) {
			const msgs = error.issues.map(item => item.message)

			return Response.json(
				{ message: msgs, status: 400, statusText: "Bad Request" },
				{ status: 400 }
			)
		} else {
			const { errMsg } = errorCatch(error as AxiosError)

			return new Response(errMsg, { status: 500, statusText: errMsg })
		}
	}
}
