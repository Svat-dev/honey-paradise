import { useLanguage } from "@i18n/hooks";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { EnumSettingsTabTypes, type ISettingsTab } from "../types/settings.type";

export const useSettingsTabs = () => {
	const t = useTranslations("global.settings.content.tabs");
	const { locale } = useLanguage(false);

	const tabs: ISettingsTab[] = useMemo(
		() => [
			{
				href: EnumSettingsTabTypes.PROFILE,
				title: t("profile"),
				label: t("labels.profile"),
			},
			{
				href: EnumSettingsTabTypes.ACCOUNT,
				title: t("account"),
				label: t("labels.account"),
			},
			{
				href: EnumSettingsTabTypes.NOTIFICATIONS,
				title: t("notifications"),
				label: t("labels.notifications"),
			},
			{
				href: EnumSettingsTabTypes.DEVICES,
				title: t("devices"),
				label: t("labels.devices"),
			},
		],
		[locale]
	);

	return { tabs };
};
