"use client"

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
						{payments?.map(item => (
							<TransactionItem
								key={item.id}
								locale={locale}
								{...item}
								amount={getPrice(item.amount, true, false)}
							/>
						))}
					</TableBody>
				</Table>
			</section>
		</>
	)
}

export { TransactionsContent }
