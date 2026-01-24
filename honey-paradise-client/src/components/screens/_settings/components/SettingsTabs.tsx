import { cn } from "@utils/base"
import type { FC } from "react"

import { useSettingsTabs } from "../hooks/useSettingsTabs"
import styles from "../styles/settings.module.scss"
import { EnumSettingsTabTypes } from "../types/settings.type"

interface IProps {
	setActiveTab: (tab: EnumSettingsTabTypes) => void
	activeTab: EnumSettingsTabTypes
}

const SettingsTabs: FC<IProps> = ({ setActiveTab, activeTab }) => {
	const { tabs } = useSettingsTabs()

	return (
		<div className={styles["tabs"]}>
			{tabs.map(tab => (
				<button
					key={tab.href}
					title={tab.label}
					onClick={() => setActiveTab(tab.href)}
				>
					{tab.title}
				</button>
			))}

			<div
				className={cn({
					"!left-1/4": activeTab === "account",
					"!left-2/4 !ml-1.5": activeTab === "notifications",
					"!left-3/4 !ml-1.5": activeTab === "devices"
				})}
			/>
		</div>
	)
}

export { SettingsTabs }
