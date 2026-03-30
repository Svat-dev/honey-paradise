"use client"

import { AnimatePresence } from "motion/react"

import { Table, TableBody } from "@/components/ui/common"

import { useTransactionContent } from "../hooks/useTransactionContent"

import { LeftSideFilters } from "./filters/LeftSideFilters"
import { RightSideFilters } from "./filters/RightSideFilters"
import { TransactionEmpty } from "./TransactionEmpty"
import { TransactionItem } from "./TransactionItem"
import { TransactionLoadingItem } from "./TransactionLoadingItem"
import { TransactionsFooter } from "./TransactionsFooter"
import { TransactionsTableHeader } from "./TransactionsTableHeader"

const TransactionsContent = () => {
	const {
		locale,
		colIndex,
		payments,
		isLoading,
		setColIndex,
		getPrice,
		refetchPayments
	} = useTransactionContent()

	return (
		<>
			<section className="mb-4 flex w-full items-center justify-between rounded-md bg-primary px-3 py-4">
				<LeftSideFilters isLoading={isLoading} />

				<RightSideFilters isLoading={isLoading} refetch={refetchPayments} />
			</section>

			<section>
				<Table className="mb-5 w-full overflow-hidden rounded-md">
					<TransactionsTableHeader
						colIndex={colIndex}
						setColIndex={setColIndex}
					/>

					<TableBody className="bg-secondary">
						<AnimatePresence mode="wait">
							{isLoading ? (
								["a", "b", "c", "d", "e", "f"].map(key => (
									<TransactionLoadingItem key={key} />
								))
							) : payments && payments.length > 0 ? (
								payments?.payments.map((item, i) => (
									<TransactionItem
										key={item.id}
										i={i + 1}
										locale={locale}
										colIndex={colIndex}
										{...item}
										amount={getPrice(item.amount, true, false)}
									/>
								))
							) : (
								<TransactionEmpty />
							)}
						</AnimatePresence>
					</TableBody>
				</Table>

				<TransactionsFooter isLoading={isLoading} />
			</section>
		</>
	)
}

export { TransactionsContent }
