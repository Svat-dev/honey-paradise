import { m } from "motion/react"
import { type FC, useState } from "react"

import { useGetCommentsS } from "@/services/hooks/products/reviews/comment/useGetCommentsS"

import { CommentItem } from "./CommentItem"
import { CreateComment } from "./CreateComment"

interface IProps {
	reviewId: string
}

const ReviewComments: FC<IProps> = ({ reviewId }) => {
	const [replyId, setReplyId] = useState<string | undefined>(undefined)
	const { comments, isCommentsLoading } = useGetCommentsS(reviewId)

	const deleteReplyId = () => setReplyId(undefined)

	return (
		<m.section
			initial={{ height: 0 }}
			animate={{ height: "auto" }}
			transition={{ type: "tween", duration: 1 }}
			className="overflow-hidden"
		>
			<CreateComment
				reviewId={reviewId}
				replyId={replyId}
				deleteReplyId={deleteReplyId}
			/>

			<div className="flex flex-col gap-3">
				{isCommentsLoading ? (
					<>Loading...</>
				) : comments?.length ? (
					comments.map(item => (
						<CommentItem
							key={item.id}
							reviewId={reviewId}
							setReplyId={setReplyId}
							{...item}
						/>
					))
				) : (
					<>No Comments</>
				)}
			</div>
		</m.section>
	)
}

export { ReviewComments }
