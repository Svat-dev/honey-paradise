import { useTranslations } from "next-intl"
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
	const t = useTranslations("global.product.content.reviews.createOffer")

	return (
		<div>
			<Title size="sm" className="whitespace-nowrap font-medium">
				{t("title")}
			</Title>

			<p className="mb-2 text-sm">{t("description")}</p>

			<DynamicCreateReviewDialog
				type="create"
				productId={productId}
				reviewId=""
			>
				<Button className="px-3 py-2" title={t("createBtn")}>
					{t("createBtn")}
				</Button>
			</DynamicCreateReviewDialog>
		</div>
	)
}

export { CreateReviewOffer }
