import type { FC } from "react"

import { Separator, Skeleton, StarRating, Title } from "@/components/ui/common"
import { capitalize } from "@/shared/lib/utils/base"

import { useProductReviewsWrapper } from "../../hooks/useProductReviewsWrapper"

import { CreateReviewOffer } from "./CreateReviewOffer"
import { RatingBadge } from "./RatingBadge"
import { RatingCountLine } from "./RatingCountLine"
import { ReviewsSection } from "./ReviewsSection"

interface IProps {
	productId: string
	slug: string
	reviewsLength: number
}

const ProductReviewsWrapper: FC<IProps> = ({
	productId,
	slug,
	reviewsLength
}) => {
	const {
		t,
		isAuthenticated,
		isHasReview,
		isRatingLoading,
		rating,
		reviewsArray,
		extraRatingArray,
		setIsHasReview
	} = useProductReviewsWrapper(slug)

	return (
		<article>
			<Title size="md" id="product-reviews" className="text-2xl font-semibold">
				{t("title")}
			</Title>

			<div className="flex gap-14">
				<section className="sticky top-14 h-fit rounded-md p-3">
					<div className="mb-3 flex items-center gap-5">
						<p className="text-6xl font-semibold">{rating || "0.00"}</p>

						<div>
							<StarRating
								size={26}
								rating={rating}
								bgColor="#4d4d4d33"
								color="#ffd700"
								readOnly
							/>
							<p>{t("count", { count: reviewsLength })}</p>
						</div>
					</div>

					<ul className="ml-2 list-none">
						{reviewsArray
							.sort((a, b) => b[0] - a[0])
							.map(item => (
								<RatingCountLine
									key={item[0]}
									data={item}
									reviewsLength={reviewsLength}
								/>
							))}
					</ul>

					<Separator
						className="my-2 h-px w-full !bg-transparent"
						orientation="horizontal"
					/>

					{isRatingLoading
						? new Array(3)
								.fill(0)
								.map((_, i) => (
									<Skeleton key={i} className="ml-3 inline-block h-16 w-20" />
								))
						: extraRatingArray.map(([name, value]) => (
								<RatingBadge key={name} name={capitalize(name)} value={value} />
							))}

					<Separator
						className="mb-4 mt-2 h-px w-full !bg-transparent"
						orientation="horizontal"
					/>

					{isAuthenticated && !isHasReview && (
						<CreateReviewOffer productId={productId} />
					)}
				</section>

				<ReviewsSection productId={productId} setIsHasReview={setIsHasReview} />
			</div>
		</article>
	)
}

export { ProductReviewsWrapper }
