import type {
	GetAllOrdersResponseStatus,
	GetAllPaymentsResponseStatus
} from "@/shared/types/server"

export function getOrderStatusClassName(
	status: GetAllOrdersResponseStatus | GetAllPaymentsResponseStatus | undefined
): string {
	switch (status) {
		case "DELIVERED":
			return "text-green-700 bg-green-400/50"
		case "SUCCEEDED":
			return "text-green-700 bg-green-400/50"
		case "CANCELED":
			return "text-red-700 bg-red-400/50"
		case "IN_ROAD":
			return "text-lime-700 bg-lime-400/50"
		default:
			return "text-black bg-muted/30"
	}
}
