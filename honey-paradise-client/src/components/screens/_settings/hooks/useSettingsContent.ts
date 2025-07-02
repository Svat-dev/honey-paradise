import { useEffect, useState } from "react";

import { EnumAppRoute } from "@/shared/lib/constants/routes";
import { useTranslations } from "next-intl";
import { useRouter } from "next/dist/client/components/navigation";
import type { TSettingsTabTypes } from "../types/settings.type";

export const useSettingsContent = (activeTabServer: string | string[] | undefined) => {
	const { push } = useRouter();

	const t = useTranslations("global.settings.content");

	const [activeTab, setActiveTab] = useState<TSettingsTabTypes>((activeTabServer as TSettingsTabTypes) || "profile");

	useEffect(() => {
		if (!activeTabServer) push(`${EnumAppRoute.SETTINGS}?active_tab=${activeTab}`);
		if (activeTabServer) setActiveTab(activeTabServer as TSettingsTabTypes);
	}, [activeTabServer]);

	const changeTab = (tab: TSettingsTabTypes) => {
		setActiveTab(tab);
		push(`${EnumAppRoute.SETTINGS}?active_tab=${tab}`);
	};

	return { changeTab, activeTab, t };
};
