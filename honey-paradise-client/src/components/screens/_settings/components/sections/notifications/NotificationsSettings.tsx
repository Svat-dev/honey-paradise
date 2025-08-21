import { useMyAccount } from "@hooks/auth";
import { DestinationTypes } from "./DestinationTypes";
import { PermissionsSection } from "./PermissionsSection";

const NotificationsSettings = () => {
	const { user, isAccLoading, accRefetch } = useMyAccount();

	return (
		<>
			<PermissionsSection
				isAccLoading={isAccLoading}
				isEnabled={!!user?.notificationSettings.enabled}
				isWithSound={!!user?.notificationSettings.withSound}
				accRefetch={accRefetch}
			/>

			<DestinationTypes />
		</>
	);
};

export { NotificationsSettings };
