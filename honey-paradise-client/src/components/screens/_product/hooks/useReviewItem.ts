import { useLocale } from "next-intl"
import { useMemo, useState } from "react"
import toast from "react-hot-toast"

import { useYaTranslate } from "@/services/hooks/useYaTranslate"
import type { GetReviewsByPidResponseReview as PropType } from "@/shared/types/server"

type TParams = Pick<PropType, "id" | "text" | "rating">

export const useReviewItem = (props: TParams) => {
	const { id, text: propsText, rating } = props

	const locale = useLocale()

	const [text, setText] = useState<string>(propsText)
	const [isDeleted, setIsDeleted] = useState<boolean>(false)
	const [isVisible, setIsVisible] = useState<boolean>(true)
	const [isTranslated, setIsTranslated] = useState<boolean>(false)

	const { translateAsync, isTranslating } = useYaTranslate(id)

	const extraRatingArray = useMemo(
		() => [
			{
				title: "Общая",
				value: rating.common,
				isCommon: true
			},
			{
				title: "Вкус",
				value: rating.taste
			},
			{
				title: "Аромат",
				value: rating.aroma
			},
			{
				title: "Упаковка",
				value: rating.packaging
			}
		],
		[locale, rating]
	)

	const translate = async () => {
		if (isTranslated) {
			setIsTranslated(false)
			return setText(propsText)
		}

		try {
			const { translations } = await translateAsync({ text, reviewId: id })
			const translated = translations[0]

			if (translated.text && translated.text.length > 1) {
				setIsVisible(false)

				setTimeout(() => {
					setText(translated.text)
					setIsVisible(true)
					setIsTranslated(true)
				}, 200)
			}
		} catch (error) {
			toast.error("Не удалось перевести текст!")
			console.error(error)
		}
	}

	return {
		isDeleted,
		setIsDeleted,
		extraRatingArray,
		text,
		isVisible,
		isTranslated,
		isTranslating,
		translate
	}
}
