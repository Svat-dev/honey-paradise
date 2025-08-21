import { useMyAccount } from "@hooks/auth";
import { DestinationTypes } from "./DestinationTypes";
import { PermissionsSection } from "./PermissionsSection";

const NotificationsSettings = () => {
	const { user, isAccLoading, accRefetch } = useMyAccount();

	return (
		<>
			<PermissionsSection
				isAccLoading={isAccLoading}
				accRefetch={accRefetch}
				isEnabled={!!user?.notificationSettings.enabled}
				isWithSound={!!user?.notificationSettings.withSound}
			/>

			<DestinationTypes
				isAccLoading={isAccLoading}
				accRefetch={accRefetch}
				isTgLinked={!!user?.telegramId}
				isSiteNotification={!!user?.notificationSettings.siteNotificationsType}
				isTgNotification={!!user?.notificationSettings.telegramNotificationsType}
			/>
		</>
	);
};

export { NotificationsSettings };
