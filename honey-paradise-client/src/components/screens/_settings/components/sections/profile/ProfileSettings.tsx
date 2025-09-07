import { AppearanceSection } from "./AppearanceSection";
import { AvatarSection } from "./AvatarSection";
import { InfoSection } from "./InfoSection";
import { TelegramSection } from "./TelegramSection";
import { useMyAccount } from "@hooks/auth";

const ProfileSettings = () => {
	const { user, isAccLoading } = useMyAccount();

	return (
		<>
			<AvatarSection avatarPath={user?.avatarPath} username={user?.username} isAccLoading={isAccLoading} />

			<InfoSection
				birthdate={user?.birthdate}
				gender={user?.gender}
				phone={user?.phoneNumber}
				username={user?.username}
				isLoading={isAccLoading}
			/>

			<AppearanceSection settings={user?.settings} isAccLoading={isAccLoading} />

			<TelegramSection />
		</>
	);
};

export { ProfileSettings };
