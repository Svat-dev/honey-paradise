import { useLocale } from "next-intl"
import { useMemo, useState } from "react"

import type { GetReviewsByPidResponseRating } from "@/shared/types/server"

export const useReviewItem = (rating: GetReviewsByPidResponseRating) => {
	const locale = useLocale()

	const [isDeleted, setIsDeleted] = useState<boolean>(false)

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

	return {
		isDeleted,
		setIsDeleted,
		extraRatingArray
	}
}
