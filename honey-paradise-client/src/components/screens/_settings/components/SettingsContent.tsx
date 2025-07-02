"use client";

import { EnumAppRoute } from "@constants/routes";
import { useRouter } from "next/navigation";
import { type FC, useEffect, useState } from "react";
import type { TSettingsTabTypes } from "../types/settings.type";
import { SettingsTabs } from "./SettingsTabs";

interface IProps {
	activeTabServer?: string | string[];
}

const SettingsContent: FC<IProps> = ({ activeTabServer }) => {
	const { push } = useRouter();
	const [activeTab, setActiveTab] = useState<TSettingsTabTypes>((activeTabServer as TSettingsTabTypes) || "profile");

	useEffect(() => {
		if (!activeTabServer) push(`${EnumAppRoute.SETTINGS}?active_tab=${activeTab}`);
		if (activeTabServer) setActiveTab(activeTabServer as TSettingsTabTypes);
	}, [activeTabServer]);

	const changeTab = (tab: TSettingsTabTypes) => {
		setActiveTab(tab);
		push(`${EnumAppRoute.SETTINGS}?active_tab=${tab}`);
	};

	return (
		<>
			<SettingsTabs activeTab={activeTab} setActiveTab={changeTab} />
		</>
	);
};

export { SettingsContent };
