"use client"

import { AnimatePresence } from "motion/react"
import { useMemo } from "react"

import { Table, TableBody } from "@/components/ui/common"

import { useTransactionContent } from "../hooks/useTransactionContent"

import { LeftSideFilters } from "./filters/LeftSideFilters"
import { RightSideFilters } from "./filters/RightSideFilters"
import { TransactionItem } from "./TransactionItem"
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

	const date = useMemo(() => new Date().toISOString(), [])

	return (
		<>
			<section className="mb-4 flex w-full items-center justify-between rounded-md bg-primary px-3 py-4">
				<LeftSideFilters isLoading={isLoading} />

				<RightSideFilters isLoading={isLoading} refetch={refetchPayments} />
			</section>

			<section>
				<Table className="w-full overflow-hidden rounded-md">
					<TransactionsTableHeader
						colIndex={colIndex}
						setColIndex={setColIndex}
					/>

					<TableBody className="bg-secondary">
						<AnimatePresence mode="wait">
							{new Array(15).fill(0).map((_, i) => (
								<TransactionItem
									key={i}
									i={i + 1}
									locale={locale}
									colIndex={colIndex}
									capturedAt={date}
									createdAt={date}
									description="Description"
									id={String(i + 1)}
									method={{
										type: "bank_card",
										card: {
											type:
												i % 2 == 0 ? "MasterCard" : i % 3 == 0 ? "Visa" : "Mir",
											number: "123456******7890"
										}
									}}
									status={
										i % 2 == 0
											? "SUCCEEDED"
											: i % 3 == 0
												? "PENDING"
												: "CANCELED"
									}
									amount={getPrice(99.99, true, false)}
								/>
							))}
							{/*
								{isLoading ? (
								["a", "b", "c", "d", "e", "f"].map(key => (
									<TransactionLoadingItem key={key} />
								))
							) : payments && payments.length > 0 ? (
								payments?.map((item, i) => (
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
							*/}
						</AnimatePresence>
					</TableBody>
				</Table>
			</section>
		</>
	)
}

export { TransactionsContent }
