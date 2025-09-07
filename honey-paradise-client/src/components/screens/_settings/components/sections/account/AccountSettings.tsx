import { ActionsSection } from "./ActionsSection";
import { EmailSection } from "./EmailSection";
import { SecuritySection } from "./SecuritySection";
import { useMyAccount } from "@/shared/lib/hooks/auth";

const AccountSettings = () => {
	const { user, isAccLoading } = useMyAccount();

	return (
		<>
			<EmailSection email={user?.email} isVerified={user?.isVerified} isAccLoading={isAccLoading} />

			<SecuritySection
				useTgTfaLogin={user?.settings.useTgTfaLogin}
				isTFAEnabled={user?.isTFAEnabled}
				isFullLogoutEnabled={user?.settings.useFullLogout}
				isTgTfaDisabled={!user?.telegramId || !user.notificationSettings.telegramNotificationsType}
				isAccLoading={isAccLoading}
			/>

			<ActionsSection />
		</>
	);
};

export { AccountSettings };
