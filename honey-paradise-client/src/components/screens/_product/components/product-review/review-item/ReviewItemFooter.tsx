import { ChevronDownIcon, Loader2Icon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

import { Button } from "@/components/ui/common";
import type { FC } from "react";
import { cn } from "@/shared/lib/utils/base";
import { useReviewItemFooter } from "../../../hooks/useReviewItemFooter";

interface IReviewItemFooter {
	id: string;
	userId: string | undefined;
	likes: string[];
	dislikes: string[];
}

const ReviewItemFooter: FC<IReviewItemFooter> = ({ id, userId, likes, dislikes }) => {
	const { isReactingToReview, handleReactToReview } = useReviewItemFooter(id);

	const isLiked = likes.includes(userId || "");
	const isDisliked = dislikes.includes(userId || "");

	return (
		<footer className="flex items-center justify-between">
			<Button variant="link">
				Комментировать
				<ChevronDownIcon size={18} />
			</Button>

			<div className="flex items-center gap-3">
				<Button
					variant="outline"
					className={cn("!border-green-500 hover:!bg-green-500/40", { "!bg-green-500/30": isLiked })}
					onClick={() => handleReactToReview("like")}
					disabled={isReactingToReview}
				>
					<ThumbsUpIcon className={cn("transition-colors will-change-auto", { "fill-green-600/60": isLiked })} />
					{isReactingToReview ? <Loader2Icon className="animate-spin" /> : likes.length}
				</Button>

				<Button
					variant="outline"
					className={cn("!border-red-500 hover:!bg-red-500/40", { "!bg-red-500/30": isDisliked })}
					onClick={() => handleReactToReview("dislike")}
					disabled={isReactingToReview}
				>
					<ThumbsDownIcon className={cn("transition-colors will-change-auto", { "fill-red-600/60": isDisliked })} />
					{isReactingToReview ? <Loader2Icon className="animate-spin" /> : dislikes.length}
				</Button>
			</div>
		</footer>
	);
};

export { ReviewItemFooter };
