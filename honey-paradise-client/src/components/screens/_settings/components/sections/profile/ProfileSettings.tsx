import { AvatarSection } from "./AvatarSection";
import { InfoSection } from "./InfoSection";
import { useMyAccount } from "@hooks/auth";

const ProfileSettings = () => {
	const { user, accRefetch, isAccLoading } = useMyAccount();

	return (
		<>
			<AvatarSection avatarPath={user?.avatarPath} username={user?.username} isAccLoading={isAccLoading} refetch={accRefetch} />

			<InfoSection />
		</>
	);
};

export { ProfileSettings };
