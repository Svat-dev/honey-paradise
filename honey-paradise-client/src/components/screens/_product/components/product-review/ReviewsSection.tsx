import { AnimatePresence } from "motion/react"
import { type FC, useEffect } from "react"

import { Separator } from "@/components/ui/common"
import { useGetReviewsS } from "@/services/hooks/products/reviews/useGetReviewsS"
import type { ReactStateHook } from "@/shared/types"

import { ReviewItem } from "./review-item/ReviewItem"
import { ReviewLoadingItem } from "./review-item/ReviewLoadingItem"

interface IProps {
	productId: string
	setIsHasReview: ReactStateHook<boolean>
}

const ReviewsSection: FC<IProps> = ({ productId, setIsHasReview }) => {
	const { reviewsData, isReviewsLoading } = useGetReviewsS(productId)

	useEffect(
		() => setIsHasReview(!!reviewsData?.userReview),
		[reviewsData?.userReview]
	)

	return (
		<section className="mt-5 flex w-full flex-col gap-5">
			<AnimatePresence mode="sync">
				{isReviewsLoading ? (
					new Array(3).fill(0).map((_, i) => <ReviewLoadingItem key={i} />)
				) : (
					<>
						{reviewsData?.userReview ? (
							<>
								<ReviewItem {...reviewsData.userReview} isUserReview />
								<Separator orientation="horizontal" className="my-3 w-full" />
							</>
						) : (
							""
						)}

						{reviewsData?.mostPopularReview ? (
							<ReviewItem {...reviewsData.mostPopularReview} isMostPopular />
						) : (
							""
						)}
						{reviewsData?.reviews.map(item => (
							<ReviewItem key={item.id} {...item} />
						))}
					</>
				)}
			</AnimatePresence>
		</section>
	)
}

export { ReviewsSection }
