import type { AxiosError } from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

import { errorCatch } from "@/api/api-helper"
import { useYaTranslate } from "@/services/hooks/useYaTranslate"
import type { TranslationsControllerTranslateModel } from "@/shared/types/server"

import type { ITranslateReviewState } from "../types/translate-review.type"

export const useTranslateReviewText = (id: string, defaultText: string) => {
	const [state, setState] = useState<ITranslateReviewState>({
		text: defaultText,
		isVisible: true,
		isTranslated: false
	})

	const { translateAsync, isTranslating } = useYaTranslate(id)

	const translate = async (type: TranslationsControllerTranslateModel) => {
		if (state.isTranslated)
			return setState(prev => ({
				...prev,
				isTranslated: false,
				text: defaultText
			}))

		try {
			const translated = await translateAsync(type)

			if (translated.text && translated.text.length > 1) {
				setState(prev => ({ ...prev, isVisible: false }))

				setTimeout(() => {
					setState(prev => ({
						text: translated.text,
						isVisible: true,
						isTranslated: true
					}))
				}, 200)
			}
		} catch (e) {
			const { errMsg, error } = errorCatch(e as AxiosError)

			if (error.status === 403) {
				toast.error("Для перевода нужно обладать статусом ВИП!")
			} else {
				toast.error(errMsg)
			}
		}
	}

	return {
		state,
		isTranslating,
		translate
	}
}
