import { cn } from "@utils/base";
import { useTranslations } from "next-intl";
import type { FC } from "react";
import { getSettingsTabs } from "../data";
import styles from "../styles/settings.module.scss";
import type { TSettingsTabTypes } from "../types/settings.type";

interface IProps {
	setActiveTab: (tab: TSettingsTabTypes) => void;
	activeTab: TSettingsTabTypes;
}

const SettingsTabs: FC<IProps> = ({ setActiveTab, activeTab }) => {
	const t = useTranslations("global.settings.content");
	const tabs = getSettingsTabs(t);

	return (
		<div className={styles["tabs"]}>
			{tabs.map(tab => (
				<button key={tab.href} onClick={() => setActiveTab(tab.href)}>
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
