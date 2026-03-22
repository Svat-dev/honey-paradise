import { LayersIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import type { FC } from "react"

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/common"
import type { IPaymentFilterStore } from "@/shared/store/types/payments-filter-store.type"

interface IProps {
	isLoading: boolean
	perPage: IPaymentFilterStore["params"]["per_page"]
	update: (data: number) => void
}

const TransactionChoosePerPageDM: FC<IProps> = ({
	isLoading,
	perPage,
	update
}) => {
	const t = useTranslations("global.transactions.content")

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="secondary"
					title={t("labels.perPageChooseBtn")}
					className="px-3 py-2 text-sm font-medium"
					disabled={isLoading}
				>
					<LayersIcon size={16} className="mr-2" />
					{t("filters.choosePerPage", { count: perPage })}
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent role="list" className="flex flex-col">
				{[5, 15, 30].map(item => (
					<DropdownMenuItem key={item} onClick={() => update(item)}>
						{t("filters.perPageItem", { count: item })}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export { TransactionChoosePerPageDM }
