import { FilterIcon, RotateCwIcon } from "lucide-react"
import type { FC } from "react"

import {
	Button,
	Checkbox,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from "@/components/ui/common"
import { GetAllPaymentsResponseStatus } from "@/shared/types/server"

import { useTransactionsQuery } from "../../hooks/useTransactionsQuery"

import { TransactionsSearchInput } from "./TransactionsSearchInput"

interface IProps {
	isLoading: boolean
}

const LeftSideFilters: FC<IProps> = ({ isLoading }) => {
	const { queryParams, isFilterUpdated, searchForm, updateQueryParams, reset } =
		useTransactionsQuery()

	const statusText = (status: string) =>
		status === "SUCCEEDED"
			? "Успешно"
			: status === "CANCELED"
				? "Отклонено"
				: status === "PENDING"
					? "В ожидании"
					: ""

	return (
		<div className="flex items-center gap-5">
			<TransactionsSearchInput form={searchForm} />

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="secondary"
						title={"Выбрать видимые статусы"}
						className="px-3 py-2 text-sm font-medium"
						disabled={isLoading}
					>
						<FilterIcon size={16} className="mr-2" />
						{`Выбрано ${queryParams.status.length}`}
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent role="list" className="flex flex-col">
					{Object.values(GetAllPaymentsResponseStatus).map((status, i) => (
						<Checkbox
							key={status}
							checked={queryParams.status.includes(i)}
							onChange={() => updateQueryParams("status", i)}
							className="!size-6"
							containerClassName="my-1.5 px-2"
						>
							{statusText(status)}
						</Checkbox>
					))}
				</DropdownMenuContent>
			</DropdownMenu>

			<Button
				variant="ghost"
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
