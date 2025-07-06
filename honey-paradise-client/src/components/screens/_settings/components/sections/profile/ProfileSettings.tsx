import { AppearanceSection } from "./AppearanceSection";
import { AvatarSection } from "./AvatarSection";
import { InfoSection } from "./InfoSection";
import { useMyAccount } from "@hooks/auth";

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

			<AppearanceSection settings={user?.settings} isAccLoading={isAccLoading} refetch={accRefetch} />
		</>
	);
};

export { ProfileSettings };
