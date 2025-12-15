import type { GetProductsRatingResponseCount, GetProductsRatingResponseExtra } from "@/shared/types/server";
import { useMemo, useState } from "react";

import { useAuth } from "@/shared/lib/hooks/auth";
import { useGetProductsRatingS } from "@/services/hooks/products";

export const useProductReviewsWrapper = (slug: string) => {
	const { isAuthenticated } = useAuth();
	const { rating, isRatingLoading } = useGetProductsRatingS(slug);

	const [isHasReview, setIsHasReview] = useState<boolean>(false);

	const reviewsArray: [number, number][] = [];
	for (const key in rating?.count || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }) {
		const value = rating?.count[key as keyof GetProductsRatingResponseCount] || 0;
		reviewsArray.push([Number(key), value]);
	}

	const extraRatingArray: [string, number][] = [];
	for (const key in rating?.extraRating) {
		const value = rating?.extraRating[key as keyof GetProductsRatingResponseExtra] || 0;
		extraRatingArray.push([key, value]);
	}

	return useMemo(
		() => ({
			isHasReview,
			isAuthenticated,
			isRatingLoading,
			rating: rating?.rating,
			reviewsArray,
			extraRatingArray,
			setIsHasReview,
		}),
		[isRatingLoading, isHasReview, rating?.rating, reviewsArray, extraRatingArray]
	);
};
