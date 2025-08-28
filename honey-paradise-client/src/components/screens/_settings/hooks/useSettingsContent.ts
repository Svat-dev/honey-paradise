import { useEffect, useState } from "react";

import { EnumAppRoute } from "@/shared/lib/constants/routes";
import { useTranslations } from "next-intl";
import { useRouter } from "next/dist/client/components/navigation";
import { EnumSettingsTabTypes } from "../types/settings.type";

export const useSettingsContent = (activeTabServer: string | string[] | undefined) => {
	const { push } = useRouter();

	const t = useTranslations("global.settings.content");

	const [activeTab, setActiveTab] = useState<EnumSettingsTabTypes>(
		(activeTabServer as EnumSettingsTabTypes) || EnumSettingsTabTypes.PROFILE
	);

	useEffect(() => {
		if (!activeTabServer) push(`${EnumAppRoute.SETTINGS}?active_tab=${activeTab}`);
		if (activeTabServer) setActiveTab(activeTabServer as EnumSettingsTabTypes);
	}, [activeTabServer]);

	const changeTab = (tab: EnumSettingsTabTypes) => {
		setActiveTab(tab);
		push(`${EnumAppRoute.SETTINGS}?active_tab=${tab}`);
	};

	return { changeTab, activeTab, t };
};
