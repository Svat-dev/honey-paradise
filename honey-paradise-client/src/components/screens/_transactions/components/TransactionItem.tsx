import { format } from "date-fns"
import { enUS, ru } from "date-fns/locale"
import type { FC } from "react"

import { TableCell, TableRow } from "@/components/ui/common"
import { getPaymentCardIcon } from "@/shared/lib/utils/payments/get-card-icon"
import { getPaymentStatusIcon } from "@/shared/lib/utils/payments/get-pay-status-icon"
import type { GetAllPaymentsResponse } from "@/shared/types/server"

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
	const CardIcon = getPaymentCardIcon(card.type)
	const StatusIcon = getPaymentStatusIcon(status)

	const fnsLocale = locale === "ru" ? ru : enUS

	const cartNumber = card.number
		.split("")
		.map((l, i) => `${l}${(i + 1) % 4 === 0 ? " " : ""}`)
		.join("")

	const statusText =
		status === "SUCCEEDED"
			? "Успешно"
			: status === "CANCELED"
				? "Отклонено"
				: status === "PENDING"
					? "В ожидании"
					: ""
	const statusColor =
		status === "SUCCEEDED"
			? "green-500"
			: status === "CANCELED"
				? "red-500"
				: status === "PENDING"
					? "muted"
					: "black"

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
				<span className="ml-2">{cartNumber}</span>
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
