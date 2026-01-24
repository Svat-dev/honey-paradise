import { KeyRoundIcon, type LucideIcon } from "lucide-react"

import { GetAllConnectionsResponseType } from "@/shared/types/server"

export function getProviderIcon(
	provider: GetAllConnectionsResponseType
): LucideIcon | string {
	switch (provider) {
		case "CREDENTIALS":
			return KeyRoundIcon

		case "GITHUB":
			return GetAllConnectionsResponseType.GITHUB.toLowerCase()

		case "GOOGLE":
			return GetAllConnectionsResponseType.GOOGLE.toLowerCase()

		case "VK":
			return GetAllConnectionsResponseType.VK.toLowerCase()

		case "YANDEX":
			return GetAllConnectionsResponseType.YANDEX.toLowerCase()

		default:
			return KeyRoundIcon
	}
}
