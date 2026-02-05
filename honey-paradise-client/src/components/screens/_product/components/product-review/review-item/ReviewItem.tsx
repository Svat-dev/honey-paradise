import { LanguagesIcon } from "lucide-react"
import { m } from "motion/react"
import type { FC } from "react"

import { Button, StarRating } from "@/components/ui/common"
import { cn } from "@/shared/lib/utils/base"
import type { GetReviewsByPidResponseReview } from "@/shared/types/server"

import { useReviewItem } from "../../../hooks/useReviewItem"
import { useTranslateReviewText } from "../../../hooks/useTranslateReviewText"
import { ReviewRatingBadgeWrapper } from "../RatingBadge"
import { TranslateText } from "../TranslateText"

import { ReviewItemFooter } from "./ReviewItemFooter"
import { ReviewItemHeader } from "./ReviewItemHeader"
import { UserReviewItem } from "./UserReviewItem"

interface IProps extends GetReviewsByPidResponseReview {
	isMostPopular?: boolean
	isUserReview?: boolean
}

const ReviewItem: FC<IProps> = ({
	id,
	text: propsText,
	rating,
	likes,
	dislikes,
	isLiked,
	isDisliked,
	user,
	createdAt,
	isMostPopular,
	isUserReview
}) => {
	const { extraRatingArray, isDeleted, setIsDeleted } = useReviewItem(rating)

	const { state, isTranslating, translate } = useTranslateReviewText(
		id,
		propsText
	)

	return (
		<m.article
			key={id}
			className={cn("relative overflow-hidden rounded-md bg-primary p-4", {
				"border-2 border-muted": isMostPopular && likes !== null
			})}
			initial={{ opacity: 0, y: 5 }}
			whileInView={
				isDeleted
					? { opacity: 0.3, y: 0, pointerEvents: "none" }
					: { opacity: 1, y: 0 }
			}
			transition={{ type: "tween", duration: 0.4 }}
			viewport={{ once: true, amount: "some" }}
		>
			{isMostPopular && likes !== null && (
				<p className="mb-3 text-2xl font-medium">Самый популярный отзыв</p>
			)}

			{isUserReview && (
				<UserReviewItem
					reviewId={id}
					comment={state.text}
					rating={rating}
					setIsDeleted={setIsDeleted}
				/>
			)}

			<ReviewItemHeader user={user} createdAt={createdAt} />

			<div className="mb-4 flex items-center gap-3">
				{extraRatingArray.map(({ title, value, isCommon }) => (
					<ReviewRatingBadgeWrapper
						key={title}
						className="flex items-center gap-1"
					>
						<p>{title}:</p>
						{isCommon ? (
							<StarRating
								className="-mt-1"
								size={15}
								rating={rating.common}
								bgColor="#4d4d4d33"
								color="#ffd700"
								animate={false}
								readOnly
							/>
						) : (
							<span>{value === 0 ? "Нет оценки" : value}</span>
						)}
					</ReviewRatingBadgeWrapper>
				))}
			</div>

			<TranslateText
				type="review"
				state={state}
				isTranslating={isTranslating}
			/>

			<ReviewItemFooter
				id={id}
				likes={likes}
				dislikes={dislikes}
				isLiked={isLiked}
				isDisliked={isDisliked}
			>
				<Button
					variant="ghost"
					className={cn("border border-transparent p-1.5 hover:border-muted", {
						"bg-muted/40": state.isTranslated
					})}
					title={
						state.isTranslated ? "Показать оригинал" : "Перевести на ваш язык"
					}
					onClick={translate}
					disabled={isTranslating}
				>
					<LanguagesIcon />
				</Button>
			</ReviewItemFooter>
		</m.article>
	)
}

export { ReviewItem }
