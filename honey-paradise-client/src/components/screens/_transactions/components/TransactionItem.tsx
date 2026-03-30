import { format } from "date-fns"
import type { FC } from "react"

import { TableCell, TableRow } from "@/components/ui/common"
import { cn } from "@/shared/lib/utils/base"
import type { GetAllPaymentsResponsePayment } from "@/shared/types/server"

import { useTransactionItem } from "../hooks/useTransactionItem"

interface ITransactionItem extends Omit<
	GetAllPaymentsResponsePayment,
	"amount"
> {
	i: number
	colIndex: number
	locale: string
	amount: string
}

const TransactionItem: FC<ITransactionItem> = ({
	i,
	colIndex,
	amount,
	status,
	method: { card },
	capturedAt,
	createdAt,
	locale
}) => {
	const { t, CardIcon, StatusIcon, cardNumber, fnsLocale, statusColor } =
		useTransactionItem(status, card, locale)

	const className = (i: number, _class: string = "") =>
		cn(_class, { "bg-muted/10": colIndex === i })

	return (
		<TableRow
			initial={{ opacity: 0, x: -30 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ type: "tween", duration: 0.4, delay: 0.13 * i }}
		>
			<TableCell className={className(0)}>
				<time dateTime={createdAt}>
					{format(createdAt, `d MMM yyyy HH:mm:ss`, { locale: fnsLocale })}
				</time>
			</TableCell>

			<TableCell className={className(1, `text-${statusColor} font-semibold`)}>
				<StatusIcon size={18} className="inline-block" />
				<span className="ml-2">{t("content.status", { status })}</span>
			</TableCell>

			<TableCell className={className(2)}>{amount}</TableCell>

			<TableCell className={className(3, "select-none")}>
				<CardIcon className="inline-block max-h-6" />
				<span className="ml-2">{cardNumber}</span>
			</TableCell>

			<TableCell className={className(4)}>
				<time dateTime={capturedAt}>
					{format(capturedAt, `d MMM yyyy HH:mm:ss`, { locale: fnsLocale })}
				</time>
			</TableCell>
		</TableRow>
	)
}

export { TransactionItem }
