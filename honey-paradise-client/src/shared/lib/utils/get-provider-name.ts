import { EnumProviderTypes } from "@/shared/types/models";

export function getProviderName(provider: keyof typeof EnumProviderTypes) {
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
