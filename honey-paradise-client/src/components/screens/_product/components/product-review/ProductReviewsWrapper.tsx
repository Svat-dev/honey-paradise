import { Separator, Skeleton, StarRating, Title } from "@/components/ui/common";

import { capitalize } from "@/shared/lib/utils/base";
import type { FC } from "react";
import { useProductReviewsWrapper } from "../../hooks/useProductReviewsWrapper";
import { CreateReviewOffer } from "./CreateReviewOffer";
import { RatingBadge } from "./RatingBadge";
import { RatingCountLine } from "./RatingCountLine";
import { ReviewsSection } from "./ReviewsSection";

interface IProps {
	productId: string;
	userId: string | undefined;
	slug: string;
	reviewsLength: number;
}

const ProductReviewsWrapper: FC<IProps> = ({ productId, userId, slug, reviewsLength }) => {
	const { isAuthenticated, isHasReview, isRatingLoading, rating, reviewsArray, extraRatingArray, setIsHasReview } =
		useProductReviewsWrapper(slug);

	return (
		<article>
			<Title size="md" id="product-reviews" className="text-2xl font-semibold">
				Отзывы о продукте
			</Title>

			<div className="flex gap-14">
				<section className="sticky top-14 h-fit p-3 rounded-md">
					<div className="flex items-center gap-5 mb-3">
						<p className="text-6xl font-semibold">{rating || "0.00"}</p>

						<div>
							<StarRating size={26} rating={rating} bgColor="#4d4d4d33" color="#ffd700" readOnly />
							<p>{reviewsLength} отзывов</p>
						</div>
					</div>

					<ul className="list-none ml-2">
						{reviewsArray
							.sort((a, b) => b[0] - a[0])
							.map(item => (
								<RatingCountLine key={item[0]} data={item} reviewsLength={reviewsLength} />
							))}
					</ul>

					<Separator className="h-px w-full my-2 !bg-transparent" orientation="horizontal" />

					{isRatingLoading
						? new Array(3).fill(0).map((_, i) => <Skeleton key={i} className="w-20 h-16 inline-block ml-3" />)
						: extraRatingArray.map(([name, value]) => <RatingBadge key={name} name={capitalize(name)} value={value} />)}

					<Separator className="h-px w-full mt-2 mb-4 !bg-transparent" orientation="horizontal" />

					{isAuthenticated && !isHasReview && <CreateReviewOffer productId={productId} />}
				</section>

				<ReviewsSection productId={productId} userId={userId} setIsHasReview={setIsHasReview} />
			</div>
		</article>
	);
};

export { ProductReviewsWrapper };
