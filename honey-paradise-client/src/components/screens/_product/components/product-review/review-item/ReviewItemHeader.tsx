import { format } from "date-fns"
import { CornerUpRightIcon, InfoIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import type { FC } from "react"

import {
	Avatar,
	AvatarFallback,
	AvatarFrame,
	AvatarImage,
	Button
} from "@/components/ui/common"
import { getAvatarPath, getFramesPath } from "@/shared/lib/utils"
import { highlightComment } from "@/shared/lib/utils/ui"
import type {
	GetCommentsResponseReply,
	GetReviewsByPidResponseUser
} from "@/shared/types/server"

interface IReviewItemHeader {
	user: GetReviewsByPidResponseUser
	createdAt: string
	reply?: GetCommentsResponseReply
}

const ReviewItemHeader: FC<IReviewItemHeader> = ({
	createdAt,
	user,
	reply
}) => {
	const t = useTranslations("global.product.content.reviews.item.comments")
	const handleHighlight = () => highlightComment(reply?.id)

	return (
		<header className="mb-4 flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Avatar>
					<AvatarImage
						src={getAvatarPath(user.avatarPath)}
						alt={"Avatar"}
						width={40}
						height={40}
						loading="lazy"
					/>

					{user?.framePath && (
						<AvatarFrame
							src={getFramesPath(user.framePath)}
							alt=""
							loading="lazy"
						/>
					)}

					<AvatarFallback>{user.username.split("")[0]}</AvatarFallback>
				</Avatar>

				<span>{user.username}</span>

				{reply?.id && (
					<Button variant="link" onClick={handleHighlight}>
						<CornerUpRightIcon size={20} className="mb-1 mr-1" />
						{t("reply.text", { reply: reply.text })}
					</Button>
				)}
			</div>

			<div className="flex items-center gap-2 text-muted">
				<span>{format(createdAt, "dd.MM.yyyy")}</span>

				<Button variant="ghost">
					<InfoIcon size={20} />
				</Button>
			</div>
		</header>
	)
}

export { ReviewItemHeader }
