import { format } from "date-fns"
import type { FC } from "react"

import { TableCell, TableRow } from "@/components/ui/common"
import type { GetAllPaymentsResponse } from "@/shared/types/server"

import { useTransactionItem } from "../hooks/useTransactionItem"

interface ITransactionItem extends Omit<GetAllPaymentsResponse, "amount"> {
	i: number
	locale: string
	amount: string
}

const TransactionItem: FC<ITransactionItem> = ({
	i,
	amount,
	status,
	method: { card },
	capturedAt,
	createdAt,
	locale
}) => {
	const { t, CardIcon, StatusIcon, cardNumber, fnsLocale, statusColor } =
		useTransactionItem(status, card, locale)

	const statusText =
		status === "SUCCEEDED"
			? "Успешно"
			: status === "CANCELED"
				? "Отклонено"
				: status === "PENDING"
					? "В ожидании"
					: ""

	return (
		<TableRow
			initial={{ opacity: 0, x: -30 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ type: "tween", duration: 0.4, delay: 0.13 * i }}
		>
			<TableCell>
				<time dateTime={createdAt}>
					{format(createdAt, `d MMM yyyy HH:mm:ss`, { locale: fnsLocale })}
				</time>
			</TableCell>
			<TableCell className={`text-${statusColor} font-semibold`}>
				<StatusIcon size={18} className="inline-block" />
				<span className="ml-2">{statusText}</span>
			</TableCell>
			<TableCell>{amount}</TableCell>
			<TableCell className="select-none">
				<CardIcon className="inline-block max-h-6" />
				<span className="ml-2">{cardNumber}</span>
			</TableCell>
			<TableCell>
				<time dateTime={capturedAt}>
					{format(capturedAt, `d MMM yyyy HH:mm:ss`, { locale: fnsLocale })}
				</time>
			</TableCell>
		</TableRow>
	)
}

export { TransactionItem }
