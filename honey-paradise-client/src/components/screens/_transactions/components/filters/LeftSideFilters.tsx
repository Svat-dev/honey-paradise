import { RotateCwIcon } from "lucide-react"
import type { FC } from "react"

import { Button } from "@/components/ui/common"

import { useTransactionsQuery } from "../../hooks/useTransactionsQuery"

import { TransactionChoosePerPageDM } from "./TransactionChoosePerPageDM"
import { TransactionChooseStatusDM } from "./TransactionChooseStatusDM"
import { TransactionsSearchInput } from "./TransactionsSearchInput"

interface IProps {
	isLoading: boolean
}

const LeftSideFilters: FC<IProps> = ({ isLoading }) => {
	const {
		t,
		queryParams,
		isFilterUpdated,
		searchForm,
		updateQueryParams,
		reset
	} = useTransactionsQuery()

	return (
		<div className="flex items-center gap-5">
			<TransactionsSearchInput form={searchForm} />

			<TransactionChoosePerPageDM
				perPage={queryParams.per_page}
				update={data => updateQueryParams("per_page", data)}
				isLoading={isLoading}
			/>

			<TransactionChooseStatusDM
				statuses={queryParams.status}
				update={data => updateQueryParams("status", data)}
				isLoading={isLoading}
			/>

			<Button
				variant="ghost"
				title={t("labels.resetBtn")}
				className="[&_>_svg]:hover:rotate-[360deg]"
				onClick={reset}
				disabled={!isFilterUpdated || isLoading}
			>
				<RotateCwIcon
					size={20}
					className="transition-transform duration-500 will-change-auto"
				/>
			</Button>
		</div>
	)
}

export { LeftSideFilters }
