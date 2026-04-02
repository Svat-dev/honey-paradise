import type { FC } from "react"

import { Pagination, PaginationContent } from "@/components/ui/common"

import { useTransactionsQuery } from "../hooks/useTransactionsQuery"

interface IProps {
	isLoading: boolean
}

const TransactionsFooter: FC<IProps> = ({ isLoading }) => {
	const { queryParams, updateQueryParams } = useTransactionsQuery()

	return (
		<footer className="absolute bottom-0 flex w-full flex-col items-center">
			<Pagination
				className={
					!queryParams.pagination || [0, 1].includes(queryParams.pagination)
						? "hidden"
						: ""
				}
			>
				<PaginationContent
					pages={queryParams.pagination || 0}
					currentPage={Number(queryParams.page) || 0}
					onChangePage={page => updateQueryParams("page", page)}
					isLoading={!queryParams.pagination && isLoading}
					maxPages={6}
					arrows
				/>
			</Pagination>
		</footer>
	)
}

export { TransactionsFooter }
