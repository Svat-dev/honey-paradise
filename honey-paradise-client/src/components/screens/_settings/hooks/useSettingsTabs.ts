import { useTranslations } from "next-intl";
import type { ISettingsTab } from "../types/settings.type";

export const useSettingsTabs = () => {
	const t = useTranslations("global.settings.content.tabs");

	const tabs: ISettingsTab[] = [
		{
			href: "profile",
			title: t("profile"),
			label: t("labels.profile"),
		},
		{
			href: "account",
			title: t("account"),
			label: t("labels.account"),
		},
		{
			href: "notifications",
			title: t("notifications"),
			label: t("labels.notifications"),
		},
		{
			href: "devices",
			title: t("devices"),
			label: t("labels.devices"),
		},
	];

	return { tabs };
};
