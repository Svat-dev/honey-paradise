import { useTranslations } from "next-intl"
import type { FC } from "react"

import { Button } from "@/components/ui/common"

interface IProps {
	isLoading: boolean
	refetch: VoidFunction
}

const RightSideFilters: FC<IProps> = ({ isLoading, refetch }) => {
	const t = useTranslations("global.transactions.content.filters")

	return (
		<div>
			<Button
				variant="secondary"
				title={t("refresh")}
				className="px-2 py-1.5"
				onClick={refetch}
				isLoading={isLoading}
			>
				{t("refresh")}
			</Button>
		</div>
	)
}

export { RightSideFilters }
