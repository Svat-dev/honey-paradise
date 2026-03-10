"use client"

import { AnimatePresence } from "motion/react"

import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/common"

import { useTransactionContent } from "../hooks/useTransactionContent"

import { TransactionEmpty } from "./TransactionEmpty"
import { TransactionItem } from "./TransactionItem"
import { TransactionLoadingItem } from "./TransactionLoadingItem"

const TransactionsContent = () => {
	const { locale, payments, isLoading, getPrice } = useTransactionContent()

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
