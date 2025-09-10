import { GetAllConnectionsResponseType } from "@/shared/types/server";

export function getProviderName(provider: keyof typeof GetAllConnectionsResponseType) {
	switch (provider) {
		case "GOOGLE":
			return "Google";
		case "GITHUB":
			return "Github";
		case "VK":
			return "VKontakte";
		case "YANDEX":
			return "Yandex";

		default:
			return "";
	}
}
