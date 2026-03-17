import type {
	GetAllOrdersResponseStatus,
	GetAllPaymentsResponseStatus
} from "@/shared/types/server"

export function getOrderStatusClassName(
	status: GetAllOrdersResponseStatus | GetAllPaymentsResponseStatus | undefined
): string {
	switch (status) {
		case "DELIVERED":
			return "text-green-700 bg-green-400/50 ring-1 ring-green-700"
		case "SUCCEEDED":
			return "text-green-700 bg-green-400/50 ring-1 ring-green-700"
		case "CANCELED":
			return "text-red-700 bg-red-400/50 ring-1 ring-red-700"
		case "IN_ROAD":
			return "text-lime-700 bg-lime-400/50 ring-1 ring-lime-700"
		default:
			return "text-black bg-muted/30 ring-1 ring-black"
	}
}
