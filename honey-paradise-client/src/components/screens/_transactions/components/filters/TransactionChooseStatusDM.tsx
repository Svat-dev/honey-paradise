import { FilterIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import type { FC } from "react"

import {
	Button,
	Checkbox,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from "@/components/ui/common"
import type { IPaymentFilterStore } from "@/shared/store/types/payments-filter-store.type"
import { GetAllPaymentsResponseStatus } from "@/shared/types/server"

interface IProps {
	isLoading: boolean
	statuses: IPaymentFilterStore["params"]["status"]
	update: (data: number) => void
}

const TransactionChooseStatusDM: FC<IProps> = ({
	isLoading,
	statuses,
	update
}) => {
	const t = useTranslations("global.transactions.content")

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="secondary"
					title={t("labels.statusChooseBtn")}
					className="px-3 py-2 text-sm font-medium"
					disabled={isLoading}
				>
					<FilterIcon size={16} className="mr-2" />
					{t("filters.chooseStatus", { length: statuses.length })}
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent role="list" className="flex flex-col">
				{Object.values(GetAllPaymentsResponseStatus).map((status, i) => (
					<Checkbox
						key={status}
						checked={statuses.includes(i)}
						onChange={() => update(i)}
						className="!size-6"
						containerClassName="my-1.5 px-2"
					>
						{t("status", { status })}
					</Checkbox>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export { TransactionChooseStatusDM }
