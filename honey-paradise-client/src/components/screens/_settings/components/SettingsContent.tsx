"use client"

import type { FC } from "react"

import { useSettingsContent } from "../hooks/useSettingsContent"
import { EnumSettingsTabTypes } from "../types/settings.type"

import { AccountSettings } from "./sections/account/AccountSettings"
import { DevicesSettings } from "./sections/devices/DevicesSettings"
import { NotificationsSettings } from "./sections/notifications/NotificationsSettings"
import { ProfileSettings } from "./sections/profile/ProfileSettings"
import { SettingsSection } from "./SettingsSection"
import { SettingsTabs } from "./SettingsTabs"

interface IProps {
	activeTabServer?: string | string[]
}

const SettingsContent: FC<IProps> = ({ activeTabServer }) => {
	const { changeTab, activeTab, t } = useSettingsContent(activeTabServer)

	return (
		<>
			<SettingsTabs activeTab={activeTab} setActiveTab={changeTab} />

			{activeTab === EnumSettingsTabTypes.PROFILE ? (
				<SettingsSection
					title={t("profile.title")}
					description={t("profile.description")}
				>
					<ProfileSettings />
				</SettingsSection>
			) : activeTab === EnumSettingsTabTypes.ACCOUNT ? (
				<SettingsSection
					title={t("account.title")}
					description={t("account.description")}
				>
					<AccountSettings />
				</SettingsSection>
			) : activeTab === EnumSettingsTabTypes.NOTIFICATIONS ? (
				<SettingsSection
					title={t("notifications.title")}
					description={t("notifications.description")}
				>
					<NotificationsSettings />
				</SettingsSection>
			) : activeTab === EnumSettingsTabTypes.DEVICES ? (
				<SettingsSection
					title={t("devices.title")}
					description={t("devices.description")}
				>
					<DevicesSettings />
				</SettingsSection>
			) : null}
		</>
	)
}

export { SettingsContent }
