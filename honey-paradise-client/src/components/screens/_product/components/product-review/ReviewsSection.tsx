import { AnimatePresence, m } from "motion/react";

import { StarRating } from "@/components/ui/common";
import { Markdown } from "@/components/ui/components/markdown";
import { useGetReviewsS } from "@/services/hooks/products/useGetReviewsS";
import { cn } from "@/shared/lib/utils/base";
import type { ReactStateHook } from "@/shared/types";
import { useEffect, type FC } from "react";
import { ReviewRatingBadgeWrapper } from "./RatingBadge";
import { ReviewItemFooter } from "./review-item/ReviewItemFooter";
import { ReviewItemHeader } from "./review-item/ReviewItemHeader";
import { ReviewLoadingItem } from "./review-item/ReviewLoadingItem";

interface IProps {
	productId: string;
	userId: string | undefined;
	setIsHasReview: ReactStateHook<boolean>;
}

const ReviewsSection: FC<IProps> = ({ productId, userId, setIsHasReview }) => {
	const { reviews, isReviewsLoading } = useGetReviewsS(productId);

	useEffect(() => setIsHasReview(!!reviews?.isHasReview), [reviews?.isHasReview]);

	return (
		<section className="flex flex-col gap-5 w-full mt-5">
			<AnimatePresence mode="sync">
				{isReviewsLoading
					? new Array(3).fill(0).map((_, i) => <ReviewLoadingItem key={i} />)
					: reviews?.reviews.map((item, i) => (
							<m.article
								key={item.id}
								className={cn("bg-primary p-4 rounded-md", { "border-2 border-muted": i === 0 && item.likes.length !== 0 })}
								initial={{ opacity: 0, y: 5 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ type: "tween", duration: 0.4 }}
								viewport={{ once: true, amount: "some" }}
							>
								{i === 0 && item.likes.length !== 0 && <p className="text-2xl font-medium mb-3">Самый популярный отзыв</p>}

								<ReviewItemHeader user={item.user} createdAt={item.createdAt} />

								<div className="flex items-center gap-3 mb-4">
									<ReviewRatingBadgeWrapper className="flex items-center gap-1">
										<p>Общая:</p>
										<StarRating
											className="-mt-1"
											size={15}
											rating={item.rating.common}
											bgColor="#4d4d4d33"
											color="#ffd700"
											animate={false}
											readOnly
										/>
									</ReviewRatingBadgeWrapper>

									<ReviewRatingBadgeWrapper className="flex items-center gap-1">
										<p>Вкус:</p>
										<span>{item.rating.taste === 0 ? "Нет оценки" : item.rating.taste}</span>
									</ReviewRatingBadgeWrapper>

									<ReviewRatingBadgeWrapper className="flex items-center gap-1">
										<p>Аромат:</p>
										<span>{item.rating.aroma === 0 ? "Нет оценки" : item.rating.aroma}</span>
									</ReviewRatingBadgeWrapper>

									<ReviewRatingBadgeWrapper className="flex items-center gap-1">
										<p>Упаковка:</p>
										<span>{item.rating.packaging === 0 ? "Нет оценки" : item.rating.packaging}</span>
									</ReviewRatingBadgeWrapper>
								</div>

								<div className="ml-2 mb-4">
									<Markdown children={item.text} />
								</div>

								<ReviewItemFooter id={item.id} userId={userId} likes={item.likes} dislikes={item.dislikes} />
							</m.article>
					  ))}
			</AnimatePresence>
		</section>
	);
};

export { ReviewsSection };
