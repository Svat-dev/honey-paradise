import { EnumProviderTypes } from "@/shared/types/models";
import { KeyRoundIcon, type LucideIcon } from "lucide-react";

export function getProviderIcon(provider: EnumProviderTypes): LucideIcon | string {
	switch (provider) {
		case EnumProviderTypes.CREDENTIALS:
			return KeyRoundIcon;

		case EnumProviderTypes.GITHUB:
			return EnumProviderTypes.GITHUB.toLowerCase();

		case EnumProviderTypes.GOOGLE:
			return EnumProviderTypes.GOOGLE.toLowerCase();

		case EnumProviderTypes.VK:
			return EnumProviderTypes.VK.toLowerCase();

		case EnumProviderTypes.YANDEX:
			return EnumProviderTypes.YANDEX.toLowerCase();

		default:
			return KeyRoundIcon;
	}
}
