import dynamic from "next/dynamic"
import type { FC } from "react"

import { Button, Title } from "@/components/ui/common"

const DynamicCreateReviewDialog = dynamic(
	() => import("./CreateReviewDialog").then(mod => mod.CreateReviewDialog),
	{ ssr: false }
)

interface IProps {
	productId: string
}

const CreateReviewOffer: FC<IProps> = ({ productId }) => {
	return (
		<div>
			<Title size="sm" className="whitespace-nowrap font-medium">
				Хотите поделиться мнением?
			</Title>

			<p className="mb-2 text-sm">Оцените товар, ваш отзыв будет полезен</p>

			<DynamicCreateReviewDialog
				type="create"
				productId={productId}
				reviewId=""
			>
				<Button className="px-3 py-2">Добавить отзыв</Button>
			</DynamicCreateReviewDialog>
		</div>
	)
}

export { CreateReviewOffer }
