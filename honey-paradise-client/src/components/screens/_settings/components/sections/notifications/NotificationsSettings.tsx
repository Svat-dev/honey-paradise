import { useMyAccount } from "@hooks/auth";
import { DestinationTypes } from "./DestinationTypes";
import { PermissionsSection } from "./PermissionsSection";

const NotificationsSettings = () => {
	const { user, isAccLoading } = useMyAccount();

	return (
		<>
			<PermissionsSection
				isAccLoading={isAccLoading}
				isEnabled={!!user?.notificationSettings.enabled}
				isWithSound={!!user?.notificationSettings.withSound}
			/>

			<DestinationTypes
				isAccLoading={isAccLoading}
				isTgLinked={!!user?.telegramId}
				isSiteNotification={!!user?.notificationSettings.siteNotificationsType}
				isTgNotification={!!user?.notificationSettings.telegramNotificationsType}
			/>
		</>
	);
};

export { NotificationsSettings };
