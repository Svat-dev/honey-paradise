"use client"

import { AnimatePresence } from "motion/react"
import { useLocale } from "next-intl"

import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/common"
import { useGetAllPaymentsS } from "@/services/hooks/payments"
import { useMyAccount } from "@/shared/lib/hooks/auth"
import { useGetPrice } from "@/shared/lib/hooks/useGetPrice"

import { TransactionItem } from "./TransactionItem"
import { TransactionLoadingItem } from "./TransactionLoadingItem"

const TransactionsContent = () => {
	const locale = useLocale()

	const { user, isAccLoading } = useMyAccount()
	const { payments, isPaymentsLoading } = useGetAllPaymentsS()

	const { getPrice } = useGetPrice(user?.settings.defaultCurrency)

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
							{isPaymentsLoading || isAccLoading
								? ["a", "b", "c", "d", "e"].map(key => (
										<TransactionLoadingItem key={key} />
									))
								: payments?.map((item, i) => (
										<TransactionItem
											key={item.id}
											i={i + 1}
											locale={locale}
											{...item}
											amount={getPrice(item.amount, true, false)}
										/>
									))}
						</AnimatePresence>
					</TableBody>
				</Table>
			</section>
		</>
	)
}

export { TransactionsContent }
