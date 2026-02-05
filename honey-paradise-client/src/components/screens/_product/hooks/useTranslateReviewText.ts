import { useState } from "react"
import toast from "react-hot-toast"

import { useYaTranslate } from "@/services/hooks/useYaTranslate"

import type { ITranslateReviewState } from "../types/translate-review.type"

export const useTranslateReviewText = (id: string, defaultText: string) => {
	const [state, setState] = useState<ITranslateReviewState>({
		text: defaultText,
		isVisible: true,
		isTranslated: false
	})

	const { translateAsync, isTranslating } = useYaTranslate(id)

	const translate = async () => {
		if (state.isTranslated)
			return setState(prev => ({
				...prev,
				isTranslated: false,
				text: defaultText
			}))

		try {
			const { translations } = await translateAsync({
				text: state.text,
				reviewId: id
			})
			const translated = translations[0]

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
		} catch (error) {
			toast.error("Не удалось перевести текст!")
			console.error(error)
		}
	}

	return {
		state,
		isTranslating,
		translate
	}
}
