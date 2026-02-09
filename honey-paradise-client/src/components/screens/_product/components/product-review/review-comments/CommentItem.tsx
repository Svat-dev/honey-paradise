import { LanguagesIcon, ReplyIcon } from "lucide-react"
import type { FC } from "react"

import { Button } from "@/components/ui/common"
import { cn } from "@/shared/lib/utils/base"
import type { ReactStateHook } from "@/shared/types"
import type { GetCommentsResponse } from "@/shared/types/server"

import { useTranslateReviewText } from "../../../hooks/useTranslateReviewText"
import { ReviewItemHeader } from "../review-item/ReviewItemHeader"
import { TranslateText } from "../TranslateText"

interface ICommentItem extends GetCommentsResponse {
	auth: boolean
	setReplyId: ReactStateHook<string | undefined>
	reviewId: string
}

const CommentItem: FC<ICommentItem> = ({
	id,
	text,
	user,
	reply,
	createdAt,
	auth,
	reviewId,
	setReplyId
}) => {
	const replyToComment = () => {
		setReplyId(id)
		document.getElementById(`comment-input-${reviewId}`)?.scrollIntoView()
	}

	const { state, isTranslating, translate } = useTranslateReviewText(id, text)

	return (
		<div
			id={`comment-${id}`}
			className="ml-2 border-b border-muted px-1 py-2 transition-all"
		>
			<ReviewItemHeader
				user={user}
				reply={reply ?? undefined}
				createdAt={createdAt}
			/>

			<TranslateText
				type="comment"
				state={state}
				isTranslating={isTranslating}
			/>

			<div className="flex items-center justify-between px-2">
				<Button variant="link" onClick={replyToComment}>
					<ReplyIcon size={20} className="mb-1 mr-1" />
					Ответить
				</Button>

				{auth && (
					<Button
						variant="ghost"
						className={cn(
							"border border-transparent p-1.5 hover:border-muted",
							{
								"bg-muted/40": state.isTranslated
							}
						)}
						title={
							state.isTranslated ? "Показать оригинал" : "Перевести на ваш язык"
						}
						onClick={() => translate("commentary")}
						disabled={isTranslating}
					>
						<LanguagesIcon />
					</Button>
				)}
			</div>
		</div>
	)
}

export { CommentItem }
