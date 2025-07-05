import { useMyAccount } from "@hooks/auth";
import { AvatarSection } from "./AvatarSection";
import { InfoSection } from "./InfoSection";

const ProfileSettings = () => {
	const { user, accRefetch, isAccLoading } = useMyAccount();

	return (
		<>
			<AvatarSection avatarPath={user?.avatarPath} username={user?.username} isAccLoading={isAccLoading} refetch={accRefetch} />

			<InfoSection
				birthdate={user?.birthdate}
				gender={user?.gender}
				phone={user?.phoneNumber}
				username={user?.username}
				refetch={accRefetch}
				isLoading={isAccLoading}
			/>
		</>
	);
};

export { ProfileSettings };
