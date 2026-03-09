import { BanIcon, CircleCheckBigIcon, ClockIcon, MinusIcon } from "lucide-react"

import type { GetAllPaymentsResponseStatus } from "@/shared/types/server"

export function getPaymentStatusIcon(status: GetAllPaymentsResponseStatus) {
	switch (status) {
		case "CANCELED":
			return BanIcon
		case "SUCCEEDED":
			return CircleCheckBigIcon
		case "PENDING":
			return ClockIcon
		default:
			return MinusIcon
	}
}
