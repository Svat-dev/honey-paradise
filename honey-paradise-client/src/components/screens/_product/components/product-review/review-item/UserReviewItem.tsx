import styles from "@styles/modules/toaster.module.scss"
import { useTranslations } from "next-intl"
import dynamic from "next/dynamic"
import type { FC } from "react"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/common"
import type { ReactStateHook } from "@/shared/types"
import type { GetReviewsByPidResponseRating } from "@/shared/types/server"

import { DeleteReviewToaster } from "./DeleteReviewToaster"

const DynamicCreateReviewDialog = dynamic(
	() => import("../CreateReviewDialog").then(mod => mod.CreateReviewDialog),
	{ ssr: false }
)

interface IProps {
	reviewId: string
	rating: GetReviewsByPidResponseRating
	comment: string
	setIsDeleted: ReactStateHook<boolean>
}

const UserReviewItem: FC<IProps> = ({
	reviewId,
	comment,
	rating,
	setIsDeleted
}) => {
	const t = useTranslations("global.product.content.reviews")
	const toastId = crypto.randomUUID()

	const handleDelete = () => {
		setIsDeleted(prev => !prev)

		toast(
			() => (
				<DeleteReviewToaster
					reviewId={reviewId}
					setNotDeleted={() => setIsDeleted(false)}
					removeToast={() => toast.dismiss(toastId)}
				/>
			),
			{
				id: toastId,
				icon: "🗑️",
				position: "bottom-center",
				duration: Infinity,
				className: styles["delete-review-toaster"]
			}
		)
	}

	return (
		<div className="mb-4 flex items-center justify-between">
			<p className="text-xl font-medium">{t("item.userReview")}</p>

			<div className="flex items-center gap-3">
				<DynamicCreateReviewDialog
					type="edit"
					productId=""
					reviewId={reviewId}
					defaultValue={{ comment, rating }}
				>
					<Button
						variant="secondary"
						title={t("item.actions.edit")}
						className="p-2"
					>
						{t("item.actions.edit")}
					</Button>
				</DynamicCreateReviewDialog>
				{}

				<Button
					variant="destructive"
					title={t("item.actions.delete")}
					className="p-2"
					onClick={handleDelete}
				>
					{t("item.actions.delete")}
				</Button>
			</div>
		</div>
	)
}

export { UserReviewItem }
