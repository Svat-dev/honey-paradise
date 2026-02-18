import { m } from "motion/react"
import { useTranslations } from "next-intl"
import { type FC, useState } from "react"

import { useGetCommentsS } from "@/services/hooks/products/reviews/comment/useGetCommentsS"
import { useAuth } from "@/shared/lib/hooks/auth"
import { cn } from "@/shared/lib/utils/base"

import { CommentItem } from "./CommentItem"
import { CreateComment } from "./CreateComment"

interface IProps {
	reviewId: string
}

const ReviewComments: FC<IProps> = ({ reviewId }) => {
	const t = useTranslations("global.product.content.reviews")

	const { isAuthenticated } = useAuth()
	const { comments, isCommentsLoading } = useGetCommentsS(reviewId)

	const [replyId, setReplyId] = useState<string | undefined>(undefined)

	const deleteReplyId = () => setReplyId(undefined)

	return (
		<m.section
			initial={{ height: 0 }}
			animate={{ height: "auto" }}
			transition={{ type: "tween", duration: 1 }}
			className={cn("overflow-hidden", { "pt-4": !isAuthenticated })}
		>
			{isAuthenticated && (
				<CreateComment
					reviewId={reviewId}
					replyId={replyId}
					deleteReplyId={deleteReplyId}
				/>
			)}

			<div className="flex flex-col gap-3">
				{isCommentsLoading ? (
					<>Loading...</>
				) : comments?.length ? (
					comments.map(item => (
						<CommentItem
							key={item.id}
							auth={isAuthenticated}
							reviewId={reviewId}
							setReplyId={setReplyId}
							{...item}
						/>
					))
				) : (
					<p className="font-medium italic">{t("item.comments.empty")}</p>
				)}
			</div>
		</m.section>
	)
}

export { ReviewComments }
