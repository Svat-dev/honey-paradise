import { useMyAccount } from "@/shared/lib/hooks/auth";
import { EmailSection } from "./EmailSection";

const AccountSettings = () => {
	const { user, accRefetch, isAccLoading } = useMyAccount();

	return (
		<>
			<EmailSection email={user?.email} isVerified={user?.isVerified} accRefetch={accRefetch} isAccLoading={isAccLoading} />
		</>
	);
};

export { AccountSettings };
