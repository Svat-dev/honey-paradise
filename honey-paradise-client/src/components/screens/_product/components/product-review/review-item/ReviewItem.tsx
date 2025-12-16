import { StarRating } from "@/components/ui/common";

import { Markdown } from "@/components/ui/components/markdown";
import { cn } from "@/shared/lib/utils/base";
import type { GetReviewsByPidResponseReview } from "@/shared/types/server";
import { m } from "motion/react";
import type { FC } from "react";
import { ReviewRatingBadgeWrapper } from "../RatingBadge";
import { ReviewItemFooter } from "./ReviewItemFooter";
import { ReviewItemHeader } from "./ReviewItemHeader";
import { UserReviewItem } from "./UserReviewItem";

interface IProps extends GetReviewsByPidResponseReview {
	isMostPopular?: boolean;
	isUserReview?: boolean;
}

const ReviewItem: FC<IProps> = ({
	id,
	text,
	rating,
	likes,
	dislikes,
	isLiked,
	isDisliked,
	user,
	createdAt,
	isMostPopular,
	isUserReview,
}) => {
	return (
		<m.article
			key={id}
			className={cn("bg-primary p-4 rounded-md", { "border-2 border-muted": isMostPopular && likes !== null })}
			initial={{ opacity: 0, y: 5 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ type: "tween", duration: 0.4 }}
			viewport={{ once: true, amount: "some" }}
		>
			{isMostPopular && likes !== null && <p className="text-2xl font-medium mb-3">Самый популярный отзыв</p>}

			{isUserReview && <UserReviewItem />}

			<ReviewItemHeader user={user} createdAt={createdAt} />

			<div className="flex items-center gap-3 mb-4">
				<ReviewRatingBadgeWrapper className="flex items-center gap-1">
					<p>Общая:</p>
					<StarRating className="-mt-1" size={15} rating={rating.common} bgColor="#4d4d4d33" color="#ffd700" animate={false} readOnly />
				</ReviewRatingBadgeWrapper>

				<ReviewRatingBadgeWrapper className="flex items-center gap-1">
					<p>Вкус:</p>
					<span>{rating.taste === 0 ? "Нет оценки" : rating.taste}</span>
				</ReviewRatingBadgeWrapper>

				<ReviewRatingBadgeWrapper className="flex items-center gap-1">
					<p>Аромат:</p>
					<span>{rating.aroma === 0 ? "Нет оценки" : rating.aroma}</span>
				</ReviewRatingBadgeWrapper>

				<ReviewRatingBadgeWrapper className="flex items-center gap-1">
					<p>Упаковка:</p>
					<span>{rating.packaging === 0 ? "Нет оценки" : rating.packaging}</span>
				</ReviewRatingBadgeWrapper>
			</div>

			<div className="ml-2 mb-4">
				<Markdown children={text} />
			</div>

			<ReviewItemFooter id={id} likes={likes} dislikes={dislikes} isLiked={isLiked} isDisliked={isDisliked} />
		</m.article>
	);
};

export { ReviewItem };
