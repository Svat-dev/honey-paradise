import { enUS } from "date-fns/locale/en-US"
import { ru } from "date-fns/locale/ru"
import { useTranslations } from "next-intl"

import {
	getPaymentCardIcon,
	getPaymentStatusIcon
} from "@/shared/lib/utils/payments"
import type {
	GetAllPaymentsResponseMethodCard as Card,
	GetAllPaymentsResponseStatus as EnumStatus
} from "@/shared/types/server"

export const useTransactionItem = (
	status: EnumStatus,
	card: Card,
	locale: string
) => {
	const t = useTranslations("global.transactions")

	const CardIcon = getPaymentCardIcon(card.type)
	const StatusIcon = getPaymentStatusIcon(status)

	const fnsLocale = locale === "ru" ? ru : enUS

	const cardNumber = card.number
		.split("")
		.map((l, i) => `${l}${(i + 1) % 4 === 0 ? " " : ""}`)
		.join("")

	const statusColor =
		status === "SUCCEEDED"
			? "green-500"
			: status === "CANCELED"
				? "red-500"
				: status === "PENDING"
					? "muted"
					: "black"

	return {
		t,
		CardIcon,
		StatusIcon,
		fnsLocale,
		cardNumber,
		statusColor
	}
}
