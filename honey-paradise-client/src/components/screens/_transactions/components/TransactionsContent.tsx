"use client"

import { AnimatePresence } from "motion/react"

import { Table, TableBody } from "@/components/ui/common"

import { useTransactionContent } from "../hooks/useTransactionContent"

import { LeftSideFilters } from "./filters/LeftSideFilters"
import { RightSideFilters } from "./filters/RightSideFilters"
import { TransactionEmpty } from "./TransactionEmpty"
import { TransactionItem } from "./TransactionItem"
import { TransactionLoadingItem } from "./TransactionLoadingItem"
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
			<section>Here will be filters!</section>

			<section>
				<Table className="w-full rounded-md bg-primary/80">
					<TableHeader>
						<TableRow>
							<TableHead>Дата создания</TableHead>
							<TableHead>Статус</TableHead>
							<TableHead>Сумма</TableHead>
							<TableHead>Способ оплаты</TableHead>
							<TableHead>Дата подтверждения</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody className="bg-secondary">
						<AnimatePresence mode="wait">
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
						</AnimatePresence>
					</TableBody>
				</Table>
			</section>
		</>
	)
}

export { TransactionsContent }
