import { cn } from "@utils/base";
import type { FC } from "react";
import { useSettingsTabs } from "../hooks/useSettingsTabs";
import styles from "../styles/settings.module.scss";
import type { TSettingsTabTypes } from "../types/settings.type";

interface IProps {
	setActiveTab: (tab: TSettingsTabTypes) => void;
	activeTab: TSettingsTabTypes;
}

const SettingsTabs: FC<IProps> = ({ setActiveTab, activeTab }) => {
	const { tabs } = useSettingsTabs();

	return (
		<div className={styles["tabs"]}>
			{tabs.map(tab => (
				<button key={tab.href} title={tab.label} onClick={() => setActiveTab(tab.href)}>
					{tab.title}
				</button>
			))}

			<div
				className={cn({
					"!tw-left-1/4": activeTab === "account",
					"!tw-left-2/4 !tw-ml-1.5": activeTab === "notifications",
					"!tw-left-3/4 !tw-ml-1.5": activeTab === "devices",
				})}
			/>
		</div>
	);
};

export { SettingsTabs };
