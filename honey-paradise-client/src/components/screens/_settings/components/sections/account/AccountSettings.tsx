import { useMyAccount } from "@/shared/lib/hooks/auth";
import { EmailSection } from "./EmailSection";
import { SecuritySection } from "./SecuritySection";

const AccountSettings = () => {
	const { user, accRefetch, isAccLoading } = useMyAccount();

	return (
		<>
			<EmailSection email={user?.email} isVerified={user?.isVerified} accRefetch={accRefetch} isAccLoading={isAccLoading} />

			<SecuritySection
				isTFAEnabled={user?.isTFAEnabled}
				isFullLogoutEnabled={user?.settings.useFullLogout}
				accRefetch={accRefetch}
				isAccLoading={isAccLoading}
			/>
		</>
	);
};

export { AccountSettings };
