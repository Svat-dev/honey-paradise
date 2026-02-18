import { useLocale, useTranslations } from "next-intl"
import { useMemo, useState } from "react"

import { useGetProductsRatingS } from "@/services/hooks/products"
import { useAuth } from "@/shared/lib/hooks/auth"
import type {
	GetProductsRatingResponseCount,
	GetProductsRatingResponseExtra
} from "@/shared/types/server"

export const useProductReviewsWrapper = (slug: string) => {
	const t = useTranslations("global.product.content.reviews")
	const locale = useLocale()

	const { isAuthenticated } = useAuth()
	const { rating, isRatingLoading } = useGetProductsRatingS(slug)

	const [isHasReview, setIsHasReview] = useState<boolean>(false)

	const reviewsArray: [number, number][] = []
	for (const key in rating?.count || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }) {
		const value =
			rating?.count[key as keyof GetProductsRatingResponseCount] || 0
		reviewsArray.push([Number(key), value])
	}

	const extraRatingArray: [string, number][] = []
	for (const key in rating?.extraRating) {
		const value =
			rating?.extraRating[key as keyof GetProductsRatingResponseExtra] || 0
		extraRatingArray.push([t(`badge.${key}` as any), value])
	}

	return useMemo(
		() => ({
			t,
			isHasReview,
			isAuthenticated,
			isRatingLoading,
			rating: rating?.rating,
			reviewsArray,
			extraRatingArray,
			setIsHasReview
		}),
		[
			isRatingLoading,
			isHasReview,
			rating?.rating,
			reviewsArray,
			extraRatingArray,
			locale
		]
	)
}
