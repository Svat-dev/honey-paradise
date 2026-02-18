import { useLocale, useTranslations } from "next-intl"
import { useMemo, useState } from "react"

import type { GetReviewsByPidResponseRating } from "@/shared/types/server"

export const useReviewItem = (rating: GetReviewsByPidResponseRating) => {
	const t = useTranslations("global.product.content.reviews")
	const locale = useLocale()

	const [isDeleted, setIsDeleted] = useState<boolean>(false)

	const extraRatingArray = useMemo(
		() => [
			{
				title: t("badge.common"),
				value: rating.common,
				isCommon: true
			},
			{
				title: t("badge.taste"),
				value: rating.taste
			},
			{
				title: t("badge.aroma"),
				value: rating.aroma
			},
			{
				title: t("badge.packaging"),
				value: rating.packaging
			}
		],
		[locale, rating]
	)

	return {
		t,
		isDeleted,
		setIsDeleted,
		extraRatingArray
	}
}
