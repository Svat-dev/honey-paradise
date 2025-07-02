import type { ISettingsTab } from "./types/settings.type";

export function getSettingsTabs(t: any): ISettingsTab[] {
	const tabs: ISettingsTab[] = [
		{
			href: "profile",
			title: "Профиль",
		},
		{
			href: "account",
			title: "Аккаунт",
		},
		{
			href: "notifications",
			title: "Уведомления",
		},
		{
			href: "devices",
			title: "Устройства",
		},
	];

	return tabs;
}
