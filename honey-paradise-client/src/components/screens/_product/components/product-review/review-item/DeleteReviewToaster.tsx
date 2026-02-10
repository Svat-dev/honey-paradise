import type { FC } from "react"

import { Button, Separator } from "@/components/ui/common"

import { useDeleteReviewToaster } from "../../../hooks/useDeleteReviewToaster"

interface IProps {
	removeToast: VoidFunction
	setNotDeleted: VoidFunction
	reviewId: string
}

const DeleteReviewToaster: FC<IProps> = ({
	removeToast,
	setNotDeleted,
	reviewId
}) => {
	const { cancelDeleting, agreeWithDeleting, progressWidth } =
		useDeleteReviewToaster(setNotDeleted, removeToast, reviewId)

	return (
		<div className="flex items-center gap-3">
			<p>Ваш отзыв будет удален</p>

			<Separator orientation="vertical" className="mx-3 h-full" />

			<Button variant="outline" onClick={cancelDeleting}>
				Отменить
			</Button>

			<Button
				variant="destructive"
				onClick={agreeWithDeleting}
				className="p-1.5 px-2.5"
			>
				Ок
			</Button>

			<div className="absolute bottom-0 left-0 h-1 w-full overflow-hidden rounded-full bg-gray-400">
				<div
					className="h-full bg-muted transition-all duration-500 ease-linear will-change-auto"
					style={{ width: `${progressWidth}%` }}
				/>
			</div>
		</div>
	)
}

export { DeleteReviewToaster }
