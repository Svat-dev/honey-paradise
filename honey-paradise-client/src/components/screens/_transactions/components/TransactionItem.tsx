import { format } from "date-fns"
import { enUS, ru } from "date-fns/locale"
import type { FC } from "react"

import { TableCell, TableRow } from "@/components/ui/common"
import { getPaymentCardIcon } from "@/shared/lib/utils/payments/get-card-icon"
import { getPaymentStatusIcon } from "@/shared/lib/utils/payments/get-pay-status-icon"
import type { GetAllPaymentsResponse } from "@/shared/types/server"

interface ITransactionItem extends Omit<GetAllPaymentsResponse, "amount"> {
	locale: string
	amount: string
}

const TransactionItem: FC<ITransactionItem> = ({
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
			? "green"
			: status === "CANCELED"
				? "red"
				: status === "PENDING"
					? "zinc"
					: "black"

	return (
		<TableRow>
			<TableCell>
				<time dateTime={createdAt}>
					{format(createdAt, `d MMM yyyy HH:mm:ss`, { locale: fnsLocale })}
				</time>
			</TableCell>
			<TableCell
				className={`text-${statusColor}-600 flex items-center gap-1.5 font-semibold`}
			>
				<StatusIcon size={18} />
				{statusText}
			</TableCell>
			<TableCell>{amount}</TableCell>
			<TableCell className="flex select-none items-center gap-2">
				<CardIcon />
				{card.number
					.split("")
					.map((l, i) => `${l}${(i + 1) % 4 === 0 ? " " : ""}`)
					.join("")}
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
