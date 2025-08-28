import { useMyAccount } from "@/shared/lib/hooks/auth";
import { ActionsSection } from "./ActionsSection";
import { EmailSection } from "./EmailSection";
import { SecuritySection } from "./SecuritySection";

const AccountSettings = () => {
	const { user, isAccLoading } = useMyAccount();

	return (
		<>
			<EmailSection email={user?.email} isVerified={user?.isVerified} isAccLoading={isAccLoading} />

			<SecuritySection isTFAEnabled={user?.isTFAEnabled} isFullLogoutEnabled={user?.settings.useFullLogout} isAccLoading={isAccLoading} />

			<ActionsSection />
		</>
	);
};

export { AccountSettings };
