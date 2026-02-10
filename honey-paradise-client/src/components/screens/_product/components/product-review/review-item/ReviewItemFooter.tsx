import {
	ChevronDownIcon,
	Loader2Icon,
	ThumbsDownIcon,
	ThumbsUpIcon
} from "lucide-react"
import dynamic from "next/dynamic"
import type { FC, PropsWithChildren } from "react"

import { Button } from "@/components/ui/common"
import { cn } from "@/shared/lib/utils/base"

import { useReviewItemFooter } from "../../../hooks/useReviewItemFooter"

const DynamicReviewComments = dynamic(
	() =>
		import("../review-comments/ReviewComments").then(mod => mod.ReviewComments),
	{ ssr: false }
)

interface IReviewItemFooter extends PropsWithChildren {
	id: string
	likes: number | null
	dislikes: number | null
	isLiked: boolean
	isDisliked: boolean
}

const ReviewItemFooter: FC<IReviewItemFooter> = ({
	id,
	likes,
	dislikes,
	isDisliked,
	isLiked,
	children
}) => {
	const { isReactingToReview, isOpen, handleReactToReview, handleOpen } =
		useReviewItemFooter(id)

	return (
		<>
			<footer className="flex items-center justify-between">
				<Button variant="link" onClick={handleOpen}>
					Комментарии
					<ChevronDownIcon
						size={18}
						className={cn("transition-transform", { "rotate-180": isOpen })}
					/>
				</Button>

				<div className="flex items-center gap-3">
					<Button
						variant="outline"
						className={cn("!border-green-500 hover:!bg-green-500/40", {
							"!bg-green-500/30": isLiked
						})}
						onClick={() => handleReactToReview("like")}
						disabled={isReactingToReview}
					>
						<ThumbsUpIcon
							className={cn("transition-colors will-change-auto", {
								"fill-green-600/60": isLiked
							})}
						/>
						{isReactingToReview ? (
							<Loader2Icon className="animate-spin" />
						) : (
							likes || 0
						)}
					</Button>

					<Button
						variant="outline"
						className={cn("!border-red-500 hover:!bg-red-500/40", {
							"!bg-red-500/30": isDisliked
						})}
						onClick={() => handleReactToReview("dislike")}
						disabled={isReactingToReview}
					>
						<ThumbsDownIcon
							className={cn("transition-colors will-change-auto", {
								"fill-red-600/60": isDisliked
							})}
						/>
						{isReactingToReview ? (
							<Loader2Icon className="animate-spin" />
						) : (
							dislikes || 0
						)}
					</Button>

					{children}
				</div>
			</footer>

			{isOpen && <DynamicReviewComments reviewId={id} />}
		</>
	)
}

export { ReviewItemFooter }
